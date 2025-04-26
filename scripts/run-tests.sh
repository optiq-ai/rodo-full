#!/bin/bash

# Skrypt do uruchamiania testów

echo "Uruchamianie testów dla aplikacji RODO..."

# Przejście do katalogu głównego projektu
cd "$(dirname "$0")/.." || exit 1

# Uruchomienie testów dla frontendu
echo "Uruchamianie testów dla frontendu..."
cd frontend || exit 1
npm test

echo "Testy zostały zakończone."
