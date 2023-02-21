# oa-wallet-backend-example
A reference set of API endpoints to support the "Generate QR code" feature from the OA Wallet Apps ([Android](https://github.com/Open-Attestation/oa-wallet-android), [iOS](https://github.com/Open-Attestation/oa-wallet-ios))

## Endpoints
### getuploadurl
`getuploadurl` generates a temporary S3 presigned upload url for the OA Wallet Apps to upload the chosen document that the user wishes to generate a QR code for.

#### Request
```
    curl --location --request GET 'https://<DEPLOYED_ENDPOINT>/dev/getuploadurl'
```
#### Response
```
{
    "filename": "<ASSIGNED_FILENAME>",
    "upload_url": "<PRESIGNED_UPLOAD_URL>"
}
```

### getdownloadurl
`getdownloadurl` generates a temporary S3 presigned download url for the OA Wallet Apps to encode into a QR code.

#### Request
```
    curl --location --request POST 'https://<DEPLOYED_ENDPOINT>/dev/getdownloadurl' \
    --header 'Content-Type: application/json' \
    --data-raw '{
    "filename" : "<ASSIGNED_FILENAME>",
    "expiry_in_seconds" : <INTEGER>
}'
```
#### Response
```
{
    "download_url": "<PRESIGNED_DOWNLOAD_URL>"
}
```

## Installation/deployment instructions
- Open `config.ts` and add in the S3 bucket name to be provisioned.

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

For detailed instructions, please refer to the [documentation](https://www.serverless.com/framework/docs/providers/aws/).

Depending on your preferred package manager, follow the instructions below to deploy your project.

> **Requirements**: NodeJS `lts/fermium (v.14.15.0)`. If you're using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to ensure you're using the same Node version in local and in your lambda's runtime.

### Using NPM

- Run `npm i` to install the project dependencies
- Run `npx sls deploy` to deploy this stack to AWS

### Using Yarn

- Run `yarn` to install the project dependencies
- Run `yarn sls deploy` to deploy this stack to AWS

> :warning: As is, this template, once deployed, opens a **public** endpoint within your AWS account resources. Anybody with the URL can actively execute the API Gateway endpoint and the corresponding lambda. You should protect this endpoint with the authentication method of your choice.

### Post deployment
Upon succesful deployment, copy the deployed endpoints into the the respective config files for OA Wallet ([Android](https://github.com/Open-Attestation/oa-wallet-android/blob/master/app/src/main/java/com/example/oa_wallet_android/Config.kt)/[iOS](https://github.com/Open-Attestation/oa-wallet-ios/blob/master/oa-wallet-ios/Config.swift))

![endpoints](https://user-images.githubusercontent.com/29425696/220238049-e817ee58-63dd-4414-94eb-56a94c84d837.png)
