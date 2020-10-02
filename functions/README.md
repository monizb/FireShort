# Setup Guide

1. Create Firebase Cloud Function locally [refer this](https://cloud.google.com/functions/docs).
2. After creating, add this following dependencies. <br>
    `npm i express body-parser nanoid`
3. Copy these files [index.js](https://gist.github.com/JithinAntony4/b9d0a217a41bd6cb600d86861cf35849), [urls.js](https://gist.github.com/JithinAntony4/1e67fc300cec7418771859a2f2d49097) into your local directory (where your cloud function resides).
4. Deploy this Function `firebase deploy --only functions`.

### Setup Swagger API Spec
1. Locate [swagger.json](public/swagger.json) replace `%YOUR_CLOUD_FUNCTION_URL%` with your Cloud Function URL
2. Great! you're done. start your application `npm start`
