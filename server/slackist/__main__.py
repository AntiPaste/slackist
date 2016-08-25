import slackist

if __name__ == '__main__':
    data = slackist.setup_application()

    config = data['config']['application']
    slackist.app.run(
        host=config['host'],
        port=config['port'],
        debug=config['debug'],
        threaded=config['threaded'])
