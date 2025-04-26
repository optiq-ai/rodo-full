#!/bin/bash

# Skrypt do wypychania zmian do zdalnego repozytorium Git

echo "Wypychanie zmian do zdalnego repozytorium Git..."

# Przejście do katalogu głównego projektu
cd "$(dirname "$0")/.." || exit 1

# Sprawdzenie czy podano wiadomość commita
if [ -z "$1" ]; then
  echo "Błąd: Nie podano wiadomości commita."
  echo "Użycie: ./scripts/push-to-remote.sh \"Wiadomość commita\""
  exit 1
fi

# Dodanie wszystkich zmian
echo "Dodawanie zmian..."
git add .

# Utworzenie commita
echo "Tworzenie commita..."
git commit -m "$1"

# Wypychanie zmian do zdalnego repozytorium
echo "Wypychanie zmian..."
git push

echo "Zmiany zostały wypchnięte do zdalnego repozytorium."
