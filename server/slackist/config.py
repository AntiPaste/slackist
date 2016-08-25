import os
import json
import logging


def get_config(filepath):
    if not os.path.exists(filepath) or not os.path.isfile(filepath):
        raise EnvironmentError('No valid file specified: {}'.format(filepath))

    with open(filepath, 'r') as config_file:
        config = json.load(config_file)
        logging.info('Loaded environment "{}"'.format(config['environment']))

    return config
