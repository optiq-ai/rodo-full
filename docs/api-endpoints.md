# API Endpoints dla aplikacji RODO

Ten dokument opisuje strukturę API, które będzie wykorzystywane przez frontend aplikacji RODO. Dokument ten służy jako specyfikacja dla przyszłej implementacji backendu oraz jako dokumentacja dla programistów frontendowych.

## Podstawowe informacje

- Bazowy URL API: `/api/v1`
- Format odpowiedzi: JSON
- Autentykacja: JWT (JSON Web Token)
- Nagłówki autentykacji: `Authorization: Bearer {token}`

## Struktura odpowiedzi

### Sukces

```json
{
  "success": true,
  "data": {
    // Dane odpowiedzi
  },
  "meta": {
    // Metadane (paginacja, filtry, itp.)
  }
}
```

### Błąd

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Opis błędu",
    "details": {
      // Szczegóły błędu (opcjonalnie)
    }
  }
}
```

## Endpointy API

### Autentykacja

#### Logowanie

- **URL**: `/api/v1/auth/login`
- **Metoda**: `POST`
- **Dane wejściowe**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Odpowiedź**:
  ```json
  {
    "success": true,
    "data": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "id": "123",
        "email": "user@example.com",
        "firstName": "Jan",
        "lastName": "Kowalski",
        "role": "admin"
      }
    }
  }
  ```

#### Odświeżanie tokenu

- **URL**: `/api/v1/auth/refresh-token`
- **Metoda**: `POST`
- **Dane wejściowe**:
  ```json
  {
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
- **Odpowiedź**:
  ```json
  {
    "success": true,
    "data": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```

#### Wylogowanie

- **URL**: `/api/v1/auth/logout`
- **Metoda**: `POST`
- **Dane wejściowe**:
  ```json
  {
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
- **Odpowiedź**:
  ```json
  {
    "success": true,
    "data": {
      "message": "Wylogowano pomyślnie"
    }
  }
  ```

### Użytkownicy

#### Pobieranie listy użytkowników

- **URL**: `/api/v1/users`
- **Metoda**: `GET`
- **Parametry**:
  - `page`: numer strony (domyślnie 1)
  - `pageSize`: liczba elementów na stronie (domyślnie 10)
  - `search`: wyszukiwanie po imieniu, nazwisku lub emailu
  - `role`: filtrowanie po roli
- **Odpowiedź**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "123",
        "email": "user@example.com",
        "firstName": "Jan",
        "lastName": "Kowalski",
        "role": "admin",
        "createdAt": "2023-01-01T12:00:00Z",
        "updatedAt": "2023-01-01T12:00:00Z"
      },
      // ...
    ],
    "meta": {
      "page": 1,
      "pageSize": 10,
      "totalItems": 100,
      "totalPages": 10
    }
  }
  ```

#### Pobieranie użytkownika

- **URL**: `/api/v1/users/{id}`
- **Metoda**: `GET`
- **Odpowiedź**:
  ```json
  {
    "success": true,
    "data": {
      "id": "123",
      "email": "user@example.com",
      "firstName": "Jan",
      "lastName": "Kowalski",
      "role": "admin",
      "createdAt": "2023-01-01T12:00:00Z",
      "updatedAt": "2023-01-01T12:00:00Z"
    }
  }
  ```

#### Tworzenie użytkownika

- **URL**: `/api/v1/users`
- **Metoda**: `POST`
- **Dane wejściowe**:
  ```json
  {
    "email": "user@example.com",
    "firstName": "Jan",
    "lastName": "Kowalski",
    "password": "password123",
    "role": "admin"
  }
  ```
- **Odpowiedź**:
  ```json
  {
    "success": true,
    "data": {
      "id": "123",
      "email": "user@example.com",
      "firstName": "Jan",
      "lastName": "Kowalski",
      "role": "admin",
      "createdAt": "2023-01-01T12:00:00Z",
      "updatedAt": "2023-01-01T12:00:00Z"
    }
  }
  ```

#### Aktualizacja użytkownika

- **URL**: `/api/v1/users/{id}`
- **Metoda**: `PUT`
- **Dane wejściowe**:
  ```json
  {
    "firstName": "Jan",
    "lastName": "Nowak",
    "role": "user"
  }
  ```
- **Odpowiedź**:
  ```json
  {
    "success": true,
    "data": {
      "id": "123",
      "email": "user@example.com",
      "firstName": "Jan",
      "lastName": "Nowak",
      "role": "user",
      "createdAt": "2023-01-01T12:00:00Z",
      "updatedAt": "2023-01-02T12:00:00Z"
    }
  }
  ```

#### Usuwanie użytkownika

- **URL**: `/api/v1/users/{id}`
- **Metoda**: `DELETE`
- **Odpowiedź**:
  ```json
  {
    "success": true,
    "data": {
      "message": "Użytkownik został usunięty"
    }
  }
  ```

### Dokumenty

#### Pobieranie listy dokumentów

- **URL**: `/api/v1/documents`
- **Metoda**: `GET`
- **Parametry**:
  - `page`: numer strony (domyślnie 1)
  - `pageSize`: liczba elementów na stronie (domyślnie 10)
  - `search`: wyszukiwanie po tytule lub treści
  - `category`: filtrowanie po kategorii
  - `status`: filtrowanie po statusie
  - `dateFrom`: filtrowanie po dacie od
  - `dateTo`: filtrowanie po dacie do
- **Odpowiedź**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "123",
        "title": "Polityka prywatności",
        "description": "Polityka prywatności firmy",
        "category": "policy",
        "status": "active",
        "version": 1,
        "createdBy": {
          "id": "123",
          "firstName": "Jan",
          "lastName": "Kowalski"
        },
        "createdAt": "2023-01-01T12:00:00Z",
        "updatedAt": "2023-01-01T12:00:00Z"
      },
      // ...
    ],
    "meta": {
      "page": 1,
      "pageSize": 10,
      "totalItems": 100,
      "totalPages": 10
    }
  }
  ```

#### Pobieranie dokumentu

- **URL**: `/api/v1/documents/{id}`
- **Metoda**: `GET`
- **Odpowiedź**:
  ```json
  {
    "success": true,
    "data": {
      "id": "123",
      "title": "Polityka prywatności",
      "description": "Polityka prywatności firmy",
      "content": "Treść dokumentu...",
      "category": "policy",
      "status": "active",
      "version": 1,
      "tags": ["RODO", "prywatność"],
      "attachments": [
        {
          "id": "456",
          "name": "załącznik.pdf",
          "url": "/api/v1/documents/123/attachments/456",
          "size": 1024,
          "mimeType": "application/pdf"
        }
      ],
      "createdBy": {
        "id": "123",
        "firstName": "Jan",
        "lastName": "Kowalski"
      },
      "createdAt": "2023-01-01T12:00:00Z",
      "updatedAt": "2023-01-01T12:00:00Z"
    }
  }
  ```

#### Tworzenie dokumentu

- **URL**: `/api/v1/documents`
- **Metoda**: `POST`
- **Dane wejściowe**:
  ```json
  {
    "title": "Polityka prywatności",
    "description": "Polityka prywatności firmy",
    "content": "Treść dokumentu...",
    "category": "policy",
    "status": "active",
    "tags": ["RODO", "prywatność"]
  }
  ```
- **Odpowiedź**:
  ```json
  {
    "success": true,
    "data": {
      "id": "123",
      "title": "Polityka prywatności",
      "description": "Polityka prywatności firmy",
      "content": "Treść dokumentu...",
      "category": "policy",
      "status": "active",
      "version": 1,
      "tags": ["RODO", "prywatność"],
      "attachments": [],
      "createdBy": {
        "id": "123",
        "firstName": "Jan",
        "lastName": "Kowalski"
      },
      "createdAt": "2023-01-01T12:00:00Z",
      "updatedAt": "2023-01-01T12:00:00Z"
    }
  }
  ```

#### Aktualizacja dokumentu

- **URL**: `/api/v1/documents/{id}`
- **Metoda**: `PUT`
- **Dane wejściowe**:
  ```json
  {
    "title": "Zaktualizowana polityka prywatności",
    "description": "Zaktualizowana polityka prywatności firmy",
    "content": "Zaktualizowana treść dokumentu...",
    "category": "policy",
    "status": "active",
    "tags": ["RODO", "prywatność", "aktualizacja"]
  }
  ```
- **Odpowiedź**:
  ```json
  {
    "success": true,
    "data": {
      "id": "123",
      "title": "Zaktualizowana polityka prywatności",
      "description": "Zaktualizowana polityka prywatności firmy",
      "content": "Zaktualizowana treść dokumentu...",
      "category": "policy",
      "status": "active",
      "version": 2,
      "tags": ["RODO", "prywatność", "aktualizacja"],
      "attachments": [],
      "createdBy": {
        "id": "123",
        "firstName": "Jan",
        "lastName": "Kowalski"
      },
      "updatedBy": {
        "id": "123",
        "firstName": "Jan",
        "lastName": "Kowalski"
      },
      "createdAt": "2023-01-01T12:00:00Z",
      "updatedAt": "2023-01-02T12:00:00Z"
    }
  }
  ```

#### Usuwanie dokumentu

- **URL**: `/api/v1/documents/{id}`
- **Metoda**: `DELETE`
- **Odpowiedź**:
  ```json
  {
    "success": true,
    "data": {
      "message": "Dokument został usunięty"
    }
  }
  ```

#### Pobieranie wersji dokumentu

- **URL**: `/api/v1/documents/{id}/versions`
- **Metoda**: `GET`
- **Odpowiedź**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "123-v1",
        "version": 1,
        "title": "Polityka prywatności",
        "updatedBy": {
          "id": "123",
          "firstName": "Jan",
          "lastName": "Kowalski"
        },
        "updatedAt": "2023-01-01T12:00:00Z"
      },
      {
        "id": "123-v2",
        "version": 2,
        "title": "Zaktualizowana polityka prywatności",
        "updatedBy": {
          "id": "123",
          "firstName": "Jan",
          "lastName": "Kowalski"
        },
        "updatedAt": "2023-01-02T12:00:00Z"
      }
    ]
  }
  ```

