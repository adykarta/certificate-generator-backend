# Certificate Generator

Certificate Generator is here to help you create all your certicate just a blink with your own template

## API Documentation

```http
POST /api/upload
```

Request:

```javascript
{
  "file" : file,
}
```

Response:

```javascript
{
    "message": "success",
    "data": {
        "path": "https://res.cloudinary.com/dummy.png",
        "filename":"dummy"
    }
}
```

```http
POST /api/upload/multiple
```

Request:

```javascript
{
  "files" : excelFile,
  "files" : jpgFile
}
```

Response:

```javascript
{
    "message": "success",
    "data": {
        "image": {
            "path": "https://res.cloudinary.com/dovf8ri55/image/upload/dummy.png",
            "filename": "dummy"
        },
        "excel": [
            {
                "header": "nama",
                "data": [
                    "ahmad",
                    "lala",
                    "po"
                ]
            },
            {
                "header": "jabatan",
                "data": [
                    "coo",
                    "cto",
                    "ceo"
                ]
            }
        ]
    }
}
```

```http
POST /api/certificate
```

Request:

```javascript
{
  "image" : '{"path":"https://res.cloudinary.com/dummy.png" ,"filename":"dummy"}',
  "item1" : '{"text":"mahmud", "width":500, "height":200}'
}
```

Response:

```javascript
{
    "message": "success",
    "data": [{
        "url": "http://localhost:8080/files/dummy.pdf",
    }]
}
```

```http
POST /api/certificate/multiple
```

Request:

```javascript
{
  "image" : '{"path":"https://res.cloudinary.com/dummy.png" ,"filename":"dummy"}',
  "item1" : '{"text":["ahmad","lala","po"], "width":500, "height":200}',
  "item2" : '{"text":["coo","cto","ceo"], "width":300, "height":300}'
}
```

Response:

```javascript
{
    "message": "success",
    "data": [
        {
            "url": "http://localhost:8080/files/dummy1.pdf",
            "fileName": "dummy1.pdf"
        },
        {
            "url": "http://localhost:8080/files/dummy2.pdf",
            "fileName": "dummy2.pdf"
        },
        {
            "url": "http://localhost:8080/files/dummy3.pdf",
            "fileName": "dummy3.pdf"
        },
        {
            "url": "http://localhost:8080/files/output.zip",
            "fileName": "output.zip"
        }
    ]
}
```

```http
GET /files/:filename
```

## Deployment

## Contributing

```javascript
git clone https://github.com/adykarta/certificate-generator-backend.git
cd certificate-generator-backend
```

## Development

```javascript
git checkout -b [branch-name]
....code....
git add .
git commit -m [commit-message]
git push origin [branch-name]
```

Dont forget to merge request to main branch!

## Meet the Team

- Bramantio Krisno Aji - 1706024495
- Mohammad Hasan Albar - 1706025056
- Muhamad Istiady Kartadibrata - 1706025283
