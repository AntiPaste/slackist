from flask import Blueprint, request

from slackist import app
from slackist.controllers import Helpers
from slackist.services import Message as MessageService

routes = Blueprint('message', __name__, url_prefix='/messages')
helpers = Helpers(app)


@routes.route('')
def list_messages():
    response = {'messages': [], 'errors': []}

    logger = helpers.get_logger('list_messages')
    database = helpers.get_database(logger)

    service = MessageService(database)

    messages = service.list_messages()
    response['messages'] = [message.to_json() for message in messages]

    return helpers.response_wrapper(response)


@routes.route('', methods=['POST'])
def create_message():
    response = {'message': None, 'errors': []}

    logger = helpers.get_logger('create_message')
    database = helpers.get_database(logger)

    data = request.get_json()
    if not data:
        logger.warning('Invalid request body')
        response['errors'].append({
            'status': 400,
            'source': 'request_body',
            'title': 'Invalid or empty JSON',
            'detail': 'The request body contained invalid or empty JSON.'
        })

        return helpers.response_wrapper(response)

    text = data.get('text')
    if text is None:
        logger.warning('Missing parameter text')
        response['errors'].append({
            'status': 400,
            'source': 'text',
            'title': 'Missing parameter text',
            'detail': 'The parameter "text" was missing from the request.'
        })

        return helpers.response_wrapper(response)

    text = text.strip()
    if not text:
        logger.warning('Empty parameter text')
        response['errors'].append({
            'status': 400,
            'source': 'text',
            'title': 'Empty parameter text',
            'detail': 'The parameter "text" was empty.'
        })

        return helpers.response_wrapper(response)

    service = MessageService(database)

    message = service.create_message(text)
    response['message'] = message.to_json()

    return helpers.response_wrapper(response)


@routes.route('/<message_id>')
def get_message(message_id):
    response = {'message': None, 'errors': []}

    logger = helpers.get_logger('get_message')
    database = helpers.get_database(logger)

    service = MessageService(database)

    message = service.get_message(message_id)
    response['message'] = message.to_json()

    return helpers.response_wrapper(response)


@routes.route('/<message_id>', methods=['PUT'])
def update_message(message_id):
    response = {'message': None, 'errors': []}

    logger = helpers.get_logger('update_message')
    database = helpers.get_database(logger)

    data = request.get_json()
    if not data:
        logger.warning('Invalid request body')
        response['errors'].append({
            'status': 400,
            'source': 'request_body',
            'title': 'Invalid or empty JSON',
            'detail': 'The request body contained invalid or empty JSON.'
        })

        return helpers.response_wrapper(response)

    text = data.get('text')
    if text is None:
        logger.warning('Missing parameter text')
        response['errors'].append({
            'status': 400,
            'source': 'text',
            'title': 'Missing parameter text',
            'detail': 'The parameter "text" was missing from the request.'
        })

        return helpers.response_wrapper(response)

    text = text.strip()
    if not text:
        logger.warning('Empty parameter text')
        response['errors'].append({
            'status': 400,
            'source': 'text',
            'title': 'Empty parameter text',
            'detail': 'The parameter "text" was empty.'
        })

        return helpers.response_wrapper(response)

    service = MessageService(database)

    message = service.update_message(message_id, text)
    response['message'] = message.to_json()

    return helpers.response_wrapper(response)


@routes.route('/<message_id>', methods=['DELETE'])
def delete_message(message_id):
    response = {'message': None, 'errors': []}

    logger = helpers.get_logger('delete_message')
    database = helpers.get_database(logger)

    service = MessageService(database)

    message = service.delete_message(message_id)
    response['message'] = message.to_json()

    return helpers.response_wrapper(response)
