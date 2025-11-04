const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand, ScanCommand } = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const sampleProducts = [
    {
        productId: 'prod-001',
        name: 'Wireless Headphones',
        category: 'Electronics',
        brand: 'TechBrand',
        description: 'High-quality wireless headphones with noise cancellation',
        price: 99.99,
        customAttributes: {
            color: 'Black',
            batteryLife: '30 hours',
            connectivity: 'Bluetooth 5.0',
            weight: '250g'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        productId: 'prod-002',
        name: 'Smart Watch',
        category: 'Electronics',
        brand: 'WearTech',
        description: 'Advanced smartwatch with health monitoring features',
        price: 299.99,
        customAttributes: {
            color: 'Silver',
            displaySize: '1.4 inches',
            batteryLife: '7 days',
            waterResistance: 'IP68'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        productId: 'prod-003',
        name: 'Running Shoes',
        category: 'Footwear',
        brand: 'SportFit',
        description: 'Lightweight running shoes with advanced cushioning',
        price: 129.99,
        customAttributes: {
            color: 'Blue/White',
            size: 'US 10',
            material: 'Mesh/Synthetic',
            weight: '280g'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        productId: 'prod-004',
        name: 'Coffee Maker',
        category: 'Appliances',
        brand: 'BrewMaster',
        description: 'Programmable coffee maker with thermal carafe',
        price: 89.99,
        customAttributes: {
            color: 'Stainless Steel',
            capacity: '12 cups',
            features: 'Programmable, Auto-shutoff',
            dimensions: '14" x 8" x 12"'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        productId: 'prod-005',
        name: 'Laptop Backpack',
        category: 'Accessories',
        brand: 'CarryAll',
        description: 'Durable laptop backpack with multiple compartments',
        price: 49.99,
        customAttributes: {
            color: 'Black',
            laptopSize: 'Up to 15.6"',
            material: 'Nylon',
            pockets: '6 compartments'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];

exports.handler = async (event) => {
    try {
        // Check if table already has data
        const scanCommand = new ScanCommand({
            TableName: process.env.TABLE_NAME,
            Select: 'COUNT'
        });

        const scanResult = await docClient.send(scanCommand);
        
        if (scanResult.Count > 0) {
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'Sample data already exists',
                    existingCount: scanResult.Count
                })
            };
        }

        // Insert sample products
        const insertPromises = sampleProducts.map(product => {
            const putCommand = new PutCommand({
                TableName: process.env.TABLE_NAME,
                Item: product
            });
            return docClient.send(putCommand);
        });

        await Promise.all(insertPromises);

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Sample data populated successfully',
                insertedCount: sampleProducts.length,
                products: sampleProducts.map(p => ({ id: p.productId, name: p.name }))
            })
        };
    } catch (error) {
        console.error('Error populating sample data:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Internal server error',
                message: 'Failed to populate sample data'
            })
        };
    }
};
