# m295-233131-LB-B
ZLI-Modul 02.05.23. - 05-05.23. Lernbeurteilung Teil B<br>
Diese API ist ein Backend für eine Lernbeurteilung. Folgende Schritte müssen unternommen werden, um diese API zu verwenden:

# 1. Informationen
* Autor: Robin Trachsel
* Entwicklungsumgebung: Visual Studio Code
* Version: 1.0.0
* Git-Log: log.txt

# 2. Installation
* Installiere Node.js und npm auf deinem Computer.
* Klone das Git-Repository mit der API auf deinen Computer.
* Öffne die Konsole und navigiere in den Ordner, in den das Repository geklont wurde.
* Gib "npm install" ein, um die benötigten Abhängigkeiten zu installieren.
# 3. Verwendung
[GET /tasks](<#get-tasks>) | 
[POST /tasks](<#post-tasks>) | 
[GET /tasks/:id](<#get-tasksid>) | 
[PUT /tasks/:id](<#put-tasksid>) | 
[DELETE /tasks/:id](<#delete-tasksid>) | 
[POST /login](#post-login) | 
[GET /verify](<#get-verify>) | 
[DELETE /logout](<#delete-logout>)
* Starte die API mit dem Befehl "node index.js".
* Öffne einen Webbrowser und navigiere zu "http://localhost:3000".
* Du kannst auf folgende Endpunkte zugreifen:
## GET /tasks: <br>
* Gibt alle Aufgaben zurück.
* Beispiele:
```
http://localhost:3000/tasks
```
## POST /tasks: <br>
* Erstellt eine neue Aufgabe.
* Beispiele:
```
http://localhost:3000/tasks
```
## GET /tasks/:id: <br>
* Gibt die Aufgabe mit der entsprechenden ID zurück.
* Beispiele:
```
http://localhost:3000/tasks/1
```
```
http://localhost:3000/tasks/2
```
## PUT /tasks/:id: <br>
* Aktualisiert die Aufgabe mit der entsprechenden ID.
* Beispiele:
```
http://localhost:3000/tasks/1

request body: 
{
  "title": "Das ist eine Task",
  "finished": true
}
```
```
http://localhost:3000/tasks/2

request body: 
{
  "title": "Das ist eine andere Task",
  "finished": false
}
```
## DELETE /tasks/:id: <br>
* Löscht die Aufgabe mit der entsprechenden ID.
* Beispiele:
```
http://localhost:3000/tasks/1
```
```
http://localhost:3000/tasks/2
```
## POST /login: <br>
* Authentifiziert den Benutzer und erstellt eine Sitzung.
* Beispiele:
```
http://localhost:3000/login

request body: 
{
  "username": "eine@zufällige.email",
  "password": "m295"
}
```
## GET /verify: <br>
* Überprüft, ob der Benutzer authentifiziert ist.
* Beispiele:
```
http://localhost:3000/verify
```
## DELETE /logout: <br>
* Beendet die aktuelle Sitzung.
* Beispiele:
```
http://localhost:3000/logout
```
# 4. Testen
* Die Testfälle sind in der Datei "TESTING.md" beschrieben. Lesen Sie diese Anleitung sorgfältig durch, um sicherzustellen, dass alle Funktionen korrekt funktionieren.
# 5. Quellen
Diese API wurde von Robin Trachsel erstellt und ist Teil einer Leistungsbeurteilung.