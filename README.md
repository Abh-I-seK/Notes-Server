## The Setup
Clone the repo
```sh
git clone https://github.com/Abh-I-seK/Notes-Server.git
```
Install the dependencies
```sh
npm install
   ```
Add the environment variables
- DATABASE_URL (Your Postgresql connection String)
- SECRET_S  (Your Secret for jwt tokens)

<hr></hr>
To run the server do the following in the root directory
<br></br>

```sh
tsc -b
   ```
```sh
node dist/server.js
   ```
<hr></hr>

To Test the server , make sure to run it when your database is empty.

```sh
npx jest
  ```
