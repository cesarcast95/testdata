FROM node:16.3.0-alpine

RUN apk add --no-cache bash

RUN mkdir /code
WORKDIR /code


COPY ./testdata_frontend/package.json/ /code/
RUN npm install

COPY ./testdata_frontend/ /code/

COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["bash", "/entrypoint.sh"]