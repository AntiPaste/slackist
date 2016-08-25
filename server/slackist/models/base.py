from abc import ABC, abstractmethod


class Base(ABC):
    """ Base model """

    @abstractmethod
    def from_json(self, data):
        pass

    @abstractmethod
    def to_json(self):
        pass
