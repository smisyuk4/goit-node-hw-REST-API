## Routes auth
- POST `/users/register` - створити користувача (обов`язково пароль та пошта, можна вказати план. За змовчуванням starter)
- POST `/users/login` - увійти (обов`язково пароль та пошта). Отримаємо токен
- POST `/users/logout` - вийти (обов`язково токен)
- POST `/users/current` - поточний користувач (обов`язково токен)
- PATCH `/users/change` - оновити інформацію користувача (обов`язково пароль, пошта, токен)
- PATCH `/users/avatars` - оновити інформацію користувача (завантажити аватарку)
- GET `/users/verify/:verificationToken` - відправляється токен верифікації пошти користувача
- POST `/users/verify` - повторна відправка листа з верифікацією пошти (обов`язково пошта)

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
- `npm run lint:fix` &mdash; та ж перевірка лінтера, але з автоматичними виправленнями простих помилок

## Git commands:
- `git checkout -b hw02-express` - створює нову гілку
- `git checkout hw02-express` - перемикає на цю гілку
- `git push oririn hw02-express` - відправляє локальні зміни на цю гілку
- `git branch -d hw02-express` - видаляє цю гілку (треба знаходитись на головній)

## Validation data:
- `JOI` - [joi.dev](https://joi.dev/api/?v=17.8.1)
- `Solution switch schema` - [stackoverflow.com/questions](https://stackoverflow.com/questions/59861503/joi-validator-conditional-schema)
```npm i joi```

## Data base
- `MONGODB`
``` npm i mongodb ```

## Data base driver
- `mongoose` - [mongoosejs.com](https://mongoosejs.com/docs/schematypes.html#objectids)
``` npm i mongoose ``` 

## JWT
- `bcrypt` - [npmjs.com](https://www.npmjs.com/package/bcrypt)
``` npm i bcrypt ``` 
- `jsonwebtoken` - [npmjs.com](https://www.npmjs.com/package/jsonwebtoken)
``` npm i jsonwebtoken ``` 

## Middleware for handling multipart/form-data
- `multer` - [npmjs.com](https://www.npmjs.com/package/multer), [github.com](https://github.com/expressjs/multer)
``` npm i multer ``` 

## Generator avatar URLs
- `gravatar` - [npmjs.com](https://www.npmjs.com/package/gravatar)
``` npm i gravatar ``` 

## Editor images
- `jimp` - [npmjs.com](https://www.npmjs.com/package/jimp), [github.com](https://github.com/jimp-dev/jimp/tree/main/packages/plugin-resize)
``` npm i jimp ``` 

## Send email
- `mailtrap` - [mailtrap.io](https://mailtrap.io/)
- `nanoId` - [npmjs.com](https://www.npmjs.com/package/nanoid)
```npm i nanoid@^3.0.0```
- `nodemailer` - [nodemailer.com](https://nodemailer.com/about/)
```npm i nodemailer```

## Tests
- `jest` - [jestjs.io](https://jestjs.io/uk/docs/getting-started)
``` npm install --save-dev jest ``` 