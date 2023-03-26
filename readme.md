## Routes auth
- POST `/users/register` - створити користувача (обов`язково пароль та пошта, можна вказати план. За змовчуванням starter)
- POST `/users/login` - увійти (обов`язково пароль та пошта). Отримаємо токен
- POST `/users/logout` - вийти (обов`язково токен)
- POST `/users/current` - поточний користувач (обов`язково токен)
- PATCH `/users/change` - оновити інформацію користувача (обов`язково пароль, пошта, токен)

## Routes contacts
- GET `/api/contacts/` - взяти всі контакти
- GET `/api/contacts/:contactId` - взяти один контакт по ід
- POST `/api/contacts/` - створити контакт
- PUT `/api/contacts/:contactId` - оновити інформацію контакта по ід
- DELETE `/api/contacts/:contactId` - видалити контакт по ід
- PATCH `/api/contacts/:contactId/favorite` - змінити статус контакта по ід

## Pagination
- GET `/api/contacts?page=1&limit=5` - взяти 5 контактів (кількість за змовчуванням) на першій сторінці 

## Filter
- GET `/api/contacts/?favorite=false` взяти контакти по полю favorite зі значенням false

## CLI commands:
- `npm start` &mdash; старт сервера в режимі production
- `npm run start:dev` &mdash; старт сервера в режимі розробки (development)
- `npm run lint` &mdash; запустити виконання перевірки коду з eslint, необхідно виконувати перед кожним PR та виправляти всі помилки лінтера
- `npm lint:fix` &mdash; та ж перевірка лінтера, але з автоматичними виправленнями простих помилок

## Git commands:
- `git checkout -b hw02-express` - створює нову гілку
- `git checkout hw02-express` - перемикає на цю гілку
- `git push oririn hw02-express` - відправляє локальні зміни на цю гілку

## Validation data:
- `JOI` - [https://joi.dev/api/?v=17.8.1]
- `Solution switch schema` - [https://stackoverflow.com/questions/59861503/joi-validator-conditional-schema]
npm i joi

## Data base
- `MONGODB`
npm i mongodb

## Data base driver
- `mongoose` - [https://mongoosejs.com/docs/schematypes.html#objectids]
npm i mongoose

## JWT
- `bcrypt` - [https://www.npmjs.com/package/bcrypt]
npm i bcrypt
- `jsonwebtoken` - [https://www.npmjs.com/package/jsonwebtoken]
npm i jsonwebtoken

## Middleware for handling multipart/form-data
- `multer` - [https://www.npmjs.com/package/multer]
npm i multer

## Generator avatar URLs
- `gravatar` - [https://www.npmjs.com/package/gravatar]
npm i gravatar

## Editor images
- `jimp` - [https://www.npmjs.com/package/jimp]
npm i jimp

## Tests
- `jest` - [https://jestjs.io/uk/docs/getting-started]
npm install --save-dev jest