import type { AWS } from '@serverless/typescript';

import getUploadUrl from '@functions/getUploadUrl';
import getDownloadUrl from '@functions/getDownloadUrl';
import config from 'config';

const serverlessConfiguration: AWS = {
  service: 'oa-wallet-backend-example',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    stage: 'dev',
    region: 'ap-southeast-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: ['s3:PutObject','s3:GetObject'],
            Resource: [`arn:aws:s3:::${config.bucketname}`,`arn:aws:s3:::${config.bucketname}/*`],
          },
        ]
      }
    }
  },
  // import the function via paths
  functions: { getUploadUrl, getDownloadUrl },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
  resources: {
    Resources: {
      DocumentsBucket: {
        Type: 'AWS::S3::Bucket',
        Properties: {
          BucketName: config.bucketname
        },
      },
    }
  }
};

module.exports = serverlessConfiguration;
