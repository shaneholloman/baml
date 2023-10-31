# This file is generated by the BAML compiler.
# Do not edit this file directly.
# Instead, edit the BAML files and recompile.
#
# BAML version: 0.0.1
# Generated Date: 2023-10-30 18:46:24.909925 -07:00
# Generated by: vbv

from ..._impl.functions import BaseBAMLFunction
from typing import Protocol, runtime_checkable


@runtime_checkable
class IFooBar2(Protocol):
    """
    This is the interface for a function.

    Args:
        arg: str

    Returns:
        str
    """

    async def __call__(self, arg: str, /) -> str:
        ...


class IBAMLFooBar2(BaseBAMLFunction[str]):
    def __init__(self) -> None:
        super().__init__(
            "FooBar2",
            IFooBar2,
            ["SomeName"],
        )

BAMLFooBar2 = IBAMLFooBar2()

__all__ = [ "BAMLFooBar2" ]