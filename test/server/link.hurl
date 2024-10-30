POST http://localhost:3000/api/v1/links

{
    "fullUrl": "https://www.youtube.com/watch?v=sKq",
    "shortUrl": "https://www.youtube.com/123456789"
}

HTTP 201

[Asserts]
jsonpath "$.fullUrl" == "https://www.youtube.com/watch?v=sKq"
jsonpath "$.shortUrl" == "https://www.youtube.com/123456789"
jsonpath "$.createdAt" exists
jsonpath "$.updatedAt" exists

[Captures]
link-id: jsonpath "$.id"

PUT http://localhost:3000/api/v1/links/{{link-id}}

{
    "fullUrl": "https://www.twitch.tv/ibai",
    "shortUrl": "https://www.twitch.tv/1"
}

HTTP 200

[Asserts]
jsonpath "$.fullUrl" == "https://www.twitch.tv/ibai"
jsonpath "$.shortUrl" == "https://www.twitch.tv/1"
jsonpath "$.createdAt" exists
jsonpath "$.updatedAt" exists

[Captures]
link-id: jsonpath "$._id"

GET http://localhost:3000/api/v1/links/{{link-id}}

HTTP 200

[Asserts]
jsonpath "$.fullUrl" == "https://www.twitch.tv/ibai"
jsonpath "$.shortUrl" == "https://www.twitch.tv/1"
jsonpath "$.createdAt" exists
jsonpath "$.updatedAt" exists
