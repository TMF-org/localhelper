# TMF Localhelper

Lokalhelper is an open source platform that connects people who need help with those who are willing to provide it.

## Tech Stack

### Backend

- Strapi headless CMS
- Database: Postgres (Recommended), MySQL, SQLite

### Frontend

- NextJS App

## Getting started

### Production (Starting point)

We provide an example docker-compose.yml which is intended as a starting point for deploying an instance of the platform.  
For an actual deployment you will need to add e.g. a load balancer/reverse proxy with TLS termination etc.

#### 1. Adjust configuration variables

```shell
cd strapi/
cp .env.example .env
cd frontend/
cp .env.example .env
```

Now make changes to the .env-file as needed. Make sure to at least change the database passwords etc.

#### 2. Build & Start docker images

Now the docker images need to be build and started:

```shell
docker-compose build --pull
docker-compose up -d
```

#### 3. Access Strapi and configure

Open http://localhost:1337 and configure first admin user.  
The frontend can be accessed on http://localhost:3000.

### Development

#### Start strapi backend

By default the strapi backend is using SQLite as a DB.
It's recommended to use Postgres or MySQL for production instances.

```shell
cd strapi
yarn dev
```

#### Start the frontend

```shell
cd frontend
yarn dev
```
