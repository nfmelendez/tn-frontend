# True North - Front End

Frontend for a calculator with 6 digits precision and a random string generator. It uses integers in the transport layer nd the backend, and only shows the "human readable" numbers at the moment of printing to the screen. Each operation has a cost and a user has credits that will use until it won't have none of them.


## Technologies
*Front End:*
- React
- Javascript
- MUI Material Design
- Gatsby
- AWS S3 for web serving

*Back End:*

- AWS lambda with Python 3.12
- AWS Dynamodb
- Serverless framework
- Flask


## How to use

### Install it and run for development:

```bash
npm install
npm run develop
```

### For Production 

```bash
npm install
npm run build
```
it will generate the statics files to upload to a web server or similar

