#!/bin/sh

python manage.py migrate
python manage.py loaddata villes

gunicorn nautilux_backend.wsgi:application --bind 0.0.0.0:8000
