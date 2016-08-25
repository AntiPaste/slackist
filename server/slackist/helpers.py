import sys


class Helpers:
    @staticmethod
    def exit(self):
        sys.exit(1)

    @staticmethod
    def validate_parameters(required, params):
        invalid = []
        for param in required:
            if param not in params or not params[param]:
                invalid.append(param)

        return invalid and {
            'status': 400,
            'source': 'validate_parameters',
            'title': 'Invalid parameters',
            'detail': 'Missing or empty parameters: {}'.format(
                ', '.join(invalid)),
        } or None


class InvalidParametersException(Exception):
    pass
