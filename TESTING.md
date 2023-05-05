# Testfälle
[GET /tasks](<#1-get-tasks>) | 
[POST /tasks](<#2-post-tasks>) | 
[GET /tasks/:id](<#3-get-tasksid>) | 
[PUT /tasks/:id](<#4-put-tasksid>) | 
[DELETE /tasks/:id](<#5-delete-tasksid>) | 
[POST /login](#6-post-login) | 
[GET /verify](<#7-get-verify>) | 
[DELETE /logout](<#8-delete-logout>)
## 1. GET /tasks
* Liefert alle Aufgaben des Benutzers.
* Testfall 1: Nicht angemeldet
```
http://localhost:3000/tasks

{
  "error": "Not logged in"
}
```
* Testfall 2: Angemeldet
```
http://localhost:3000/tasks

[
  {
    "id": 1,
    "title": "Das ist eine Task",
    "finished": true,
    "user_id": 1
  },
  {
    "id": 2,
    "title": "Das ist eine andere Task",
    "finished": false,
    "user_id": 1
  }
]
```
## 2. POST /tasks
* Erstellt eine neue Aufgabe.
* Testfall 1: Nicht angemeldet
```
http://localhost:3000/tasks

{
  "error": "Not logged in"
}
```
* Testfall 2: Angemeldet
```
http://localhost:3000/tasks

{
  "id": 3,
  "title": "Das ist eine Example-Task",
  "createdOn": "2023-05-05T14:23:50.814Z"
}
```
## 3. GET /tasks/:id
* Liefert die Aufgabe mit der entsprechenden ID.
* Testfall 1: Nicht angemeldet
```
http://localhost:3000/tasks/1

{
  "error": "Not logged in"
}
```
* Testfall 2: Angemeldet
```
http://localhost:3000/tasks/1

[
  {
    "id": 1,
    "title": "Das ist eine Task",
    "createdOn": "2023-05-05T14:18:23.644Z",
    "finishedOn": "2023-05-05T14:23:03.838Z"
  }
]
```
* Testfall 3: Ungültige ID
```
http://localhost:3000/tasks/d

Not Found (404)
```
* Testfall 4: Nicht existierende ID
```
http://localhost:3000/tasks/100

Not Found (404)
```
## 4. PUT /tasks/:id
* Aktualisiert die Aufgabe mit der entsprechenden ID.
* Testfall 1: Nicht angemeldet
```
http://localhost:3000/tasks/1

{
  "error": "Not logged in"
}
```
* Testfall 2: Angemeldet
```
http://localhost:3000/tasks/1

[
  {
    "id": 1,
    "title": "Das ist eine Task",
    "createdOn": "2023-05-05T14:18:23.644Z",
    "finishedOn": "2023-05-05T14:23:03.838Z"
  }
]
```
* Testfall 3: Ungültige ID
```
http://localhost:3000/tasks/d

Not Found (404)
```
* Testfall 4: Nicht existierende ID
```
http://localhost:3000/tasks/100

Not Found (404)
```
## 5. DELETE /tasks/:id
* Löscht die Aufgabe mit der entsprechenden ID.
* Testfall 1: Nicht angemeldet
```
http://localhost:3000/tasks/1

{
  "error": "Not logged in"
}
```
* Testfall 2: Angemeldet
```
http://localhost:3000/tasks/1

{
  "id": 1,
  "title": "Das ist eine andere Task",
  "createdOn": "2023-05-05T14:18:23.644Z",
  "finishedOn": "2023-05-05T14:23:03.838Z"
}
```
* Testfall 3: Ungültige ID
```
http://localhost:3000/tasks/d

Not Found (404)
```
* Testfall 4: Nicht existierende ID
```
http://localhost:3000/tasks/100

Not Found (404)
```
## 6. POST /login
* Meldet den Benutzer an.
* Testfall 1: Ungültige E-Mail
```
http://localhost:3000/login

{
  "error": "Invalid email"
}
```
* Testfall 2: Ungültiges Passwort
```
http://localhost:3000/login

{
  "error": "Invalid credentials"
}
```
* Testfall 3: Gültige E-Mail und Passwort
```
http://localhost:3000/login

{
  "email": "admin@admin.ch"
}
```
## 7. GET /verify
* Überprüft, ob der Benutzer angemeldet ist.
* Testfall 1: Nicht angemeldet
```
http://localhost:3000/verify

{
  "error": "Not logged in"
}
```
* Testfall 2: Angemeldet
```
http://localhost:3000/verify

{
  "email": "admin@admin.ch"
}
```
## 8. DELETE /logout
* Meldet den Benutzer ab.
* Testfall 1: Nicht angemeldet
```
http://localhost:3000/logout

{
  "error": "Not logged in"
}
```
* Testfall 2: Angemeldet
```
http://localhost:3000/logout

No Content (204)
```