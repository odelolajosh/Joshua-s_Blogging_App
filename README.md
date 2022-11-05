# Joshua's Blogging App
A blogging app built with Express.js, MongoDB, and Mongoose. This app is a requirement for [AltSchool's Backend Engineering](https://www.altschoolafrica.com/) program. Check out the [live demo](https://joshua-blog-app.herokuapp.com/app/).

## API Documentation
Below is a list of the API endpoints and their respective methods.
```
BASE_URL = https://joshua-blog-app.herokuapp.com/api/
```

### POST /api/signup
Signs up a user. <br>
```bash
curl -X POST \
  https://joshua-blog-app.herokuapp.com/api/signup \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "joshua me",
  "email": "joshuagmail.com",
  "password": "password"
}'
```
Response
```bash
{
  "success": true,
  "token": "<token>",
  "message": "User created"
}
```

### POST /api/login
Logs in a user. <br>
```bash
curl -X POST \
  https://joshua-blog-app.herokuapp.com/api/login \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "joshua@mail.com",
  "password": "password",
  "message": "User logged in"
}'
```
Response
```bash
{
  "success": true,
  "token": "<token>"
}
```

### GET /api/posts
Returns a list of all published posts. <br>
(optional params): `?limit=10&page=1` <br>
```bash
curl -X GET \
  https://joshua-blog-app.herokuapp.com/api/post&limit=10&page=1
```
Response
```bash
{
  "success": true,
  "posts": [
    {
      "_id": "6365c6ab7d624037f39d6b0a",
      "title": "My First Post",
      "body": "This is my first post",
      "author": {
        "_id": "6365c6ab7d624037f39d6b0a",
        "first_name": "Joshua",
        "last_name": "Me",
        "email": "joshua@mail.com",
      },
      "state": "published",
      "read_time": 1,
      "read_count": 0,  
      "created_at": "2019-01-01T00:00:00.000Z",
    },
    ...
  ],
  "total": 2,
  "page": 1,
}
```

### GET /api/posts/:id
Returns a single post. <br>
```bash
curl -X GET \
  https://joshua-blog-app.herokuapp.com/api/post/6365c6ab7d624037f39d6b0a
```
Response
```bash
{
  "success": true,
  "post": {
    "_id": "6365c6ab7d624037f39d6b0a",
    "title": "My First Post",
    "body": "This is my first post",
    "author": {
      "_id": "6365c6ab7d624037f39d6b0a",
      "first_name": "Joshua",
      "last_name": "Me",
      "email": "joshua@mail.com",
    },
    "state": "published",
    "read_time": 1,
    "read_count": 0,  
    "created_at": "2019-01-01T00:00:00.000Z",
  }
}
```

### POST /api/posts
Creates a new post. <br>
```bash
curl -X POST \
  https://joshua-blog-app.herokuapp.com/api/post \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <token>' \
  -d '{ \
  "title": "My First Post", \
  "body": "This is my first post", \
  "description": "This is my first post", \
  "tags": "[\"first\", \"post\"]", \
}'
```
Response
```bash
{
  "success": true,
  "post": {
    "title": "My First Post",
    "body": "This is my first post",
    "description": "This is my first post",
    "tags": ["first", "post"],
    "author": "6365c6ab7d624037f39d6b0a",
    "state": "draft",
    "read_time": 1,
    "read_count": 0,
    "created_at": "2019-01-01T00:00:00.000Z",
    "_id": "6365c6ab7d624037f39d6b0a",
  }
}
```

### PUT /api/posts/:id
Updates a post. <br>
```bash
curl -X PUT \
  https://joshua-blog-app.herokuapp.com/api/post/6365c6ab7d624037f39d6b0a \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
  "title": "My First Updated Post",
}'
```
Response
```bash
{
  "success": true,
  "post": {
    "title": "My First Updated Post",
    "body": "This is my first post",
    "description": "This is my first post",
    "tags": ["first", "post"],
    "author": "6365c6ab7d624037f39d6b0a",
    "state": "draft",
    "read_time": 1,
    "read_count": 0,
    "created_at": "2019-01-01T00:00:00.000Z",
    "_id": "6365c6ab7d624037f39d6b0a",
  }
}
```

### DELETE /api/posts/:id
Deletes a post. <br>
```bash
curl -X DELETE \
  https://joshua-blog-app.herokuapp.com/api/post/6365c6ab7d624037f39d6b0a \
  -H 'Authorization: Bearer <token>'
```
Response
```bash
{
  "success": true
}
```

### PATCH /api/posts/:id/publish
Publishes a post. <br>
```bash
curl -X PATCH \
  https://joshua-blog-app.herokuapp.com/api/post/6365c6ab7d624037f39d6b0a/publish \
  -H 'Authorization: Bearer <token>'
```
Response
```bash
{
  "success": true,
  "post": {
    "title": "My First Post",
    "body": "This is my first post",
    "description": "This is my first post",
    "tags": ["first", "post"],
    "author": "6365c6ab7d624037f39d6b0a",
    "state": "published",
    "read_time": 1,
    "read_count": 0,
    "created_at": "2019-01-01T00:00:00.000Z",
    "_id": "6365c6ab7d624037f39d6b0a",
  }
}
```


### PATCH /api/posts/:id/unpublish
Un-publishes a post. <br>
```bash
curl -X PATCH \
  https://joshua-blog-app.herokuapp.com/api/post/6365c6ab7d624037f39d6b0a/unpublish \
  -H 'Authorization: Bearer <token>'
```
Response
```bash
{
  "success": true,
  "post": {
    "title": "My First Post",
    "body": "This is my first post",
    "description": "This is my first post",
    "tags": ["first", "post"],
    "author": "6365c6ab7d624037f39d6b0a",
    "state": "draft",
    "read_time": 1,
    "read_count": 0,
    "created_at": "2019-01-01T00:00:00.000Z",
    "_id": "6365c6ab7d624037f39d6b0a",
  }
}
```

## License
MIT © [Odelola Joshua](https://linkedin.com/in/joshua-odelola)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. You can check the [Contribution guidelines](./docs/contributing.md) for more information.

## Contributors
- [Odelola Joshua](https://linkedin.com/in/joshua-odelola)