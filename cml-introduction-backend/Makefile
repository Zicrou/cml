
# Prepare all required services and seed the database
init: pull build setup-db

# Start the website
start:
	docker-compose up -d

# Terminate the website
down:
	docker-compose down --remove-orphans

stop:
	docker-compose stop

# Open the website application
open:
	open http://localhost:3000

# Build an image from Dockerfile
build:
	docker-compose build

# Pull required images
pull:
	docker-compose pull

setup-db:
	docker-compose run backend bundle exec rake db:drop db:create db:migrate db:seed

shell:
	docker-compose run --rm backend bash

attach-backend:
	docker attach backend_backend_1

