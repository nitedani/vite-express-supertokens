#!/bin/bash

set -e
set -u

function create_user_and_database() {
	local database=$(echo $1 | tr ',' ' ' | awk  '{print $1}')
	local owner=$(echo $1 | tr ',' ' ' | awk  '{print $2}')
	local password=$(echo $1 | tr ',' ' ' | awk  '{print $3}')
	echo "Creating Database '$database' with Owner '$owner'"
	psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
	    CREATE USER $owner WITH ENCRYPTED PASSWORD '$password' ;
	    CREATE DATABASE $database;
	    GRANT ALL PRIVILEGES ON DATABASE $database TO $owner;
		ALTER USER $owner CREATEDB;
EOSQL
}

if [ -n "$POSTGRES_MULTIPLE_DATABASES" ]; then
	echo "Multiple Database Creation Requested..."
	for db in $(echo $POSTGRES_MULTIPLE_DATABASES | tr ';' ' '); do
		create_user_and_database $db
	done
	echo "Done Creating Multiple Databases!"
fi