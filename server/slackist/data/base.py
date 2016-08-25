from abc import ABC, abstractmethod


class Base(ABC):
    """ Base database model """

    @abstractmethod
    def insert(self, object):
        pass

    @abstractmethod
    def get(self, id):
        pass

    @abstractmethod
    def get_all(self):
        pass

    @abstractmethod
    def update(self, id, object):
        pass

    @abstractmethod
    def delete(self, id):
        pass
