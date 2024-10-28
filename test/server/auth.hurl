POST http://localhost:3000/api/v1/auth/signup

{
    "name": "John",
    "surname": "Appleseed",
    "email": "johnappleseed@gmail.com",
    "password": "Admin!1234"
}

HTTP 201

[Asserts]
jsonpath "$.name" == "John"
jsonpath "$.surname" == "Appleseed"
jsonpath "$.email" == "johnappleseed@gmail.com"

POST http://localhost:3000/api/v1/auth/signin

{
    "email": "johnappleseed@gmail.com",
    "password": "Admin!1234"
}

HTTP 200

[Asserts]
cookie "accessToken" exists

[Captures]
access-token: cookie "accessToken"

GET http://localhost:3000/api/v1/auth/me

[Cookies]
accessToken: {{access-token}}

HTTP 200

[Asserts]
jsonpath "$.name" == "John"
jsonpath "$.surname" == "Appleseed"
jsonpath "$.email" == "johnappleseed@gmail.com"
jsonpath "$.accessToken" == {{access-token}}
jsonpath "$.createdAt" exists
jsonpath "$.updatedAt" exists
