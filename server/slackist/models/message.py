import re

from slackist.models import Base


class Message(Base):
    identifier = None
    label = None
    content = None

    @staticmethod
    def create_from_text(text):
        message = Message()

        pattern = re.compile('^([A-Z]+): (.+)$')
        match = pattern.match(text)

        if match:
            label = match.group(1)
            content = match.group(2)

            message.label = label
            message.content = content
        else:
            message.content = text

        return message

    @staticmethod
    def from_json(data):
        """
        Map attributes from a database message object to the class attributes
        """

        message = Message()

        message.identifier = data.get('id')
        message.label = data.get('label')
        message.content = data.get('content')

        return message

    def to_json(self, skip=()):
        data = {
            'id': self.identifier,
            'label': self.label,
            'content': self.content
        }

        for key in skip:
            data.pop(key)

        return data
