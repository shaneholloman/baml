use crate::{builder::get_src_dir, shell::build_shell_command, update::UPDATE_CHANNEL};
use crate::{errors::CliError, OutputType};
use clap;
use colored::Colorize;
use log;
use regex::Regex;
use serde;
use std::path::PathBuf;

#[derive(Debug, serde::Deserialize)]
pub struct LatestVersionsManifest {
    pub cli: Option<String>,
    pub py_client: Option<String>,
    pub ts_client: Option<String>,
    pub vscode: Option<String>,
}

#[derive(Debug, serde::Serialize)]
pub struct CheckedVersions {
    pub cli: CliVersion,
    pub generators: Vec<GeneratorVersion>,
    pub vscode: VscodeVersion,
}

#[derive(Debug, serde::Serialize)]
pub struct CliVersion {
    pub current_version: String,
    pub latest_version: Option<String>,
    pub recommended_update: Option<String>,
}

#[derive(Debug, serde::Serialize)]
pub struct GeneratorVersion {
    pub name: String,
    pub dir: PathBuf,
    pub language: String,
    pub current_version: String,
    pub latest_version: Option<String>,
    pub recommended_update: Option<String>,
}

#[derive(Debug, serde::Serialize)]
pub struct VscodeVersion {
    pub latest_version: Option<String>,
}

pub fn get_client_version(
    project_root: &str,
    package_version_command: &str,
) -> Result<String, CliError> {
    let cmd = shellwords::split(package_version_command)
        .map_err(|e| CliError::StringError(e.to_string()))?;

    let mut cmd = build_shell_command(cmd);

    // NOTE(sam): no idea why this has to start in the cwd; this is copied from update_client.rs
    // according to vbv@ this had to be done for _some_ reason, so just preserving it as closely as i can
    // per aaron@ there's some Windows slash MacOS funniness going on here
    let cwd = std::env::current_dir()?.canonicalize()?;
    let project_root = cwd.join(project_root);
    let project_root = project_root.canonicalize().map_err(|e| {
        CliError::StringError(format!(
            "{}\nDirectory error: {}:\n{}",
            "Failed!".red(),
            project_root.to_string_lossy(),
            e
        ))
    })?;
    cmd.current_dir(&project_root);

    let output = cmd
        .output()
        .map_err(|e| CliError::StringError(e.to_string()))
        .map_err(|e| CliError::StringError(format!("{} Error: {}", "Failed!".red(), e)))
        .and_then(|e| {
            if !e.status.success() {
                return Err(CliError::StringError(format!(
                    "{} Error: {}",
                    "Failed!".red(),
                    e.status
                )));
            }

            Ok(String::from_utf8(e.stdout)?)
        })?;

    let version_line_re = if package_version_command.starts_with("conda") {
        // conda's version output has "baml" in the same line
        Regex::new(r#"(?i)\b(?:baml)\b"#).map_err(|e| {
            CliError::StringError(format!("{} Error: {}", "Failed!".red(), e.to_string()))
        })?
    } else {
        // for other python package managers, they have "version" in the same line
        Regex::new(r#"(?i)\b(?:version)\b"#).map_err(|e| {
            CliError::StringError(format!("{} Error: {}", "Failed!".red(), e.to_string()))
        })?
    };

    let Some(version_line) = output.lines().find(|line| version_line_re.is_match(line)) else {
        return Err(CliError::StringError(format!(
            "{} Error: {}",
            "Failed!".red(),
            "Could not infer the version of the client"
        )));
    };

    let version_re = Regex::new("[0-9][^ ]*").map_err(|e| {
        CliError::StringError(format!("{} Error: {}", "Failed!".red(), e.to_string()))
    })?;

    let Some(version) = version_re.find(version_line) else {
        return Err(CliError::StringError(format!(
            "{} Error: {}",
            "Failed!".red(),
            "Could not parse the version of the client"
        )));
    };

    Ok(version.as_str().to_string())
}

pub fn recommended_update(current: &str, latest: &Option<String>) -> Option<String> {
    let Ok(current) = semver::Version::parse(current) else {
        // NB: this means we immediately return false if the current version is 0.14.0.dev0,
        // since that is not a valid semver, even though we publish it to PyPI
        return None;
    };
    let Some(latest_str) = latest else {
        return None;
    };
    let Ok(latest) = semver::Version::parse(latest_str) else {
        return None;
    };

    if latest > current {
        Some(latest_str.clone())
    } else {
        None
    }
}

