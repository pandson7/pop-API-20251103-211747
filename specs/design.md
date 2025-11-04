# Technical Design Document

## Architecture Overview

The Product API system follows a serverless architecture pattern using AWS services to provide scalable, cost-effective product data access with QR code generation capabilities.

## System Components

### 1. API Gateway
- **Purpose**: Expose REST API endpoints for product operations
- **Endpoints**:
  - `GET /api/products` - List all products
  - `GET /api/products/{id}` - Get specific product
  - `GET /api/products/{id}/qrcode` - Generate QR code for product

### 2. AWS Lambda Functions
- **Runtime**: Node.js 18.x
- **Functions**:
  - `getProducts` - Retrieve all products from DynamoDB
  - `getProductById` - Retrieve specific product by ID
  - `generateQRCode` - Generate QR code image for product URL

### 3. DynamoDB Table
- **Table Name**: `Products`
- **Primary Key**: `productId` (String)
- **Attributes**:
  - `productId` - Unique identifier
  - `name` - Product name
  - `category` - Product category
  - `brand` - Product brand
  - `description` - Product description
  - `price` - Product price
  - `customAttributes` - Flexible JSON object for additional properties

### 4. QR Code Generation
- **Library**: `qrcode` npm package
- **Output Format**: PNG image
- **Encoding**: Product detail URL (`/api/products/{id}`)

## Data Model

### Product Schema
```json
{
  "productId": "string",
  "name": "string",
  "category": "string",
  "brand": "string",
  "description": "string",
  "price": "number",
  "customAttributes": {
    "color": "string",
    "size": "string",
    "weight": "number",
    "material": "string"
  },
  "createdAt": "string",
  "updatedAt": "string"
}
```

## API Response Formats

### Product List Response
```json
{
  "products": [
    {
      "productId": "prod-001",
      "name": "Wireless Headphones",
      "category": "Electronics",
      "brand": "TechBrand",
      "price": 99.99
    }
  ],
  "count": 1
}
```

### Single Product Response
```json
{
  "productId": "prod-001",
  "name": "Wireless Headphones",
  "category": "Electronics",
  "brand": "TechBrand",
  "description": "High-quality wireless headphones with noise cancellation",
  "price": 99.99,
  "customAttributes": {
    "color": "Black",
    "batteryLife": "30 hours",
    "connectivity": "Bluetooth 5.0"
  }
}
```

## Security Considerations

- API Gateway with throttling and rate limiting
- Lambda functions with minimal IAM permissions
- DynamoDB access restricted to Lambda execution role
- CORS configuration for cross-origin requests

## Deployment Architecture

### Infrastructure as Code
- **Tool**: AWS CDK (TypeScript)
- **Stacks**:
  - Database Stack (DynamoDB table)
  - API Stack (Lambda functions, API Gateway)
  - Permissions Stack (IAM roles and policies)

### Sample Data Initialization
- Lambda function to populate DynamoDB with sample products
- Triggered during initial deployment
- Sample products covering various categories (Electronics, Clothing, Books, etc.)

## Performance Considerations

- DynamoDB on-demand billing for cost optimization
- Lambda function memory optimization (128-512 MB)
- API Gateway caching for frequently accessed endpoints
- QR code generation with optimized image size

## Error Handling Strategy

- Standardized error response format
- Proper HTTP status codes
- Detailed error logging with CloudWatch
- Graceful degradation for service failures

## Monitoring and Logging

- CloudWatch Logs for Lambda function execution
- API Gateway access logs
- DynamoDB metrics monitoring
- Custom metrics for API response times
