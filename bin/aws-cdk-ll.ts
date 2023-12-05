#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { MyPipelineStack } from '../lib/aws-cdk-ll-stack';

const app = new cdk.App();
new MyPipelineStack(app, 'MyPipelineStack', {
  env: {
    account: '268548213468',
    region: 'us-east-1',
  }
});