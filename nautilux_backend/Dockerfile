FROM python:2.7

ENV PYTHONUNBUFFERED 1

WORKDIR /app
ADD . /app
COPY . /app

RUN apt-get update && \
    apt-get install -y dos2unix
RUN pip install --no-cache-dir -r requirements.txt
RUN dos2unix /app/run_api.sh
RUN chmod +x /app/run_api.sh

EXPOSE 8000

ENTRYPOINT ["/app/run_api.sh"]
