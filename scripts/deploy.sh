#!/bin/bash

# Skrypt do wdrażania aplikacji

echo "Wdrażanie aplikacji RODO..."

# Przejście do katalogu głównego projektu
cd "$(dirname "$0")/.." || exit 1

# Budowanie aplikacji frontendowej
echo "Budowanie aplikacji frontendowej..."
cd frontend || exit 1
npm run build

echo "Aplikacja została zbudowana."
echo "Aby wdrożyć aplikację na serwer produkcyjny, należy:"
echo "1. Skopiować zawartość katalogu frontend/build na serwer WWW"
echo "2. Skonfigurować bazę danych PostgreSQL na serwerze produkcyjnym"
echo "3. Uruchomić skrypty inicjalizacyjne bazy danych"
echo "4. Skonfigurować serwer WWW do obsługi aplikacji React"
