import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import config from '../../../config';

const s3 = new S3()

const getUploadUrl: APIGatewayProxyHandler = async (event) => {
  const filename = uuid()

  try {
  // create an s3 upload url for the document
  const url = s3.getSignedUrl('putObject', {
    Bucket: config.bucketname,
    Key: filename,
    Expires: 60,
  });

  return formatJSONResponse({
    filename: `${filename}`,
    upload_url: `${url}`,
  });

} catch (error: any) {
  return {
    statusCode: 500,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify('An error has occurred: ${JSON.stringify(error)}', null, 2),
  };
}
};

export const main = middyfy(getUploadUrl);
