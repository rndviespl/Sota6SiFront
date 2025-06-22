# Sota6SiFront

Sota6SiFront — это веб-приложение, эмулирующее работу интернет-магазина для устройств Интернета вещей (IoT), предназначенное для тестирования API, юзабилити и других аспектов взаимодействия. Разработано с использованием Angular CLI версии 19.2.8 и интегрировано с бэкендом на ASP.NET Core. Приложение обеспечивает удобный интерфейс на базе Taiga UI и оптимизировано для быстрой загрузки страниц (~1–2 секунды, ~20–30 запросов, ~1–2 МБ данных). Документация, созданная с помощью Compodoc, доступна по маршруту /docs.

---

## 🚀Описание проекта

Sota6SiFront имитирует функциональность интернет-магазина IoT-устройств, предоставляя платформу для тестирования API, проверки пользовательского интерфейса и оценки производительности. Проект позволяет разработчикам и тестировщикам отлаживать интеграции, анализировать поведение системы и улучшать пользовательский опыт. Документация Compodoc, доступная по /docs, содержит подробные описания компонентов, сервисов и тестовых сценариев.

### ✨Основные функциональности
- **Каталог товаров**: Просмотр списка продуктов с карточками, содержащими изображения, названия, цены и возможность перехода к детальной странице.
- **Детальная страница товара**: Информация о продукте, включая изображения в карусели и характеристики.
- **Корзина**: Добавление, удаление и управление товарами перед оформлением заказа.
- **Авторизация и регистрация**: Вход и создание учётной записи для пользователей и тестовых профилей.
- **Личный кабинет**: Просмотр пользовательской информации, достижений и настроек.
- **Система достижений**: Отслеживание пользовательских действий (например, переход к товару) с регистрацией успехов или ошибок.
- **Документация**: Доступ к описанию компонентов, сервисов и API через маршрут `/docs`, сгенерированная Compodoc.

### 🛠️Что можно сделать
- Просматривать и выбирать товары из каталога.
- Добавлять товары в корзину и управлять её содержимым.
- Авторизоваться или зарегистрироваться для доступа к личному кабинету.
- Изучать документацию API и компонентов по `/docs`.
- Тестировать API (например, `/api/DpImages/bulk-images`) с помощью Selenium, как описано в документации.
- Разворачивать приложение и документацию через Docker.

---

## 🛠️Установка и запуск

### 📋Требования
- Node.js (версия 22.14.0 или выше)
- Docker (для контейнеризации)
- .NET SDK (версия 8.0 для бэкенда)

### 📦Установка
1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/rndviespl/Sota6SiFront.git
   cd Sota5SiFront
   ```
2. Установите зависимости:
   ```bash
   npm install
   ```
3. Сгенерируйте документацию Compodoc:
   ```bash
   npm run compodoc:build-and-copy
   ```

### 🌐Локальный сервер
Запустите сервер разработки:
```bash
ng serve
```
Откройте `http://localhost:4200/` в браузере. Изменения в коде автоматически обновляют приложение.

### 🏗️Сборка
Соберите проект для продакшена:
```bash
npm run build
```
Артефакты сборки сохраняются в папке `dist/`.

### 🐳Развёртывание через Docker
Запустите приложение и документацию:
```bash
docker-compose up --build
```
- Приложение: `http://localhost:4200`
- Документация: `http://localhost:4200/docs`

Остановка контейнеров:
```bash
docker-compose down
```


## 📚Документация

Документация, сгенерированная Compodoc, доступна по маршруту `/docs`. Она включает:
- Описание компонентов (например, `CardItemComponent`).
- Документацию сервисов и интерфейсов с JSDoc.
- Пользовательские страницы (например, `testing-api.md`) с примерами тестирования API.

Локальный просмотр документации:
```bash
npm run compodoc
```
Откройте `http://localhost:8080`.

---

## 🧩Генерация кода

Создавайте новые компоненты, сервисы или модули:
```bash
ng generate component component-name
```
Список доступных шаблонов:
```bash
ng generate --help
```

---🌟 Стек технологий
Фронтэнд

 <svg xmlns="http://www.w3.org/2000/svg" width="71" height="20" role="img" aria-label="Angular"><title>Angular</title><g shape-rendering="crispEdges"><rect width="0" height="20" fill="#555"/><rect x="0" width="71" height="20" fill="#dd0031"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="110"><image x="5" y="3" width="14" height="14" href="data:image/svg+xml;base64,PHN2ZyBmaWxsPSJ3aGl0ZXNtb2tlIiByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+QW5ndWxhcjwvdGl0bGU+PHBhdGggZD0iTTE2LjcxMiAxNy43MTFINy4yODhsLTEuMjA0IDIuOTE2TDEyIDI0bDUuOTE2LTMuMzczLTEuMjA0LTIuOTE2Wk0xNC42OTIgMGw3LjgzMiAxNi44NTUuODE0LTEyLjg1NkwxNC42OTIgMFpNOS4zMDggMCAuNjYyIDMuOTk5bC44MTQgMTIuODU2TDkuMzA4IDBabS0uNDA1IDEzLjkzaDYuMTk4TDEyIDYuMzk2IDguOTAzIDEzLjkzWiIvPjwvc3ZnPg=="/><text x="445" y="140" transform="scale(.1)" fill="#fff" textLength="430">Angular</text></g></svg>

 

 

 


Бэкэнд

 


Инструменты

## Дополнительные ресурсы
- [Документация Angular CLI](https://angular.dev/tools/cli)
- [Документация Taiga UI](https://taiga-ui.dev)
- [Документация Compodoc](https://compodoc.app)
- [Документация ASP.NET Core](https://docs.microsoft.com/aspnet/core)
- [Документация Docker](https://docs.docker.com)

---

Этот README предоставляет чёткое описание Sota6SiFront, его функциональности и инструкции для начала работы. Если нужны дополнения или изменения, напишите!