# Message Board API - Demo

This is an Express.js & TypeScript application that is a simple message board API.
This is only for demonstration purposes.

## 🧑‍💻 API

This API provides 2 simple HTTP methods on the `Message` type:

### POST `/api/v1/message`

This API allows the caller to create a message on the default message board.

**Request Body**

```json
{
  "text": "Message text goes here"
}
```

**Response Body**

```json
{
  "id": "123456789"
}
```

---

### GET `/api/v1/message`

This API allows the caller to get all messages on the message board.

**Request Body**

No JSON body required

**Response Body**

```json
[
  {
    "id": "123456789",
    "text": "Hello message"
  },
  {
    "id": "1234567891",
    "text": "Another message here"
  }
]
```

## 🤖 Scripts

### Setup

```
npm install
```

### Lint

```
npm run lint
```

### Test

```
npm run test
```

### Development

```
npm run dev
```

## ⬇️ Middleware used

- [morgan](https://www.npmjs.com/package/morgan)
  - HTTP request logger middleware for node.js
- [helmet](https://www.npmjs.com/package/helmet)
  - Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
- [dotenv](https://www.npmjs.com/package/dotenv)
  - Dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`
- [cors](https://www.npmjs.com/package/cors)
  - CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

## Caveats

To make this Node.js application fully production ready it would need the following to be applied:

- **RxDB replaced:** Currently this is only an in-memory database. This would need to be replaced with a more scalable solution such as a DynamoDB or FireStore.
- **CI/CD:** Create a CI/CD process in this repo to make changes quickly.
- **Support for multiple boards:** This is very MVP and supports a default message board. However it could be extended to support multiple boards.
