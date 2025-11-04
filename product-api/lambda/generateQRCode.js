const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, GetCommand } = require('@aws-sdk/lib-dynamodb');
const QRCode = require('qrcode');

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
    try {
        const productId = event.pathParameters?.id;
        
        if (!productId) {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({
                    error: 'Bad Request',
                    message: 'Product ID is required',
                }),
            };
        }

        // Check if product exists
        const command = new GetCommand({
            TableName: process.env.TABLE_NAME,
            Key: {
                productId: productId,
            },
        });

        const result = await docClient.send(command);

        if (!result.Item) {
            return {
                statusCode: 404,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({
                    error: 'Not Found',
                    message: 'Product not found',
                }),
            };
        }

        // Generate QR code for product URL
        const productUrl = `${process.env.API_BASE_URL}/api/products/${productId}`;
        const qrCodeBuffer = await QRCode.toBuffer(productUrl, {
            type: 'png',
            width: 256,
            margin: 2,
        });

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'image/png',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Amz-Date, Authorization, X-Api-Key',
            },
            body: qrCodeBuffer.toString('base64'),
            isBase64Encoded: true,
        };
    } catch (error) {
        console.error('Error generating QR code:', error);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                error: 'Internal server error',
                message: 'Failed to generate QR code',
            }),
        };
    }
};
