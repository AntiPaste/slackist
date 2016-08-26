from slackist.data import Label as LabelData


class Label(object):
    def __init__(self, database):
        self._database = database
        self._label_data = LabelData(database)

    def list_labels(self):
        labels = self._label_data.get_all()
        return labels
