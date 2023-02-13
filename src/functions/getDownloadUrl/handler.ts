import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import schema from './schema';
import { S3 } from 'aws-sdk';
import config from '../../../config';

const s3 = new S3()

const getDownloadUrl: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  var expiry = 600

  if(event.body.expiry_in_seconds) {
    expiry = event.body.expiry_in_seconds
  }

  try {
  // create an s3 upload url for the document
  const url = await s3.getSignedUrl('getObject', {
    Bucket: config.bucketname,
    Key: `${event.body.filename}`,
    Expires: expiry,
  });

  return formatJSONResponse({
    download_url: `${url}`,
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

export const main = middyfy(getDownloadUrl);
