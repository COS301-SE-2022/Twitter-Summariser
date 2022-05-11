import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as iam from '@aws-cdk/aws-iam';

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'TwitterSummariserBucket', {
      bucketName: 'twitter-summariser-bucket',
      websiteIndexDocument: 'index.html',
      blockPublicAccess: new s3.BlockPublicAccess({
        restrictPublicBuckets: false
      })
    });

    const bucketPolicy = new iam.PolicyStatement ({
      actions: ['s3:GetObject'],
      resources: [
        `${bucket.bucketArn}/*`
      ],
      principals: [new iam.Anyone()],
    })
    bucket.addToResourcePolicy(bucketPolicy); 
  }
}