#### Przywracanie wersji dokumentu

- **URL**: `/api/v1/documents/{id}/versions/{versionId}/restore`
- **Metoda**: `POST`
- **Odpowiedź**:
  ```json
  {
    "success": true,
    "data": {
      "id": "123",
      "title": "Polityka prywatności",
      "description": "Polityka prywatności firmy",
      "content": "Treść dokumentu...",
      "category": "policy",
      "status": "active",
      "version": 3,
      "tags": ["RODO", "prywatność"],
      "attachments": [],
      "createdBy": {
        "id": "123",
        "firstName": "Jan",
        "lastName": "Kowalski"
      },
      "updatedBy": {
        "id": "123",
        "firstName": "Jan",
        "lastName": "Kowalski"
      },
      "createdAt": "2023-01-01T12:00:00Z",
      "updatedAt": "2023-01-03T12:00:00Z"
    }
  }
  ```

### Rejestry RODO

#### Pobieranie listy wpisów w rejestrze czynności przetwarzania

- **URL**: `/api/v1/registers/processing-activities`
- **Metoda**: `GET`
- **Parametry**:
  - `page`: numer strony (domyślnie 1)
  - `pageSize`: liczba elementów na stronie (domyślnie 10)
  - `search`: wyszukiwanie po nazwie lub opisie
  - `category`: filtrowanie po kategorii
  - `status`: filtrowanie po statusie
