# Product API - Complete AWS CDK Project

A comprehensive Product API built with AWS CDK, featuring Lambda functions, DynamoDB, API Gateway, and QR code generation capabilities.

## Project Overview

This project implements a serverless Product API using AWS services, providing endpoints for product management and QR code generation. The architecture follows AWS best practices for scalability, security, and cost optimization.

## Architecture

The system consists of:
- **API Gateway**: RESTful API endpoints
- **Lambda Functions**: Serverless compute for business logic
- **DynamoDB**: NoSQL database for product storage
- **CloudFormation**: Infrastructure as Code deployment

## Project Structure

```
├── product-api/          # CDK application and Lambda functions
├── specs/               # Project specifications and requirements
├── generated-diagrams/  # Architecture and deployment diagrams
├── pricing/            # Cost analysis and optimization
├── qr-code/            # QR code assets
├── jira-stories.md     # User stories and requirements
└── README.md           # This file
```

## Features

- **Product Management**: CRUD operations for products
- **QR Code Generation**: Dynamic QR code creation for products
- **Sample Data Population**: Automated test data setup
- **Cost Optimized**: Designed for minimal AWS costs
- **Scalable Architecture**: Auto-scaling serverless components

## API Endpoints

- `GET /products` - List all products
- `GET /products/{id}` - Get product by ID
- `POST /qr-code` - Generate QR code for product
- `POST /populate-sample-data` - Populate test data

## Quick Start

1. **Prerequisites**
   - AWS CLI configured
   - Node.js 18+ installed
   - AWS CDK CLI installed

2. **Deploy the Stack**
   ```bash
   cd product-api
   npm install
   cdk deploy
   ```

3. **Test the API**
   - Use the API Gateway URL from deployment output
   - Populate sample data: `POST /populate-sample-data`
   - List products: `GET /products`

## Documentation

- [Requirements](specs/requirements.md) - Detailed project requirements
- [Design](specs/design.md) - System design and architecture
- [Tasks](specs/tasks.md) - Development tasks and milestones
- [Architecture Diagrams](generated-diagrams/README.md) - Visual system overview
- [Cost Analysis](pricing/product-api-cost-analysis.md) - Pricing breakdown

## Cost Estimation

Monthly estimated cost: **$0.50 - $2.00** for development/testing workloads.
See [detailed cost analysis](pricing/product-api-cost-analysis.md) for breakdown.

## Development

The project uses TypeScript and follows AWS CDK best practices:
- Infrastructure as Code with CDK
- Serverless-first architecture
- Environment-specific configurations
- Comprehensive testing setup

## Deployment

The CDK stack creates all necessary AWS resources:
- DynamoDB table with on-demand billing
- Lambda functions with appropriate IAM roles
- API Gateway with CORS enabled
- CloudWatch logs for monitoring

## Testing

```bash
cd product-api
npm test
```

## Contributing

1. Review the [specifications](specs/) for requirements
2. Check [Jira stories](jira-stories.md) for current tasks
3. Follow the established architecture patterns
4. Update documentation as needed

## License

This project is created for demonstration purposes.
