from slackist.data import Message as MessageData
from slackist.models import Message as MessageModel


class Message(object):
    def __init__(self, database):
        self._database = database
        self._message_data = MessageData(database)

    def list_messages(self, sort=None):
        if sort:
            messages = self._message_data.get_all_sorted_by_timestamp(sort)
        else:
            messages = self._message_data.get_all()

        return messages

    def create_message(self, text):
        message = MessageModel.create_from_text(text)
        message = self._message_data.insert(message)

        return message

    def get_message(self, message_id):
        message = self._message_data.get(message_id)
        return message

    def update_message(self, message_id, text):
        message = MessageModel.create_from_text(text)
        message = self._message_data.update(message_id, message)

        return message

    def delete_message(self, message_id):
        message = self._message_data.delete(message_id)
        return message
