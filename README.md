# nodeOn
User routes

UPDATE
/api/v1/users/{user_id}

Example: 
body 
{
	"name": "hi there",
	"email": "netx2level122@gmail.com",
	"new_email": "testerses@gmail.com",
	"password": "nextlevel81",
	"new_password": "nextlevelweek"
}

POST
/api/v1/users

example:
body
{
	"name": "hi there",
	"email": "netx2level122@gmail.com",
	"password": "nextlevel81",
}






NOTES routes

GET
/api/v1/notes/?user_id=6d23ca2e-7480-4161-bc58-e03681b5104c&tags={tag}+{tag}&order=title

GET
/api/v1/notes/{note_id}

POST
/api/v1/notes/{user_id}

Example:
body
{
	"title": "Curso de Rust",
	"description": "Aprenda Rust, a linguagem que promete revolucionar a nova era da programação segura e concorrente",
	"tags": ["Rust", "programação", "baixo nível", "concorrência", "rustacean", "curso de rust", "programação rust"],
	"links": ["https://rustling.com", "https://crates.io", "https://rust.org"]
}

DELETE
/api/v1/notes/{note_id}

