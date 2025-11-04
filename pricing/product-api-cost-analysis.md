# Product API Cost Analysis Estimate Report

## Service Overview

Product API is a fully managed, serverless service that allows you to This project uses multiple AWS services.. This service follows a pay-as-you-go pricing model, making it cost-effective for various workloads.

## Pricing Model

This cost analysis estimate is based on the following pricing model:
- **ON DEMAND** pricing (pay-as-you-go) unless otherwise specified
- Standard service configurations without reserved capacity or savings plans
- No caching or optimization techniques applied

## Assumptions

- Standard ON DEMAND pricing model for all services
- Lambda functions configured with 256MB memory allocation
- Average Lambda execution time of 200ms per request
- DynamoDB on-demand billing mode for cost optimization
- API Gateway REST API (not HTTP API) for full feature set
- No caching enabled initially
- Standard data transfer within same region
- No reserved capacity or savings plans applied

## Limitations and Exclusions

- Data transfer costs between regions
- CloudWatch Logs storage beyond free tier
- Development and testing costs
- CDK deployment costs
- Custom domain and SSL certificate costs
- Backup and disaster recovery costs
- Monitoring and alerting setup costs

## Cost Breakdown

### Unit Pricing Details

| Service | Resource Type | Unit | Price | Free Tier |
|---------|--------------|------|-------|------------|
| AWS Lambda | Requests | request | $0.0000002 | 1M requests and 400,000 GB-seconds per month free for first 12 months |
| AWS Lambda | Compute | GB-second | $0.0000166667 | 1M requests and 400,000 GB-seconds per month free for first 12 months |
| Amazon API Gateway | Requests | request (first 333M requests) | $0.0000035 | No free tier for API Gateway |
| Amazon DynamoDB | Read Requests | read request unit | $0.000000125 | 25 GB storage and 25 RCU/WCU hours free for first 12 months |
| Amazon DynamoDB | Write Requests | write request unit | $0.000000625 | 25 GB storage and 25 RCU/WCU hours free for first 12 months |
| Amazon DynamoDB | Storage | GB-month (after 25GB free) | $0.25 | 25 GB storage and 25 RCU/WCU hours free for first 12 months |
| Amazon CloudWatch | Log Ingestion | GB ingested | $0.50 | 5GB log ingestion, 10 custom metrics, 3 dashboards free |
| Amazon CloudWatch | Log Storage | GB-month | $0.03 | 5GB log ingestion, 10 custom metrics, 3 dashboards free |
| Amazon CloudWatch | Custom Metrics | metric per month | $0.30 | 5GB log ingestion, 10 custom metrics, 3 dashboards free |

### Cost Calculation

| Service | Usage | Calculation | Monthly Cost |
|---------|-------|-------------|-------------|
| AWS Lambda | 3 functions processing API requests with 256MB memory, 200ms avg execution time (Low: 10,000 requests/month, Medium: 100,000 requests/month, High: 1,000,000 requests/month) | Low: $0.002 requests + $0.83 compute = $0.83 | Medium: $0.02 requests + $8.31 compute = $8.33 | High: $0.20 requests + $83.13 compute = $83.33 | $0.83 - $8.33 - $83.33 |
| Amazon API Gateway | REST API handling product and QR code requests (Low: 10,000 requests/month, Medium: 100,000 requests/month, High: 1,000,000 requests/month) | Low: $0.0000035 × 10,000 = $0.035 | Medium: $0.0000035 × 100,000 = $0.35 | High: $0.0000035 × 1,000,000 = $3.50 | $0.035 - $0.35 - $3.50 |
| Amazon DynamoDB | On-demand table storing product data with read/write operations (Low: 8,000 reads, 2,000 writes, 1GB storage/month, Medium: 80,000 reads, 20,000 writes, 5GB storage/month, High: 800,000 reads, 200,000 writes, 10GB storage/month) | Low: $0.001 reads + $0.001 writes + $0.00 storage = $0.01 | Medium: $0.01 reads + $0.0125 writes + $0.00 storage = $0.16 | High: $0.10 reads + $0.125 writes + $1.25 storage = $1.56 | $0.01 - $0.16 - $1.56 |
| Amazon CloudWatch | Basic monitoring and logging for Lambda functions and API Gateway (Low: 1GB logs, basic metrics, Medium: 4GB logs, 5 custom metrics, High: 20GB logs, 20 custom metrics) | Low: $0.50 logs = $0.50 | Medium: $2.00 logs + $0.00 metrics = $2.00 | High: $10.00 logs + $6.00 metrics = $16.00 (estimated $10.00 with optimization) | $0.50 - $2.00 - $10.00 |
| **Total** | **All services** | **Sum of all calculations** | **$1.38/month** |

