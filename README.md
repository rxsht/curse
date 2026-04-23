# GuideMate

GuideMate - production-oriented marketplace локальных гидов и туров с модулем бронирования, оплатой и рейтингами.

## Stack

- Backend: Java 21, Spring Boot 3.2, Spring Security (JWT + Refresh), OAuth2 Google, JPA/Hibernate, PostgreSQL, Redis, Flyway, SpringDoc, MapStruct
- Frontend: React 18, TypeScript, Vite, Zustand, React Router, Axios, Tailwind CSS, React Hook Form + Zod
- Infra: Docker, Docker Compose

## Архитектура

Backend разделен по слоям:
- `domain`: бизнес-исключения и доменные концепции
- `application`: use cases + CQRS (`commands/queries`) + бизнес-сервисы
- `infrastructure`: persistence (JPA), security, integrations (Google Maps/OAuth2), cache
- `presentation`: REST API (`/api/v1/**`), DTO records, глобальный обработчик ошибок

## Реализованные use cases

1. Регистрация пользователя
2. Логин (JWT)
3. Обновление access token через refresh token
4. OAuth2 login через Google (конфиг)
5. Просмотр профиля текущего пользователя
6. Создание/редактирование профиля гида
7. Создание тура
8. Редактирование тура
9. Удаление тура
10. Поиск туров с фильтрацией и пагинацией
11. Просмотр деталей тура
12. Создание бронирования
13. Отмена бронирования
14. История бронирований
15. Оплата бронирования
16. Создание отзыва и рейтинга
17. Просмотр отзывов тура

## Паттерны

- Strategy: расчет среднего рейтинга (`AverageRatingStrategy`)
- Observer: событие создания бронирования (`BookingObserver`)
- Factory: создание платежа (`PaymentFactory`)

## Быстрый старт

```bash
docker compose up --build
```

Сервисы:
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:8080](http://localhost:8080)
- Swagger UI: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

## Локальный запуск

Backend:
```bash
cd backend
mvn spring-boot:run
```

Frontend:
```bash
cd frontend
npm install
npm run dev
```

## Тестирование

Backend:
```bash
cd backend
mvn test
```

Добавлены:
- Unit test (`AverageRatingStrategyTest`)
- Integration test (`AuthControllerIntegrationTest`, Testcontainers + MockMvc)

## Важные env переменные

- `JWT_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `google.maps.api-key`
- `DB_URL`, `DB_USER`, `DB_PASSWORD`
- `REDIS_HOST`, `REDIS_PORT`
