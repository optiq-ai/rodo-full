#!/bin/bash

# Skrypt do uruchamiania środowiska lokalnego

echo "Uruchamianie środowiska lokalnego dla aplikacji RODO..."

# Sprawdzenie czy Docker jest zainstalowany
if ! command -v docker &> /dev/null; then
    echo "Docker nie jest zainstalowany. Proszę zainstalować Docker i spróbować ponownie."
    exit 1
fi

# Sprawdzenie czy Docker Compose jest zainstalowany
if ! command -v docker-compose &> /dev/null; then
    echo "Docker Compose nie jest zainstalowany. Proszę zainstalować Docker Compose i spróbować ponownie."
    exit 1
fi

# Przejście do katalogu głównego projektu
cd "$(dirname "$0")/.." || exit 1

# Uruchomienie kontenerów
echo "Uruchamianie kontenerów Docker..."
docker-compose up -d

# Sprawdzenie statusu kontenerów
echo "Sprawdzanie statusu kontenerów..."
docker-compose ps

echo "Środowisko lokalne zostało uruchomione."
echo "Frontend dostępny pod adresem: http://localhost:3000"
echo "Portainer dostępny pod adresem: http://localhost:9000"
echo "PostgreSQL dostępny pod adresem: localhost:5432"
