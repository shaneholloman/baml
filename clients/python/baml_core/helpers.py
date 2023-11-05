import os
import typing
import uuid

from baml_core._impl.provider.llm_manager import LLMManager


from . import otel
from .services.api import APIWrapper
from ._impl.cache.cache_manager import CacheManager
from .services.logger import logger


class __InternalBAMLConfig:
    def __init__(self, *, api: typing.Optional[APIWrapper] = None) -> None:
        self.api = api


def baml_init(
    *,
    project_id: typing.Optional[str] = None,
    secret_key: typing.Optional[str] = None,
    base_url: typing.Optional[str] = None,
    enable_cache: typing.Optional[bool] = None,
    stage: typing.Optional[str] = "prod",
) -> typing.Optional[__InternalBAMLConfig]:
    process_id = str(uuid.uuid4())

    if base_url is None:
        base_url = os.environ.get("GLOO_BASE_URL", "https://app.trygloo.com/api")

    if project_id is None:
        project_id = os.environ.get("GLOO_APP_ID")

    if secret_key is None:
        secret_key = os.environ.get("GLOO_APP_SECRET")

    if enable_cache is None:
        enable_cache = os.environ.get("GLOO_CACHE", "1") == "1"

    if (
        project_id is not None
        and secret_key is not None
        and stage is not None
        and base_url is not None
    ):
        api = APIWrapper(
            base_url=base_url,
            stage=stage,
            api_key=secret_key,
            project_id=project_id,
            session_id=process_id,
        )
    else:
        api = None
    otel.init_baml_tracing(process_id, api)

    if enable_cache:
        if api:
            logger.info("Using GlooCache")
            CacheManager.add_cache("gloo", api=api)
        else:
            logger.warn(
                "Wanted to use GlooCache but no API key was provided. Did you set GLOO_APP_ID and GLOO_APP_SECRET?"
            )

    LLMManager.validate()
    return __InternalBAMLConfig(api=api)