# Nautilux TP

Ce projet se compose de trois services principaux : le backend, le frontend et la base de données.
Le backend est une application Django, le frontend est une application AngularJS 1.7 et la base de données est PostgreSQL.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Comment démarrer l'application

### 1. Cloner le repository

Cloner ce repository:

```sh
# https
git clone https://github.com/paulariosaraya/nautilux.git
# ssh
git clone git@github.com:paulariosaraya/nautilux.git

cd nautilux
```

### 2. Environment Variables
Créez un fichier `.env` en utilisant le fichier `.env-example` comme base. 
Modifiez les valeurs `SECRET_KEY`, `DB_USER` et `DB_PASSWORD` selon vos besoins. 

```shell
cp .env-example .env
```

### 4. Build and Run the Services
Créez et exécutez les conteneurs Docker à l'aide de Docker Compose:
```sh
docker-compose up --build
```

Cette commande créera et démarrera les services suivants :
- frontend : le frontend AngularJS, disponible sur http://localhost:8001
- backend : le backend Django, disponible sur http://localhost:8000
- db : la base de données PostgreSQL
