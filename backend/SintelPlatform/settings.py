"""
Django settings for SintelPlatform project.

Generated by 'django-admin startproject' using Django 5.1.1.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.1/ref/settings/
"""
import os
from pathlib import Path
from storages.backends.s3boto3 import S3Boto3Storage
from datetime import timedelta

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-ka+#-_pxx6!abv!uv0ouc!)d=$-ur*v#cy2-d^mff&5)0&m7&!'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
DOCKER = True

DJANGO_PRODUCTION = os.getenv('DJANGO_PRODUCTION', 'False') == 'True'  # For amazon S3
print(f"DJANGO_PRODUCTION: {DJANGO_PRODUCTION}")

ALLOWED_HOSTS = [
    'dashboard.sintel.alejandroveintimilla.com',
    'office.sintel.alejandroveintimilla.com',
    'sintel.alejandroveintimilla.com',
    'www.sintel.alejandroveintimilla.com',
    'http://sintel.algobeat.com',
    'localhost',
    '10.3.2.217'
]

CSRF_TRUSTED_ORIGINS = [
    "https://dashboard.sintel.alejandroveintimilla.com",
    "http://dashboard.sintel.alejandroveintimilla.com",
    "https://office.sintel.alejandroveintimilla.com",
    "http://office.sintel.alejandroveintimilla.com",
    "https://sintel.alejandroveintimilla.com",
    "http://sintel.alejandroveintimilla.com",
    'http://sintel.algobeat.com'
]

# CORS_ALLOW_ALL_ORIGINS: True  # Change on production
CORS_ALLOW_CREDENTIALS = True

CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',  # Allow frontend running on localhost:3000
    'http://localhost:5173',
    'https://dashboard.sintel.alejandroveintimilla.com',
    'https://office.sintel.alejandroveintimilla.com',
    'https://sintel.alejandroveintimilla.com',
    'https://www.sintel.alejandroveintimilla.com',
    'http://sintel.algobeat.com'
]

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'profiles',
    'tokens',
    'projects',
    'rest_framework',
    'rest_framework_simplejwt',
    'storages'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


# REST Framework configuration
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'profiles.authentication.CustomAuthentication',  # Custom class for HttpOnly cookies
        # 'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
    ),
    'DEFAULT_PARSER_CLASSES': (
        'rest_framework.parsers.JSONParser',
    ),
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),

    'AUTH_COOKIE': 'jwt',  # custom
}

ROOT_URLCONF = 'SintelPlatform.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'SintelPlatform.wsgi.application'

# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

if DOCKER:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': os.getenv('POSTGRES_DB'),
            'USER': os.getenv('POSTGRES_USER'),
            'PASSWORD': os.getenv('POSTGRES_PASSWORD'),
            'HOST': os.getenv('POSTGRES_HOST'),
            'PORT': '5432',  # default PostgreSQL port
        }
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')


# Check if running in a production environment
if DJANGO_PRODUCTION:
    print("DJANGO PRODUCTION")
    STORAGES = {
        'default': {
            'BACKEND': 'storages.backends.s3boto3.S3Boto3Storage',
            'OPTIONS': {
                'bucket_name': os.getenv('AWS_STORAGE_BUCKET_NAME'),
                'region_name': os.getenv('AWS_S3_REGION_NAME', 'us-east-1'),
                'default_acl': 'public-read',
                'file_overwrite': False,
                'custom_domain': f'{os.getenv("AWS_STORAGE_BUCKET_NAME")}.s3.{os.getenv("AWS_S3_REGION_NAME", "us-east-1")}.amazonaws.com',
            },
        },
        'staticfiles': {
            'BACKEND': 'django.core.files.storage.FileSystemStorage',
            'OPTIONS': {
                'location': STATIC_ROOT,
            },
        }
    }
    # django-storages configuration for media files
    DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
    MEDIA_URL = f'https://{os.getenv("AWS_STORAGE_BUCKET_NAME")}.s3.{os.getenv("AWS_S3_REGION_NAME", "us-east-1")}.amazonaws.com/media/'

else:
    STATICFILES_STORAGE = 'django.core.files.storage.FileSystemStorage'
    MEDIA_URL = '/media/'
    MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
