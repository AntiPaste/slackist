import rethinkdb as rethink


class Database(object):
    def __init__(self, name, logger):
        self._name = name
        self._connection = None

        self._logger = logger.getChild('database')

        self.db = None
        self.raw = rethink
        self.connection = None

    def connect(self, **options):
        """
        Connect to the RethinkDB instance and store the connection
        """

        # TODO: handle exceptions
        self._connection = rethink.connect(**options)

        self.db = rethink.db(self._name)
        self.connection = self._connection

        return True

    def setup(self):
        """
        Create database and tables if they don't exist
        """

        self._logger.debug('Performing database setup')
        self._logger.debug('Creating database')

        try:
            rethink.db_create(self._name).run(self._connection)
            self._logger.debug('Database created')
        except rethink.ReqlRuntimeError:
            self._logger.debug('Database already exists')

        self._logger.debug('Creating tables')

        tables = ('messages',)
        for table in tables:
            try:
                rethink.db(
                    self._name
                ).table_create(table).run(self._connection)
                self._logger.debug('Table {} created'.format(table))
            except rethink.ReqlOpFailedError:
                self._logger.debug('Table {} already exists'.format(table))

        indexes = ({'table': 'messages', 'column': 'created'},)
        for index in indexes:
            table = index['table']
            column = index['column']

            try:
                rethink.db(
                    self._name
                ).table(table).index_create(column).run(self._connection)

                self._logger.debug(
                    'Index {} for table {} created'.format(column, table))
            except rethink.ReqlOpFailedError:
                self._logger.debug(
                    'Index {} for table {} already exists'.format(
                        column, table))

        self._logger.debug('Database setup complete')
