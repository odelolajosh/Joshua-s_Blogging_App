# Joshua's Blogging App
A blogging app built with Express.js, MongoDB, and Mongoose. This app is a requirement for [AltSchool's Backend Engineering](https://www.altschoolafrica.com/) program. Check out the [live demo](https://joshua-blog-app.herokuapp.com/app/).

## API Documentation
Below is a list of the API endpoints and their respective methods.
```
BASE_URL = https://joshua-blog-app.herokuapp.com/api/
```

### POST /api/login
Logs in a user. <br>
```
curl -X POST \
  https://joshua-blog-app.herokuapp.com/api/login \
  -H 'Content-Type: application/json' \
  -d '{
  "username": "joshua",
  "password": "password"
}'
```
Response
```
{
  "success": true,
  "token": "<token>"
}
```

### POST /api/signup
Signs up a user. <br>
```
curl -X POST \
  https://joshua-blog-app.herokuapp.com/api/signup \
  -H 'Content-Type: application/json' \
  -d '{
  "username": "joshua",
  "password": "password"
}'
```
Response
```
{
  "success": true,
  "token": "<token>"
}
```

### GET /api/posts
Returns a list of all published posts. <br>
(optional params): `?limit=10&page=1` <br>
```
curl -X GET \
  https://joshua-blog-app.herokuapp.com/api/posts&limit=10&page=1
```
Response
```
{
  "success": true,
  "posts": [
    {
      "title": "My First Post",
      "body": "This is my first post",
      "author": "Joshua",
      "date": "2018-01-01T00:00:00.000Z"
    },
    {
      "title": "My Second Post",
      "body": "This is my second post",
      "author": "Joshua",
      "date": "2018-01-01T00:00:00.000Z"
    }
  ],
  "total": 2,
  "page": 1,
}
```

### GET /api/posts/:id
Returns a single post. <br>
```
curl -X GET \
  https://joshua-blog-app.herokuapp.com/api/posts/5a5a5a5a5a5a5a5a5a5a5a5a
```
Response
```
{
  "success": true,
  "post": {
    "title": "My First Post",
    "body": "This is my first post",
    "author": "Joshua",
    "date": "2018-01-01T00:00:00.000Z"
  }
}
```

### POST /api/posts
Creates a new post. <br>
```
curl -X POST \
  https://joshua-blog-app.herokuapp.com/api/posts \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
  "title": "My First Post",
  "body": "This is my first post",
  "author": "Joshua"
}'
```
Response
```
{
  "success": true,
  "post": {
    "title": "My First Post",
    "body": "This is my first post",
    "author": "Joshua",
    "date": "2018-01-01T00:00:00.000Z"
  }
}
```

### PUT /api/posts/:id
Updates a post. <br>
```
curl -X PUT \
  https://joshua-blog-app.herokuapp.com/api/posts/5a5a5a5a5a5a5a5a5a5a5a5a \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
  "title": "My First Post",
  "body": "This is my first post",
  "author": "Joshua"
}'
```
Response
```
{
  "success": true,
  "post": {
    "title": "My First Post",
    "body": "This is my first post",
    "author": "Joshua",
    "date": "2018-01-01T00:00:00.000Z"
  }
}
```

### DELETE /api/posts/:id
Deletes a post. <br>
```
curl -X DELETE \
  https://joshua-blog-app.herokuapp.com/api/posts/5a5a5a5a5a5a5a5a5a5a5a5a \
  -H 'Authorization: Bearer <token>'
```
Response
```
{
  "success": true
}
```

### PATCH /api/posts/:id/publish
Publishes a post. <br>
```
curl -X PATCH \
  https://joshua-blog-app.herokuapp.com/api/posts/5a5a5a5a5a5a5a5a5a5a5a5a/publish \
  -H 'Authorization: Bearer <token>'
```
Response
```
{
  "success": true
}
```


### PATCH /api/posts/:id/unpublish
Un-publishes a post. <br>
```
curl -X PATCH \
  https://joshua-blog-app.herokuapp.com/api/posts/5a5a5a5a5a5a5a5a5a5a5a5a/unpublish \
  -H 'Authorization: Bearer <token>'
```
Response
```
{
  "success": true
}
```

## License
MIT © [Odelola Joshua](https://linkedin.com/in/joshua-odelola)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. You can check the [Contribution guidelines](./docs/contributing.md) for more information.

## Contributors
- [Odelola Joshua](https://linkedin.com/in/joshua-odelola)