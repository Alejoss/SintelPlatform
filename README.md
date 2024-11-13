### Docker Compose Local

# Create backend admin custom command
docker exec -it sintel_backend python manage.py create_admin

# Start services
docker compose -f docker-compose.dev.yml up --build

# Stop services
docker compose -f docker-compose.dev.yml down

# Rebuild a specific service with new changes
docker compose -f docker-compose.dev.yml up --build -d

# Stop existing containers
docker compose down

# List dangling (orphaned) images
docker images -f "dangling=true" -q

# Remove dangling images
docker rmi $(docker images -f "dangling=true" -q)

# Force remove dangling images (if the previous command fails)
docker rmi -f $(docker images -f "dangling=true" -q)

# Clean the entire Docker system (use with caution)
docker system prune -a

# Remove unused volumes
docker volume prune

# Remove unused networks
docker network prune
