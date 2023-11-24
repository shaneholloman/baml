# This file is generated by the BAML compiler.
# Do not edit this file directly.
# Instead, edit the BAML files and recompile.

# ruff: noqa: E501,F401
# flake8: noqa: E501,F401
# pylint: disable=unused-import,line-too-long
# fmt: off

from ..types.classes.cls_attendee import Attendee
from ..types.classes.cls_conversation import Conversation
from ..types.classes.cls_meetingrequest import MeetingRequest
from ..types.classes.cls_message import Message
from ..types.enums.enm_usertype import UserType
from typing import Protocol, runtime_checkable


import typing

import pytest

ImplName = typing.Literal["simple", "robust"]

T = typing.TypeVar("T", bound=typing.Callable[..., typing.Any])
CLS = typing.TypeVar("CLS", bound=type)


IExtractMeetingRequestInfoOutput = MeetingRequest

@runtime_checkable
class IExtractMeetingRequestInfo(Protocol):
    """
    This is the interface for a function.

    Args:
        convo: Conversation
        now: str

    Returns:
        MeetingRequest
    """

    async def __call__(self, *, convo: Conversation, now: str) -> MeetingRequest:
        ...


class BAMLExtractMeetingRequestInfoImpl:
    async def run(self, *, convo: Conversation, now: str) -> MeetingRequest:
        ...

class IBAMLExtractMeetingRequestInfo:
    def register_impl(
        self, name: ImplName
    ) -> typing.Callable[[IExtractMeetingRequestInfo], IExtractMeetingRequestInfo]:
        ...

    async def __call__(self, *, convo: Conversation, now: str) -> MeetingRequest:
        ...

    def get_impl(self, name: ImplName) -> BAMLExtractMeetingRequestInfoImpl:
        ...

    @typing.overload
    def test(self, test_function: T) -> T:
        """
        Provides a pytest.mark.parametrize decorator to facilitate testing different implementations of
        the ExtractMeetingRequestInfoInterface.

        Args:
            test_function : T
                The test function to be decorated.

        Usage:
            ```python
            # All implementations will be tested.

            @baml.ExtractMeetingRequestInfo.test
            def test_logic(ExtractMeetingRequestInfoImpl: IExtractMeetingRequestInfo) -> None:
                result = await ExtractMeetingRequestInfoImpl(...)
            ```
        """
        ...

    @typing.overload
    def test(self, *, exclude_impl: typing.Iterable[ImplName]) -> pytest.MarkDecorator:
        """
        Provides a pytest.mark.parametrize decorator to facilitate testing different implementations of
        the ExtractMeetingRequestInfoInterface.

        Args:
            exclude_impl : Iterable[ImplName]
                The names of the implementations to exclude from testing.

        Usage:
            ```python
            # All implementations except "simple" will be tested.

            @baml.ExtractMeetingRequestInfo.test(exclude_impl=["simple"])
            def test_logic(ExtractMeetingRequestInfoImpl: IExtractMeetingRequestInfo) -> None:
                result = await ExtractMeetingRequestInfoImpl(...)
            ```
        """
        ...

    @typing.overload
    def test(self, test_class: typing.Type[CLS]) -> typing.Type[CLS]:
        """
        Provides a pytest.mark.parametrize decorator to facilitate testing different implementations of
        the ExtractMeetingRequestInfoInterface.

        Args:
            test_class : Type[CLS]
                The test class to be decorated.

        Usage:
        ```python
        # All implementations will be tested in every test method.

        @baml.ExtractMeetingRequestInfo.test
        class TestClass:
            def test_a(self, ExtractMeetingRequestInfoImpl: IExtractMeetingRequestInfo) -> None:
                ...
            def test_b(self, ExtractMeetingRequestInfoImpl: IExtractMeetingRequestInfo) -> None:
                ...
        ```
        """
        ...

BAMLExtractMeetingRequestInfo: IBAMLExtractMeetingRequestInfo