- **Odpowiedź**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "123",
        "name": "Przetwarzanie danych pracowników",
        "description": "Przetwarzanie danych osobowych pracowników w celach kadrowych",
        "category": "HR",
        "status": "active",
        "legalBasis": "Art. 6 ust. 1 lit. b) RODO",
        "dataCategories": ["dane identyfikacyjne", "dane kontaktowe", "dane finansowe"],
        "dataSubjects": ["pracownicy"],
        "retentionPeriod": "5 lat",
        "createdAt": "2023-01-01T12:00:00Z",
        "updatedAt": "2023-01-01T12:00:00Z"
      },
      // ...
    ],
    "meta": {
      "page": 1,
      "pageSize": 10,
      "totalItems": 100,
      "totalPages": 10
    }
  }
  ```

#### Pobieranie wpisu w rejestrze czynności przetwarzania

- **URL**: `/api/v1/registers/processing-activities/{id}`
- **Metoda**: `GET`
- **Odpowiedź**:
  ```json
  {
    "success": true,
    "data": {
      "id": "123",
      "name": "Przetwarzanie danych pracowników",
      "description": "Przetwarzanie danych osobowych pracowników w celach kadrowych",
      "category": "HR",
      "status": "active",
      "legalBasis": "Art. 6 ust. 1 lit. b) RODO",
      "purpose": "Realizacja umowy o pracę",
      "dataCategories": ["dane identyfikacyjne", "dane kontaktowe", "dane finansowe"],
      "dataSubjects": ["pracownicy"],
      "recipients": ["ZUS", "US"],
      "transfersToThirdCountries": false,
      "securityMeasures": ["szyfrowanie", "kontrola dostępu"],
      "retentionPeriod": "5 lat",
      "dataController": {
        "name": "Firma XYZ",
        "address": "ul. Przykładowa 1, 00-000 Warszawa",
        "contact": "kontakt@firma.pl"
      },
      "dpo": {
        "name": "Jan Kowalski",
        "email": "dpo@firma.pl",
        "phone": "+48 123 456 789"
      },
      "createdBy": {
        "id": "123",
        "firstName": "Jan",
        "lastName": "Kowalski"
      },
      "createdAt": "2023-01-01T12:00:00Z",
      "updatedAt": "2023-01-01T12:00:00Z"
    }
  }
  ```

### Incydenty

#### Pobieranie listy incydentów

- **URL**: `/api/v1/incidents`
- **Metoda**: `GET`
- **Parametry**:
  - `page`: numer strony (domyślnie 1)
  - `pageSize`: liczba elementów na stronie (domyślnie 10)
  - `search`: wyszukiwanie po tytule lub opisie
  - `status`: filtrowanie po statusie
  - `severity`: filtrowanie po poziomie ważności
  - `dateFrom`: filtrowanie po dacie od
  - `dateTo`: filtrowanie po dacie do
- **Odpowiedź**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "123",
        "title": "Wyciek danych klientów",
        "description": "Wyciek danych klientów z bazy danych",
        "status": "investigating",
        "severity": "high",
        "reportedAt": "2023-01-01T12:00:00Z",
        "reportedBy": {
          "id": "123",
          "firstName": "Jan",
          "lastName": "Kowalski"
        },
        "createdAt": "2023-01-01T12:00:00Z",
        "updatedAt": "2023-01-01T12:00:00Z"
      },
      // ...
    ],
    "meta": {
      "page": 1,
      "pageSize": 10,
      "totalItems": 100,
      "totalPages": 10
    }
  }
  ```

