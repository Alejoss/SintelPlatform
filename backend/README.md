

### Docker Compose local

Levantar servicios

docker compose -f docker-compose.dev.yml up --build

detener servicios
docker compose -f docker-compose.dev.yml down

reconstruir servicio especifico con los nuevos cambios

docker compose -f docker-compose.dev.yml up --build -d sintel_frontend



Detener los contenedores existentes:

docker compose down

# Listar imágenes huérfanas
docker images -f "dangling=true" -q

# Eliminar imágenes huérfanas
docker rmi $(docker images -f "dangling=true" -q)

# Eliminar imágenes huérfanas de forma forzada (si el comando anterior falla)
docker rmi -f $(docker images -f "dangling=true" -q)

# Limpiar todo el sistema Docker (usa con precaución)
docker system prune -a

# Eliminar volúmenes no utilizados
docker volume prune

# Eliminar redes no utilizadas
docker network prune

