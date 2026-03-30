const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config({ path: 'd:/globetech/.env' });

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

function generateSlug(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')     // Replace spaces with -
        .replace(/[^\w-]+/g, '')     // Remove all non-word chars
        .replace(/--+/g, '-')       // Replace multiple - with single -
        .replace(/^-+/, '')         // Trim - from start of text
        .replace(/-+$/, '');        // Trim - from end of text
}

async function migrate() {
    if (!uri) throw new Error("MONGODB_URI not found");
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        const db = client.db(dbName);
        const products = await db.collection('products').find({}).toArray();
        
        console.log(`Found ${products.length} products to migrate.`);
        
        for (const product of products) {
            if (!product.slug) {
                let slug = generateSlug(product.title);
                const existing = await db.collection('products').findOne({ slug, _id: { $ne: product._id } });
                if (existing) {
                    slug = `${slug}-${product._id.toString().slice(-4)}`;
                }
                
                await db.collection('products').updateOne(
                    { _id: product._id },
                    { $set: { slug } }
                );
                console.log(`Migrated product: ${product.title} -> ${slug}`);
            } else {
                console.log(`Product already has slug: ${product.title} -> ${product.slug}`);
            }
        }
        
    } finally {
        await client.close();
    }
}

migrate().catch(console.error);
