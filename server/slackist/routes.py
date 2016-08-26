from slackist import app
from slackist.controllers import Label as LabelController
from slackist.controllers import Message as MessageController

app.register_blueprint(MessageController)
app.register_blueprint(LabelController)