/// Checks for updates to everything: CLI, client libraries, and vscode
///
///   - `baml_dir_override` is --baml-dir as passed in via the CLI, which overrides inference
///       for the nearest `baml_src` directory
///   - if we can't fetch updates, we fail explicitly
///   - if the latest versions are older than the current version, we ignore the latest version
///       and leave `$field.latest_version` unset
pub fn check_for_updates(baml_dir_override: &Option<String>) -> Result<CheckedVersions, CliError> {
    let mut ret = CheckedVersions {
        cli: CliVersion {
            current_version: clap::crate_version!().to_string(),
            latest_version: None,
            recommended_update: None,
        },
        generators: Vec::new(),
        vscode: VscodeVersion {
            latest_version: None,
        },
    };
    log::debug!("Checking for updates at {}", UPDATE_CHANNEL);
    let response = reqwest::blocking::get(UPDATE_CHANNEL)?;
    if !response.status().is_success() {
        return Err(format!("Failed to get versions: {}", response.status()).into());
    }
    let latest_versions = response.json::<LatestVersionsManifest>()?;

    ret.cli.latest_version = latest_versions.cli;
    ret.cli.recommended_update =
        recommended_update(&ret.cli.current_version, &ret.cli.latest_version);
    ret.vscode.latest_version = latest_versions.vscode;

    if let Ok((_, (config, _))) = get_src_dir(baml_dir_override) {
        for (gen, _) in config.generators {
            // every generator's client type needs to get attached to the output
            let current_version = get_client_version(
                gen.project_root.to_str().unwrap(),
                gen.package_version_command.as_str(),
            )?;
            let latest_version = match gen.language.as_str() {
                "python" => latest_versions.py_client.clone(),
                "typescript" => latest_versions.ts_client.clone(),
                _ => None,
            };
            let recommended_update = recommended_update(&current_version, &latest_version);

            ret.generators.push(GeneratorVersion {
                name: gen.name,
                dir: gen.project_root.canonicalize()?,
                language: gen.language.as_str().to_string(),
                current_version: current_version,
                latest_version: latest_version,
                recommended_update: recommended_update,
            });
        }
    }

    Ok(ret)
}

#[derive(clap::Args, Debug)]
pub struct VersionArgs {
    /// Optional: Specifies the directory of the BAML project to test
    #[arg(long)]
    pub baml_dir: Option<String>,

    /// Check whether there are updates available for not only the CLI, but also client libraries and vscode
    #[arg(long, default_value = "false")]
    pub check: bool,

    /// Whether to output data in human or machine-readable formats
    #[arg(long = "output", default_value_t = OutputType::Human)]
    pub output_type: OutputType,
}

pub fn run(args: &VersionArgs) -> Result<(), CliError> {
    if args.check {
        let ret = check_for_updates(&args.baml_dir)?;
        match args.output_type {
            OutputType::Human => {
                // Don't message about vscode: it's not useful in the context of a human running `baml version` manually
                let CheckedVersions {
                    cli,
                    generators,
                    vscode: _,
                } = ret;

                println!(
                    "{} {} {}",
                    clap::crate_name!().cyan(),
                    cli.current_version,
                    cli.recommended_update.as_ref().map_or(
                        "(up-to-date)".to_string(),
                        |latest| format!("(update recommended: {})", latest.green())
                    )
                );
                for GeneratorVersion {
                    language,
                    name,
                    current_version,
                    recommended_update,
                    ..
                } in generators.iter()
                {
                    println!(
                        "{} {current_version} via {} {}",
                        format!("{language} client").cyan(),
                        format!("generator {name}").cyan(),
                        recommended_update.as_ref().map_or(
                            "(up-to-date)".to_string(),
                            |latest| format!("(update recommended: {})", latest.green())
                        )
                    );
                }

                let mut update_commands = Vec::new();
                if cli.recommended_update.is_some() {
                    update_commands.push(format!("{} update", clap::crate_name!()));
                }
                if generators.iter().any(|g| g.recommended_update.is_some()) {
                    update_commands.push(format!("{} update-client", clap::crate_name!()));
                }
                if !update_commands.is_empty() {
                    println!(
                        "\nTo update, run:\n  {}",
                        // update commands go on a different line so users can triple-click to copy
                        update_commands.join(" && ").green().bold()
                    );
                }
            }
            OutputType::Json => {
                println!("{}", serde_json::to_string_pretty(&ret)?);
            }
        }
        return Ok(());
    }

    match args.output_type {
        OutputType::Human => {
            println!("{} {}", clap::crate_name!().cyan(), clap::crate_version!());
        }
        OutputType::Json => {
            let ret = CheckedVersions {
                cli: CliVersion {
                    current_version: clap::crate_version!().to_string(),
                    latest_version: None,
                    recommended_update: None,
                },
                generators: Vec::new(),
                vscode: VscodeVersion {
                    latest_version: None,
                },
            };
            println!("{}", serde_json::to_string_pretty(&ret)?);
        }
    }

    Ok(())
}