### Free Tier

Free tier information by service:
- **AWS Lambda**: 1M requests and 400,000 GB-seconds per month free for first 12 months
- **Amazon API Gateway**: No free tier for API Gateway
- **Amazon DynamoDB**: 25 GB storage and 25 RCU/WCU hours free for first 12 months
- **Amazon CloudWatch**: 5GB log ingestion, 10 custom metrics, 3 dashboards free

## Cost Scaling with Usage

The following table illustrates how cost estimates scale with different usage levels:

| Service | Low Usage | Medium Usage | High Usage |
|---------|-----------|--------------|------------|
| AWS Lambda | $0/month | $0/month | $1/month |
| Amazon API Gateway | $0/month | $0/month | $0/month |
| Amazon DynamoDB | $0/month | $0/month | $0/month |
| Amazon CloudWatch | $0/month | $0/month | $1/month |

### Key Cost Factors

- **AWS Lambda**: 3 functions processing API requests with 256MB memory, 200ms avg execution time
- **Amazon API Gateway**: REST API handling product and QR code requests
- **Amazon DynamoDB**: On-demand table storing product data with read/write operations
- **Amazon CloudWatch**: Basic monitoring and logging for Lambda functions and API Gateway

## Projected Costs Over Time

The following projections show estimated monthly costs over a 12-month period based on different growth patterns:

Base monthly cost calculation:

| Service | Monthly Cost |
|---------|-------------|
| AWS Lambda | $0.83 |
| Amazon API Gateway | $0.04 |
| Amazon DynamoDB | $0.01 |
| Amazon CloudWatch | $0.50 |
| **Total Monthly Cost** | **$1** |

| Growth Pattern | Month 1 | Month 3 | Month 6 | Month 12 |
|---------------|---------|---------|---------|----------|
| Steady | $1/mo | $1/mo | $1/mo | $1/mo |
| Moderate | $1/mo | $1/mo | $1/mo | $2/mo |
| Rapid | $1/mo | $1/mo | $2/mo | $3/mo |

* Steady: No monthly growth (1.0x)
* Moderate: 5% monthly growth (1.05x)
* Rapid: 10% monthly growth (1.1x)

## Detailed Cost Analysis

### Pricing Model

ON DEMAND


### Exclusions

- Data transfer costs between regions
- CloudWatch Logs storage beyond free tier
- Development and testing costs
- CDK deployment costs
- Custom domain and SSL certificate costs
- Backup and disaster recovery costs
- Monitoring and alerting setup costs

### Recommendations

#### Immediate Actions

- Start with DynamoDB on-demand billing to optimize costs for variable workloads
- Configure Lambda functions with appropriate memory allocation (256MB recommended)
- Implement API Gateway caching for frequently accessed product data
- Use CloudWatch Logs retention policies to control storage costs
#### Best Practices

- Monitor Lambda cold starts and optimize function initialization
- Consider API Gateway HTTP API for lower costs if advanced features not needed
- Implement DynamoDB auto-scaling if switching to provisioned capacity
- Use AWS X-Ray for distributed tracing to optimize performance
- Set up CloudWatch alarms for cost monitoring and anomaly detection



## Cost Optimization Recommendations

### Immediate Actions

- Start with DynamoDB on-demand billing to optimize costs for variable workloads
- Configure Lambda functions with appropriate memory allocation (256MB recommended)
- Implement API Gateway caching for frequently accessed product data

### Best Practices

- Monitor Lambda cold starts and optimize function initialization
- Consider API Gateway HTTP API for lower costs if advanced features not needed
- Implement DynamoDB auto-scaling if switching to provisioned capacity

## Conclusion

By following the recommendations in this report, you can optimize your Product API costs while maintaining performance and reliability. Regular monitoring and adjustment of your usage patterns will help ensure cost efficiency as your workload evolves.
