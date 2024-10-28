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
