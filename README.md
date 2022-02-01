# Expess-Generator

This is a scaffold for creating REST API

## Steps

Install express-generator as global

```bash
  npm i -g express-generator
```

Generate folder under current folder with given name

```bash
  express <folderName>
```

Move to generated folder

```bash
    cd <folderName>
```

Install dependencies

```bash
  npm install
```

Go to VSCode to see generated scaffold

```bash
  code .
```

# Second Part of the App

Install mongoose and mongoose-currency
We need currency support in mongoose schema, so we install mongoose-currency

```bash
  npm i mongoose mongoose-currency
```

# Cookies

Cookies helps us to keep us signed in. So we don't need log in every time. When I test cookies on postman, in firsty time, i had to enter username and password, but in second time i don't have to enter them. The problem on the postman is, if the first is autorized and in second try, if I enter wrong values, it accept these values. 

# Sessions
Insead of cookies, this time we use express-session for authentication. For keeping track of sessions, we use session-file-store.

