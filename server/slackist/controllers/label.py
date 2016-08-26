from flask import Blueprint

from slackist import app
from slackist.controllers import Helpers
from slackist.services import Label as LabelService

routes = Blueprint('label', __name__, url_prefix='/labels')
helpers = Helpers(app)


@routes.route('')
def list_labels():
    response = {'labels': [], 'errors': []}

    logger = helpers.get_logger('list_labels')
    database = helpers.get_database(logger)

    service = LabelService(database)

    labels = service.list_labels()
    response['labels'] = [label.to_json() for label in labels]

    return helpers.response_wrapper(response)
