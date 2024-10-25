Reconstruir las imágenes de Docker:

docker compose build
Reiniciar los contenedores con los nuevos cambios:

docker compose up -d

Si solo deseas reconstruir y reiniciar un servicio específico, puedes usar el siguiente comando:
docker compose up -d --build <nombre_servicio>



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



### Docker Compose local

Levantar servicios

docker compose -f docker-compose.dev.yml up --build

detener servicios
docker compose -f docker-compose.dev.yml down

reconstruir servicio especifico con los nuevos cambios

docker compose -f docker-compose.dev.yml up --build -d sintel_frontend
