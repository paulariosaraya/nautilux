#!/bin/sh

python manage.py migrate
python manage.py loaddata villes
exec python manage.py runserver 0.0.0.0:8000

gunicorn nautilux_backend.wsgi:application --bind 0.0.0.0:8000
