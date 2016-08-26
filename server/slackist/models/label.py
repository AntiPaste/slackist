from slackist.models import Base


class Label(Base):
    value = None
    count = None

    @staticmethod
    def from_json(data):
        """
        Map attributes from a database message object to the class attributes
        """

        label = Label()
        label.value = data.get('value')
        label.count = int(data.get('count'))

        return label

    def to_json(self, skip=()):
        data = {
            'value': self.value,
            'count': int(self.count)
        }

        for key in skip:
            data.pop(key)

        return data
