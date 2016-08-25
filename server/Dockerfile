FROM    frolvlad/alpine-python3

ENV     ENVIRONMENT docker
ENV     PYTHONPATH /
ENV     PYTHONUNBUFFERED true

# Install SSL certificates
RUN     apk add --update build-base ca-certificates python-dev

# Copy the requirements file
COPY    ./slackist/requirements.txt /slackist/

# Install app dependencies
RUN     pip install -r /slackist/requirements.txt

# Bundle the source
COPY    ./slackist/ /slackist/

# Copy the configuration
COPY    ./config/ /etc/slackist/

# Expose port 8000
EXPOSE  8000

CMD     ["/usr/bin/python3", "-m", "slackist", "--config", "/etc/slackist/docker.json"]
