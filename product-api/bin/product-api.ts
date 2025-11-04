#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ProductApiStack20251103211747 } from '../lib/product-api-stack';

const app = new cdk.App();
new ProductApiStack20251103211747(app, 'ProductApiStack20251103211747', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});