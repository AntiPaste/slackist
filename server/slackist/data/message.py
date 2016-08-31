from slackist.data import Base
from slackist.models import Message as MessageModel


class Message(Base):
    """ Message database model """
    def __init__(self, database):
        self._database = database

    def insert(self, message):
        """ Inserts a message object """
        message_json = message.to_json(skip=('id',))

        result = self._database.db.table(
            'messages'
        ).insert(message_json).run(self._database.connection)

        if result['inserted'] != 1:
            raise MessageInsertException

        return self.get(result['generated_keys'][0])

    def get(self, message_id):
        """ Returns a single message object by id """
        message = self._database.db.table(
            'messages'
        ).get(message_id).run(self._database.connection)

        return MessageModel.from_json(message)

    def get_all(self):
        """ Returns all message objects """
        cursor = self._database.db.table(
            'messages'
        ).run(self._database.connection)

        return [MessageModel.from_json(message) for message in cursor]

    def update(self, message_id, new_message):
        """ Updates an existing message object """
        new_message_json = new_message.to_json(skip=('id',))

        response = self._database.db.table(
            'messages'
        ).get(message_id).update(
            new_message_json
        ).run(self._database.connection)

        if response['errors'] != 0:
            raise MessageUpdateException

        return self.get(message_id)

    def delete(self, message_id):
        """ Deletes message object from database and returns it """

        message = self.get(message_id)
        self._database.db.table('messages').get(
            message_id
        ).delete().run(self._database.connection)

        return message

    def get_all_sorted_by_timestamp(self, direction='asc'):
        """ Returns all message objects sorted by timestamp """
        index = 'created'
        if direction != 'asc':
            index = self._database.raw.desc(index)

        cursor = self._database.db.table(
            'messages'
        ).order_by(index=index).run(self._database.connection)

        return [MessageModel.from_json(message) for message in cursor]


class MessageInsertException(Exception):
    pass


class MessageUpdateException(Exception):
    pass
