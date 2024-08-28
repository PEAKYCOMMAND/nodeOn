# nodeOn
User routes

UPDATE
```
/api/v1/users/{user_id}
```

Example: 
body 
```
{
	"name": "hi",
	"email": "netxl@gmail.com",
	"new_email": "testerses@gmail.com",
	"password": "level81",
	"new_password": "teste123"
}
```

POST
```
/api/v1/users
```
example:
body
```
{
	"name": "hi there",
	"email": "neve122@gmail.com",
	"password": "level81",
}
```





NOTES routes

GET
```
/api/v1/notes/?user_id={user_id}={tag}+{tag}&order=title
```
GET
```
/api/v1/notes/{note_id}
```
POST
```
/api/v1/notes/{user_id}
```
Example:
body
```
{
	"title": "Curso de Rust",
	"description": "Aprenda Rust, a linguagem que promete revolucionar a nova era da programação segura e concorrente",
	"tags": ["Rust", "programação", "baixo nível", "concorrência", "rustacean", "curso de rust", "programação rust"],
	"links": ["https://rustling.com", "https://crates.io", "https://rust.org"]
}
```
DELETE
```
/api/v1/notes/{note_id}
```

Tags
FIXXME
