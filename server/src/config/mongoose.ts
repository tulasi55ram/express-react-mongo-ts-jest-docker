import { ConnectionOptions, connect } from 'mongoose';

type TEnv = string | undefined;

const connectDB = async () => {
  try {
    const MONGO_USERNAME: TEnv = process.env.MONGO_USERNAME;
    const MONGO_PASSWORD: TEnv = encodeURIComponent(process.env.MONGO_PASSWORD);
    const MONGO_HOSTNAME: TEnv = process.env.MONGO_HOSTNAME;
    const MONGO_PORT: TEnv = process.env.MONGO_PORT;
    const MONGO_DB: TEnv = process.env.MONGO_DB;
    const mongoURI: string = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`;
    const options: ConnectionOptions = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    };
    await connect(mongoURI, options);
    console.log('MongoDB Connected!');
  } catch (err) {
    console.error(`Exception in mongoose config ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
