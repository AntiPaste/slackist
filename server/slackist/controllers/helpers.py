import logging

from flask import jsonify

from slackist import Database


class Helpers(object):
    def __init__(self, app):
        self._app = app

    def get_response_code(self, response):
        if len(response['errors']) > 1:
            return 400

        return response['errors'][0]['status']

    def response_wrapper(self, response):
        if response['errors']:
            return jsonify(response), self.get_response_code(response)

        return jsonify(response)

    def get_logger(self, name):
        logger = logging.getLogger(name)
        logger.setLevel(self._app.config['LOGGING_LEVEL'])
        return logger

    def get_database(self, logger=logging):
        database_config = self._app.config['database']

        name = database_config['name']

        database = Database(name=name, logger=logger)
        success = database.connect(
            host=database_config['host'],
            port=database_config['port']
        )

        if not success:
            logger.critical('Database failed to connect')
            return None

        return database
