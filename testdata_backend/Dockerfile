FROM python:3.8

RUN mkdir /code
WORKDIR /code

COPY ./testdata_backend/. /code/

RUN pip install pip --upgrade
RUN pip install -r requirements.txt

COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["bash", "/entrypoint.sh"]
