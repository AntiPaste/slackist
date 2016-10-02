FROM node:latest

WORKDIR /app

COPY ./app/package.json /app/package.json
RUN npm install

COPY ./app /app
COPY ./scripts/bundle.sh /app/bundle.sh

CMD ["npm", "run", "dev"]
