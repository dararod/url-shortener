POST http://localhost:3000/api/v1/auth/signup

{
    "name": "John",
    "surname": "Appleseed",
    "email": "johnappleseed3@gmail.com",
    "password": "Admin!1234"
}

HTTP 201

[Asserts]
jsonpath "$.name" == "John"
jsonpath "$.surname" == "Appleseed"
jsonpath "$.email" == "johnappleseed3@gmail.com"

POST http://localhost:3000/api/v1/auth/signin

{
    "email": "johnappleseed3@gmail.com",
    "password": "Admin!1234"
}

HTTP 200

[Asserts]
cookie "accessToken" exists

[Captures]
access-token: cookie "accessToken"

PUT http://localhost:3000/api/v1/user

{
    "name": "Ilia",
    "surname": "Topuria"
}

HTTP 200

[Asserts]
jsonpath "$.name" == "Ilia"
jsonpath "$.surname" == "Topuria"
jsonpath "$.email" == "johnappleseed3@gmail.com"