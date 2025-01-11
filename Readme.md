# MERN URL Shortener

## Motivation

In order to learn about the MERN Stack and
Back-End development I decided to build a
URL Shortener Server.

## Getting Started

### Development

1. Run `just dev` to start Docker Services
2. Run the HTTP Server using `just server`
3. Run the Front-End using `just client` in a separate terminal

## Spec

The following section describes the server solution
architecture and available endpoints.

### REST API

The `server` solution serves a HTTP Server using the
REST Spec. The available endpoints are listed below.

> The column "🔐" determines wether the user should
> provide a token to perform the operation.

#### Public API

#### Links

Public links usage

Method | Path | Description | 🔐
--- | --- | --- | ---
`GET` | `/:slug` | Redirects user to actual link (if exists). | ➖

#### Private API

#### Authentication

Authentication is performed via Cookies which are
signed by the server.

Method | Path | Description | 🔐
--- | --- | --- | ---
`POST` | `/api/v1/auth/signup` | Registers a new account. | ➖
`POST` | `/api/v1/auth/signin` | Generates a token and sets a cookie if credentials are valid. | ➖
`GET` | `/api/v1/user/me` | Retrieves authenticated user data. | ✅
`DELETE` | `/api/v1/auth/session` | Invalidates user's token. | ✅


#### User Managent

Users can update their profiles data using the `user`
API.

Method | Path | Description | 🔐
--- | --- | --- | ---
`PUT` | `/api/v1/user` | Updates user details such as `name` and `surname`. | ✅

#### Short-Link Managent

Short links are the main resource of this server and
should be treated as a first-class citizen.

Method | Path | Description | 🔐
--- | --- | --- | ---
`GET` | `/api/v1/links/:slug` | Retrieves a link's summary. | ✅
`POST` | `/api/v1/links` | Creates a shortened link. | ✅
`PUT` | `/api/v1/links/:slug` | Updates a shortened link details. | ✅
`PATCH` | `/api/v1/links/deactivate/:slug` | Deactivates link by slug. | ✅
`PATCH` | `/api/v1/links/activate/:slug` | Activates link by slug. | ✅

### Entities

> The column "👁️" determines the public visibility of this field.
> Generally speaking, fields that are not public visible lives only
> in the server-side or as database reference.

#### <ins>User</ins>

Property | Data Type | Description | 👁️
--- | --- | --- | ---
name | `String` | User's name. | ✅
surname | `String` | User's surname. | ✅
email | `String` | User's email. Cannot be updated. | ✅
passwordHash | `String` | Hash used to validate password. | ➖
accessToken | `Option<String>` | Hash used to validate password. | ➖
createdAt | `Date` | Date of creation. | ✅
updatedAt | `Date` | Date of most recent update. | ✅

#### <ins>Link</ins>

Property | Data Type | Description | 👁️
--- | --- | --- | ---
fullUrl | `String` | Link's full url | ✅
slug | `String` | Link's slug | ✅
activated | `Boolean` | Determines whether a link is active or not | ✅
userId | `String` | Link owner | ✅
createdAt | `Date` | Date of creation. | ✅
updatedAt | `Date` | Date of most recent update. | ✅


#### <ins>Link History Item</ins>

TODO

## License

MIT Licensed &copy; David Alejandro Rodríguez 2024
