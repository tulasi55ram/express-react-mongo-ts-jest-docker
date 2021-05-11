import { MockMongoose } from 'mock-mongoose';
import mongoose, { ConnectionOptions } from 'mongoose';
const mongoURI: string = `mongodb://test:test@test:27071/temp`;

const options: ConnectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

/**
 * MockMongoose provides test database by spinning up mongod on the back when mongoose.connect call is made.
 *   By default it is using in memory store which does not have persistence.
 */
const mockMongoose = new MockMongoose(mongoose);

export const connect = async () => {
    try{
        await mockMongoose.prepareStorage()
        await mongoose.connect(mongoURI, options);
        mongoose.connection.on('connected', async () => {  
            console.log('db connection is now open');
        });
    }catch(e){
        throw(e);
    }
}

/**
 * Close db connection
 */
export const closeConnection = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
}

/**
 * Delete db collections
 */
export const clearDatabase = async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
}
