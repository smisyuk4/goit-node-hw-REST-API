## Routes auth
POST `/users/register` - створити користувача
POST `/users/login` - увійти
POST `/users/logout` - вийти
POST `/users/current` - поточний користувач

## Routes contacts
GET `/api/contacts/` - взяти всі контакти
GET `/api/contacts/:contactId` - взяти один контакт по ід
POST `/api/contacts/` - створити контакт
PUT `/api/contacts/:contactId` - оновити інформацію контакта по ід
DELETE `/api/contacts/:contactId` - видалити контакт по ід
PATCH `/api/contacts/:contactId/favorite` - змінити статус контакта по ід

## Pagination
GET `/api/contacts?page=1&limit=5` - взяти 5 контактів (кількість за змовчуванням) на першій сторінці 

## Команди:
- `npm start` &mdash; старт сервера в режимі production
- `npm run start:dev` &mdash; старт сервера в режимі розробки (development)
- `npm run lint` &mdash; запустити виконання перевірки коду з eslint, необхідно виконувати перед кожним PR та виправляти всі помилки лінтера
- `npm lint:fix` &mdash; та ж перевірка лінтера, але з автоматичними виправленнями простих помилок

## git commands:
- `git checkout -b hw02-express` - створює нову гілку
- `git checkout hw02-express` - перемикає на цю гілку
- `git push oririn hw02-express` - відправляє локальні зміни на цю гілку

## GoIT Node.js Course Template Homework
Виконайте форк цього репозиторію для виконання домашніх завдань (2-6)
Форк створить репозиторій на вашому http://github.com

Додайте ментора до колаборації

Для кожної домашньої роботи створюйте свою гілку.

- hw02
- hw03
- hw04
- hw05
- hw06

Кожна нова гілка для др повинна робитися з master

Після того, як ви закінчили виконувати домашнє завдання у своїй гілці, необхідно зробити пулл-реквест (PR). Потім додати ментора для рев'ю коду. Тільки після того, як ментор заапрувить PR, ви можете виконати мердж гілки з домашнім завданням у майстер.

Уважно читайте коментарі ментора. Виправте зауваження та зробіть коміт у гілці з домашнім завданням. Зміни підтягнуться у PR автоматично після того, як ви відправите коміт з виправленнями на github
Після виправлення знову додайте ментора на рев'ю коду.

- При здачі домашньої роботи є посилання на PR
- JS-код чистий та зрозумілий, для форматування використовується Prettier

## validation data:
- `JOI` - [https://joi.dev/api/?v=17.8.1]
- `Solution switch schema` - [https://stackoverflow.com/questions/59861503/joi-validator-conditional-schema]

## data base
- `MONGODB`
npm i mongodb

## data base driver
- `mongoose` - [https://mongoosejs.com/docs/schematypes.html#objectids]
npm i mongoose

## JWT
- `bcrypt` - [https://www.npmjs.com/package/bcrypt]
npm i bcrypt
- `jsonwebtoken` - [https://www.npmjs.com/package/jsonwebtoken]
npm i jsonwebtoken