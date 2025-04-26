# Aplikacja RODO (GDPR) - Frontend

## Opis projektu

Aplikacja RODO to kompleksowe narzędzie do zarządzania zgodnością z Ogólnym Rozporządzeniem o Ochronie Danych (RODO/GDPR). Aplikacja umożliwia organizacjom efektywne zarządzanie procesami związanymi z ochroną danych osobowych, dokumentacją RODO, rejestracją incydentów, analizą ryzyka oraz obsługą wniosków podmiotów danych.

Frontend aplikacji został zbudowany w React z wykorzystaniem nowoczesnych bibliotek i narzędzi, zapewniając intuicyjny interfejs użytkownika w jasnej, pastelowej kolorystyce.

## Stack technologiczny

- **React 18+** - biblioteka do budowy interfejsu użytkownika
- **JavaScript (ES6+)** - język programowania
- **Redux Toolkit** - zarządzanie stanem aplikacji
- **React Query** - zarządzanie zapytaniami i cache
- **Material-UI v6** - komponenty UI
- **React-Hook-Form** - zarządzanie formularzami
- **Chart.js** - wizualizacje i wykresy
- **React Router v6** - routing
- **Axios** - zapytania HTTP
- **i18next** - internacjonalizacja
- **Jest + React Testing Library** - testy
- **Cypress** - testy E2E
- **ESLint + Prettier** - formatowanie kodu

## Środowisko rozwojowe i wdrożeniowe

Projekt jest skonfigurowany do pracy w środowisku Docker z wykorzystaniem:
- Kontenera z frontendem React

## Struktura projektu

```
rodo-full/
├── docker-compose.yml         # Konfiguracja Docker Compose
├── docs/                      # Dokumentacja projektu
│   ├── architecture.md        # Architektura aplikacji
│   ├── modules.md             # Opis modułów funkcjonalnych
│   └── ui-guidelines.md       # Wytyczne dotyczące UI
├── frontend/                  # Aplikacja React
│   ├── public/                # Pliki statyczne
│   ├── src/                   # Kod źródłowy
│   │   ├── assets/            # Zasoby statyczne (ikony, obrazy)
│   │   ├── components/        # Współdzielone komponenty
│   │   ├── config/            # Konfiguracja aplikacji
│   │   ├── features/          # Funkcjonalności podzielone na moduły
│   │   ├── hooks/             # Własne hooki
│   │   ├── layouts/           # Szablony układów stron
│   │   ├── providers/         # Dostawcy kontekstu
│   │   ├── services/          # Usługi API i logika biznesowa
│   │   ├── store/             # Konfiguracja Redux
│   │   ├── utils/             # Narzędzia pomocnicze
│   │   ├── App.js             # Główny komponent aplikacji
│   │   └── index.js           # Punkt wejściowy
│   ├── .eslintrc.js           # Konfiguracja ESLint
│   ├── .prettierrc            # Konfiguracja Prettier
│   ├── package.json           # Zależności npm
│   └── Dockerfile             # Konfiguracja kontenera dla frontendu
├── scripts/                   # Skrypty pomocnicze
│   ├── start-local.sh         # Uruchamianie środowiska lokalnego
│   ├── run-tests.sh           # Uruchamianie testów
│   └── deploy.sh              # Wdrażanie aplikacji
├── .env.example               # Przykładowy plik zmiennych środowiskowych
├── .gitignore                 # Pliki ignorowane przez Git
├── README.md                  # Główny plik README
└── TODO.md                    # Lista zadań do wykonania
```

## Moduły funkcjonalne

Aplikacja składa się z następujących modułów:

1. **Moduł Dashboard** - intuicyjny interfejs z kompletem informacji
2. **Moduł Zarządzania Dokumentacją** - ewidencja dokumentów RODO
3. **Moduł Rejestrów RODO** - rejestry czynności przetwarzania, umów, naruszeń, itp.
4. **Moduł Analizy Ryzyka** - narzędzia do przeprowadzania oceny ryzyka
5. **Moduł Zarządzania Incydentami** - rejestrowanie i obsługa incydentów
6. **Moduł Obsługi Wniosków Podmiotów** - rejestracja i obsługa wniosków
7. **Moduł Szkoleń i Edukacji** - baza materiałów szkoleniowych
8. **Moduł Raportowania i Analityki** - generowanie raportów zgodności
9. **Moduł Ustawień** - konfiguracja systemu i zarządzanie użytkownikami

Szczegółowy opis każdego modułu znajduje się w pliku [docs/modules.md](docs/modules.md).

## Instalacja i uruchomienie

### Wymagania wstępne

- Docker i Docker Compose
- Git

### Uruchomienie z Docker Compose (zalecane)

1. Sklonuj repozytorium:
   ```bash
   git clone <adres-repozytorium>
   cd rodo-full
   ```

2. Skopiuj plik `.env.example` do `.env` i dostosuj zmienne środowiskowe:
   ```bash
   cp .env.example .env
   ```

3. Uruchom aplikację za pomocą Docker Compose:
   ```bash
   docker-compose up -d
   ```

4. Aplikacja będzie dostępna pod adresem: http://localhost:3000

### Uruchomienie bez Dockera (tylko frontend)

1. Przejdź do katalogu frontend:
   ```bash
   cd frontend
   ```

2. Zainstaluj zależności:
   ```bash
   npm install
   ```

3. Uruchom aplikację:
   ```bash
   npm start
   ```

4. Aplikacja będzie dostępna pod adresem: http://localhost:3000

## Testowanie

### Testy jednostkowe

```bash
cd frontend
npm test
```

### Testy E2E

```bash
cd frontend
npm run cypress:open
```

## Wdrażanie

Instrukcje dotyczące wdrażania aplikacji znajdują się w pliku [docs/deployment.md](docs/deployment.md).

## Licencja

Ten projekt jest objęty licencją [wpisz licencję].

## Kontakt

W przypadku pytań lub problemów, skontaktuj się z [wpisz dane kontaktowe].
