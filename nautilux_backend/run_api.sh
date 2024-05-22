#!/bin/sh

# Apply database migrations and load data
echo "Applying database migrations and load data"
python manage.py migrate
python manage.py loaddata villes

# Collect static files
echo "Collecting static files"
python manage.py collectstatic --noinput

# Start Gunicorn server
echo "Starting Gunicorn server"
gunicorn nautilux_backend.wsgi:application --bind 0.0.0.0:8000
