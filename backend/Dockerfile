### Build and install packages
FROM python:3.12

# Set up working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update -y \
    && apt-get install -y gettext libpq-dev postgresql-client \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt /app/
RUN pip install -r requirements.txt

# Copy project files into the Docker image
COPY . /app

# Expose the port Django runs on
EXPOSE 8000

# Environment settings
ENV PYTHONUNBUFFERED=1

# Command to run the Django development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