#### Pobieranie incydentu

- **URL**: `/api/v1/incidents/{id}`
- **Metoda**: `GET`
- **Odpowiedź**:
  ```json
  {
    "success": true,
    "data": {
      "id": "123",
      "title": "Wyciek danych klientów",
      "description": "Wyciek danych klientów z bazy danych",
      "status": "investigating",
      "severity": "high",
      "affectedDataCategories": ["dane identyfikacyjne", "dane kontaktowe"],
      "affectedDataSubjects": ["klienci"],
      "potentialImpact": "Wysoki wpływ na prawa i wolności osób, których dane dotyczą",
      "reportedAt": "2023-01-01T12:00:00Z",
      "reportedBy": {
        "id": "123",
        "firstName": "Jan",
        "lastName": "Kowalski"
      },
      "assignedTo": {
        "id": "456",
        "firstName": "Anna",
        "lastName": "Nowak"
      },
      "reportedToAuthority": true,
      "reportedToAuthorityAt": "2023-01-01T14:00:00Z",
      "notifiedDataSubjects": true,
      "notifiedDataSubjectsAt": "2023-01-01T16:00:00Z",
      "remedialActions": [
        {
          "id": "789",
          "description": "Zmiana haseł dostępowych",
          "status": "completed",
          "completedAt": "2023-01-01T18:00:00Z"
        },
        {
          "id": "790",
          "description": "Aktualizacja zabezpieczeń",
          "status": "in_progress",
          "completedAt": null
        }
      ],
      "attachments": [
        {
          "id": "456",
          "name": "raport.pdf",
          "url": "/api/v1/incidents/123/attachments/456",
          "size": 1024,
          "mimeType": "application/pdf"
        }
      ],
      "createdAt": "2023-01-01T12:00:00Z",
      "updatedAt": "2023-01-02T12:00:00Z"
    }
  }
  ```

