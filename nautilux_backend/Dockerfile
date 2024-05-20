FROM python:2.7

ENV PYTHONUNBUFFERED 1

WORKDIR /app
ADD . /app
COPY . /app

RUN pip install --no-cache-dir -r requirements.txt
RUN chmod +x /app/run_api.sh

EXPOSE 8000

ENTRYPOINT ["/app/run_api.sh"]
