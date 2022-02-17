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

## Sessions Part 2

Added sign up, log in and logout

For sign up and log in we use post method, for logout we use get method

# User Authentication with Passport and JSON Web Token

In the previous versions, we couldn't use GET operations if we are not authorized (and also other operations). But now, we can perform GET operations even though we don't authorized

To perform POST, PUT or DELETE operations on Postman, we should add our token as key to Header

For example

```bash
  bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWY5NGYyYTIyZDhmYWUwY2VjNDBlZjAiLCJpYXQiOjE2NDM3NDg4NDMsImV4cCI6MTY0Mzc1MjQ0M30.WwIIb3nFaJhsFYmnuzxdPB21Bcch72ZaFbEM1QaFQxM
```

# Assignment 3

Task 1

You have implemented the verifyAdmin() function in authenticate.js.

The verifyAdmin() function will allow you to proceed forward along the normal path of middleware execution if you are an Admin

The verifyAdmin() function will prevent you from proceeding further if you do not have Admin privileges, and will send an error message to you in the reply.

Task 2

Any one is restricted to perform only the GET operation on the resources/REST API end points.

An Admin (who must be first checked to make sure is an ordinary user), can perform the GET, PUT, POST and DELETE operations on any of the resources/ REST API end points.

Task 3

A GET operation on http://localhost:3000/users by an Admin will return the details of the registered users

An ordinary user (without Admin privileges) cannot perform the GET operation on http://localhost:3000/users.

Task 4

A registered user is allowed to update and delete his/her own comments.

Any user or an Admin cannot update or delete the comment posted by other users.

# HTTPS and Secure Communication

```bash
  openssl genrsa 1024 > private.key
  openssl req -new -key private.key -out cert.csr
  openssl x509 -req -in cert.csr -signkey private.key -out certificate.pem
```

# OAuth2 with Facebook

Add authorization to header in postman like below

```
  Authorization - Bearer {access-token}
```

or

```
  access_token - {access-token}
```

or add access token to end of link as query

```
  https://localhost:3443/users/facebook/token?access_token={access-token}
```