### Wnioski podmiotów danych

#### Pobieranie listy wniosków

- **URL**: `/api/v1/subject-requests`
- **Metoda**: `GET`
- **Parametry**:
  - `page`: numer strony (domyślnie 1)
  - `pageSize`: liczba elementów na stronie (domyślnie 10)
  - `search`: wyszukiwanie po nazwie lub emailu podmiotu
  - `type`: filtrowanie po typie wniosku
  - `status`: filtrowanie po statusie
  - `dateFrom`: filtrowanie po dacie od
  - `dateTo`: filtrowanie po dacie do
- **Odpowiedź**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "123",
        "type": "access",
        "status": "pending",
        "subject": {
          "name": "Jan Kowalski",
          "email": "jan.kowalski@example.com"
        },
        "receivedAt": "2023-01-01T12:00:00Z",
        "dueDate": "2023-01-31T12:00:00Z",
        "createdAt": "2023-01-01T12:00:00Z",
        "updatedAt": "2023-01-01T12:00:00Z"
      },
      // ...
    ],
    "meta": {
      "page": 1,
      "pageSize": 10,
      "totalItems": 100,
      "totalPages": 10
    }
  }
  ```

#### Pobieranie wniosku

- **URL**: `/api/v1/subject-requests/{id}`
- **Metoda**: `GET`
- **Odpowiedź**:
  ```json
  {
    "success": true,
    "data": {
      "id": "123",
      "type": "access",
      "status": "pending",
      "subject": {
        "name": "Jan Kowalski",
        "email": "jan.kowalski@example.com",
        "phone": "+48 123 456 789",
        "address": "ul. Przykładowa 1, 00-000 Warszawa"
      },
      "description": "Proszę o dostęp do moich danych osobowych",
      "receivedAt": "2023-01-01T12:00:00Z",
      "dueDate": "2023-01-31T12:00:00Z",
      "assignedTo": {
        "id": "456",
        "firstName": "Anna",
        "lastName": "Nowak"
      },
      "identityVerified": true,
      "identityVerifiedAt": "2023-01-02T12:00:00Z",
      "identityVerifiedBy": {
        "id": "456",
        "firstName": "Anna",
        "lastName": "Nowak"
      },
      "responseDetails": null,
      "respondedAt": null,
      "attachments": [
        {
          "id": "456",
          "name": "wniosek.pdf",
          "url": "/api/v1/subject-requests/123/attachments/456",
          "size": 1024,
          "mimeType": "application/pdf"
        }
      ],
      "communications": [
        {
          "id": "789",
          "direction": "incoming",
          "channel": "email",
          "content": "Treść wiadomości...",
          "sentAt": "2023-01-01T12:00:00Z",
          "sender": {
            "name": "Jan Kowalski",
            "email": "jan.kowalski@example.com"
          }
        },
        {
          "id": "790",
          "direction": "outgoing",
          "channel": "email",
          "content": "Treść odpowiedzi...",
          "sentAt": "2023-01-02T14:00:00Z",
          "sender": {
            "id": "456",
            "firstName": "Anna",
            "lastName": "Nowak"
          }
        }
      ],
      "createdAt": "2023-01-01T12:00:00Z",
      "updatedAt": "2023-01-02T14:00:00Z"
    }
  }
  ```

### Dashboard

#### Pobieranie danych dla dashboardu

- **URL**: `/api/v1/dashboard`
- **Metoda**: `GET`
- **Parametry**:
  - `dateFrom`: filtrowanie po dacie od
  - `dateTo`: filtrowanie po dacie do
- **Odpowiedź**:
  ```json
  {
    "success": true,
    "data": {
      "statistics": {
        "documentsCount": 100,
        "processingActivitiesCount": 50,
        "incidentsCount": 10,
        "subjectRequestsCount": 20
      },
      "recentActivities": [
        {
          "id": "123",
          "type": "document_created",
          "description": "Utworzono dokument 'Polityka prywatności'",
          "user": {
            "id": "123",
            "firstName": "Jan",
            "lastName": "Kowalski"
          },
          "timestamp": "2023-01-01T12:00:00Z"
        },
        // ...
      ],
      "incidentsByStatus": {
        "reported": 2,
        "investigating": 3,
        "resolved": 5
      },
      "subjectRequestsByStatus": {
        "pending": 5,
        "in_progress": 10,
        "completed": 5
      },
      "incidentsByMonth": [
        {
          "month": "2023-01",
          "count": 3
        },
        {
          "month": "2023-02",
          "count": 5
        },
        // ...
      ],
      "subjectRequestsByType": {
        "access": 10,
        "rectification": 5,
        "erasure": 3,
        "restriction": 2
      }
    }
  }
  ```

## Kody błędów

- `AUTH_INVALID_CREDENTIALS`: Nieprawidłowe dane logowania
- `AUTH_TOKEN_EXPIRED`: Token wygasł
- `AUTH_TOKEN_INVALID`: Nieprawidłowy token
- `AUTH_INSUFFICIENT_PERMISSIONS`: Niewystarczające uprawnienia
- `RESOURCE_NOT_FOUND`: Zasób nie został znaleziony
- `VALIDATION_ERROR`: Błąd walidacji danych
- `INTERNAL_SERVER_ERROR`: Wewnętrzny błąd serwera

## Uwagi

1. Wszystkie endpointy (z wyjątkiem `/api/v1/auth/login` i `/api/v1/auth/refresh-token`) wymagają autentykacji.
2. Wszystkie daty są w formacie ISO 8601 (UTC).
3. Paginacja jest dostępna dla wszystkich endpointów zwracających listy.
4. Filtrowanie i sortowanie jest dostępne dla większości endpointów zwracających listy.
5. Wszystkie endpointy zwracają ujednoliconą strukturę odpowiedzi.
6. Wszystkie endpointy obsługują błędy w ujednolicony sposób.

## Przyszłe rozszerzenia

1. Implementacja endpointów dla modułu analizy ryzyka.
2. Implementacja endpointów dla modułu szkoleń i edukacji.
3. Implementacja endpointów dla modułu raportowania i analityki.
4. Implementacja endpointów dla modułu zarządzania zgodami.
5. Implementacja endpointów dla modułu mapowania danych.
6. Implementacja endpointów dla modułu zarządzania ryzykiem dostawców.
