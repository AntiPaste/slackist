import re
from datetime import datetime, timezone

from slackist.models import Base


class Message(Base):
    identifier = None
    label = None
    content = None
    created = None

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

        message.created = datetime.now(timezone.utc)
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
        message.created = data.get('created')

        return message

    def to_json(self, skip=()):
        data = {
            'id': self.identifier,
            'label': self.label,
            'content': self.content,
            'created': self.created
        }

        for key in skip:
            data.pop(key)

        return data
