# Build an image from Dockerfile
build:
	docker-compose build

setup-db:
	docker-compose run backend bundle exec rake db:drop db:create db:migrate db:seed

# Start all services
start:
	docker-compose up

backend-shell:
	docker-compose exec backend bash
