import argparse
import logging

from flask import Flask

from slackist import Database, Helpers, get_config

app = Flask(__name__)


def setup_application():
    parser = argparse.ArgumentParser()
    parser.add_argument('--config', help='specify config file location')
    parser.add_argument('-v', '--verbose', action='count', default=0)
    parser.add_argument('-q', '--quiet', action='count', default=0)

    args = parser.parse_args()

    # Allows log level selection using -v and -q arguments,
    # e.g. -v logs DEBUG, -qq logs only CRITICAL
    logging_level = logging.INFO + (10 * args.quiet) - (10 * args.verbose)
    logger = logging.getLogger('base')
    logger.setLevel(logging_level)

    filepath = args.config

    config = get_config(filepath)

    app.config.update(
        LOGGING_LEVEL=logging_level)

    app.config.update(config)

    database = Database(name=config['database']['name'], logger=logger)
    success = database.connect(
        host=config['database']['host'],
        port=config['database']['port'])

    if not success:
        logger.critical('Database failed to connect')
        Helpers.exit()

    database.setup()

    return {
        'database': database,
        'logger': logger,
        'config': config,
    }


try:
    import uwsgidecorators
    uwsgidecorators.postfork(setup_application)
except ImportError:
    logging.info('Application is not running on uWSGI')
