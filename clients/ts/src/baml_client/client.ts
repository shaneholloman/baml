// This file is auto-generated. Do not edit this file manually.
//
// Disable formatting for this file to avoid linting errors.
// tslint:disable
// @ts-nocheck

import { clientManager } from '../baml_lib/client_manager';


const Anthropic = clientManager.createClient('Anthropic', 'baml-anthropic', {
    model: "claude-instant-1",
    api_key: "bad_key"
});

const AzureGPT35TURBO = clientManager.createClient('AzureGPT35TURBO', 'baml-azure-chat', {
    api_key: process.env.AZURE_CHAT_API_KEY,
    api_base: "some_base",
    engine: "horrible_engine",
    api_version: "2023-07-01-preview",
    api_type: "azure"
});

const Claude2 = clientManager.createClient('Claude2', 'baml-anthropic', {
    model: "claude-2",
    api_key: process.env.ANTHROPIC_API_KEY
});

const GPT35 = clientManager.createClient('GPT35', 'baml-openai-chat', {
    model: "gpt-3",
    api_key: process.env.OPENAI_API_KEY
});

const GPT35_YES_NO = clientManager.createClient('GPT35_YES_NO', 'baml-openai-chat', {
    model: "gpt-3",
    api_key: process.env.OPENAI_API_KEY,
    logit_bias: { " yes": 100, " no": 100 }
});

const GPT4 = clientManager.createClient('GPT4', 'baml-openai-chat', {
    model: "gpt-4",
    api_key: process.env.OPENAI_API_KEY
});

const GPT42 = clientManager.createClient('GPT42', 'baml-openai-chat', {
    model: "gpt-4-1106-preview",
    api_key: process.env.OPENAI_API_KEY,
    temperature: 0.1
});

const GPTInstruct = clientManager.createClient('GPTInstruct', 'baml-openai-completion', {
    model: "gpt-3",
    api_key: process.env.OPENAI_API_KEY
});

const Main = clientManager.createClient('Main', 'baml-fallback', {
    strategy: ["GPT4", "Claude2"]
});

const Main2 = clientManager.createClient('Main2', 'baml-fallback', {
    strategy: ["GPT4", "GPT35"]
});

const Main3 = clientManager.createClient('Main3', 'baml-fallback', {
    strategy: ["GPT4", "Anthropic"]
});


export { Anthropic, AzureGPT35TURBO, Claude2, GPT35, GPT35_YES_NO, GPT4, GPT42, GPTInstruct, Main, Main2, Main3 }