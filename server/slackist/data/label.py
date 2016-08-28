from slackist.data import Base
from slackist.models import Label as LabelModel


class Label(Base):
    """ Label database model """
    def __init__(self, database):
        self._database = database

    def insert(self):
        pass

    def get(self, label_id):
        pass

    def get_all(self):
        """ Returns all label objects """
        cursor = self._database.db.table(
            'messages'
        ).group('label').count().ungroup().run(self._database.connection)

        return [
            LabelModel.from_json({
                'value': row.get('group'),
                'count': row.get('reduction')
            }) for row in cursor if row.get('group') is not None
        ]

    def update(self, label_id, new_label):
        pass

    def delete(self, label_id):
        pass
