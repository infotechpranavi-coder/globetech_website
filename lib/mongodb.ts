import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB; // Optional: specify db name

if (!uri) {
  throw new Error('Please add your MONGODB_URI to .env or environment variables');
}

const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect().catch(err => {
      console.error('Failed to connect to MongoDB in development:', err);
      throw err;
    });
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect().catch(err => {
    console.error('Failed to connect to MongoDB in production:', err);
    throw err;
  });
}

export default clientPromise;

export async function getDatabase(): Promise<Db> {
  try {
    const connectedClient = await clientPromise;
    // Connect to the specific database if provided, otherwise default to the one in URI or 'test'
    const db = connectedClient.db(dbName);

    // Test connection with a ping
    await db.command({ ping: 1 });

    return db;
  } catch (error: any) {
    console.error('MongoDB getDatabase error:', error.message);
    throw new Error(`Database connection failed: ${error.message}`);
  }
}

