# Product API Architecture Diagrams

This directory contains AWS architecture diagrams generated for the Product API project based on the technical design specifications.

## Generated Diagrams

### 1. Product API Architecture (`product-api-architecture.png`)
- **Purpose**: High-level system architecture overview
- **Components**: 
  - Client/User interface
  - API Gateway for REST endpoints
  - Lambda functions (getProducts, getProductById, generateQRCode)
  - DynamoDB Products table
- **Flow**: Shows basic request flow from client through API Gateway to Lambda functions and database

### 2. Product API Deployment Architecture (`product-api-deployment.png`)
- **Purpose**: Detailed deployment view with infrastructure components
- **Components**:
  - API Gateway with rate limiting
  - Lambda functions with Node.js 18.x runtime
  - IAM execution roles and permissions
  - DynamoDB with on-demand billing
  - AWS CDK for Infrastructure as Code
  - CloudWatch for monitoring and logging
- **Flow**: Shows deployment relationships and monitoring setup

### 3. Product API Data Flow (`product-api-dataflow.png`)
- **Purpose**: Detailed data flow and API endpoint mapping
- **Components**:
  - Specific API endpoints (GET /api/products, GET /api/products/{id}, GET /api/products/{id}/qrcode)
  - DynamoDB operations (Scan, GetItem)
  - QR code image generation
  - Request/response flows
- **Flow**: Shows detailed data flow with request types and response formats

## Architecture Highlights

### Serverless Design
- **API Gateway**: Handles HTTP requests, rate limiting, and CORS
- **Lambda Functions**: Serverless compute for business logic
- **DynamoDB**: NoSQL database with on-demand scaling

### Security & Permissions
- **IAM Roles**: Least privilege access for Lambda functions
- **API Gateway**: Built-in throttling and security features

### Monitoring & Observability
- **CloudWatch Logs**: Centralized logging for all components
- **CloudWatch Metrics**: Performance monitoring and alerting

### Infrastructure as Code
- **AWS CDK**: TypeScript-based infrastructure definitions
- **Automated Deployment**: Consistent and repeatable deployments

## API Endpoints

1. **GET /api/products** - Retrieve all products
2. **GET /api/products/{id}** - Retrieve specific product by ID
3. **GET /api/products/{id}/qrcode** - Generate QR code for product URL

## Data Model

Products are stored in DynamoDB with the following schema:
- `productId` (Primary Key)
- `name`, `category`, `brand`, `description`, `price`
- `customAttributes` (flexible JSON object)
- `createdAt`, `updatedAt` timestamps

## QR Code Generation

- Uses `qrcode` npm package
- Generates PNG images
- Encodes product detail URLs for easy sharing
