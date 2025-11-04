import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export class ProductApiStack20251103211747 extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // DynamoDB Table
    const productsTable = new dynamodb.Table(this, 'ProductsTable20251103211747', {
      tableName: 'Products20251103211747',
      partitionKey: { name: 'productId', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PROVISIONED,
      readCapacity: 5,
      writeCapacity: 5,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Enable auto scaling
    const readScaling = productsTable.autoScaleReadCapacity({
      minCapacity: 1,
      maxCapacity: 50,
    });
    readScaling.scaleOnUtilization({
      targetUtilizationPercent: 70,
    });

    const writeScaling = productsTable.autoScaleWriteCapacity({
      minCapacity: 1,
      maxCapacity: 50,
    });
    writeScaling.scaleOnUtilization({
      targetUtilizationPercent: 70,
    });

    // Lambda Functions
    const getProductsFunction = new lambda.Function(this, 'GetProductsFunction20251103211747', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'getProducts.handler',
      code: lambda.Code.fromAsset('lambda'),
      environment: {
        TABLE_NAME: productsTable.tableName,
      },
    });

    const getProductByIdFunction = new lambda.Function(this, 'GetProductByIdFunction20251103211747', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'getProductById.handler',
      code: lambda.Code.fromAsset('lambda'),
      environment: {
        TABLE_NAME: productsTable.tableName,
      },
    });

    const generateQRCodeFunction = new lambda.Function(this, 'GenerateQRCodeFunction20251103211747', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'generateQRCode.handler',
      code: lambda.Code.fromAsset('lambda'),
      environment: {
        TABLE_NAME: productsTable.tableName,
        API_BASE_URL: 'https://api.example.com', // Will be updated after API Gateway creation
      },
    });

    const populateSampleDataFunction = new lambda.Function(this, 'PopulateSampleDataFunction20251103211747', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'populateSampleData.handler',
      code: lambda.Code.fromAsset('lambda'),
      environment: {
        TABLE_NAME: productsTable.tableName,
      },
      timeout: cdk.Duration.minutes(5),
    });

    // Grant permissions
    productsTable.grantReadData(getProductsFunction);
    productsTable.grantReadData(getProductByIdFunction);
    productsTable.grantReadData(generateQRCodeFunction);
    productsTable.grantReadWriteData(populateSampleDataFunction);

    // API Gateway
    const api = new apigateway.RestApi(this, 'ProductApi20251103211747', {
      restApiName: 'Product API 20251103211747',
      description: 'API for product specifications with QR code generation',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: ['Content-Type', 'X-Amz-Date', 'Authorization', 'X-Api-Key'],
      },
    });

    // API Resources
    const apiResource = api.root.addResource('api');
    const productsResource = apiResource.addResource('products');
    const productByIdResource = productsResource.addResource('{id}');
    const qrcodeResource = productByIdResource.addResource('qrcode');

    // API Methods
    productsResource.addMethod('GET', new apigateway.LambdaIntegration(getProductsFunction));
    productByIdResource.addMethod('GET', new apigateway.LambdaIntegration(getProductByIdFunction));
    qrcodeResource.addMethod('GET', new apigateway.LambdaIntegration(generateQRCodeFunction));

    // Outputs
    new cdk.CfnOutput(this, 'ApiUrl', {
      value: api.url,
      description: 'API Gateway URL',
    });

    new cdk.CfnOutput(this, 'TableName', {
      value: productsTable.tableName,
      description: 'DynamoDB Table Name',
    });
  }
}
