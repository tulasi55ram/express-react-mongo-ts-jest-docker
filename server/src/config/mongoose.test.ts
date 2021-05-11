import mongoose, { ConnectionOptions } from "mongoose";
import connectDB from "./mongoose";
// import { mocked } from "ts-jest/utils";

jest.mock("mongoose");
jest.mock("dotenv");

const options: ConnectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};
process.env.MONGO_USERNAME = "test";
process.env.MONGO_PASSWORD = "testpwd";
process.env.MONGO_HOSTNAME = "localhost";
process.env.MONGO_PORT = "27071";
process.env.MONGO_DB = "test";
const mongoURI: string = `mongodb://test:testpwd@localhost:27071/test`;

describe("Test MongoDB connection using mongoose", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("Should connect to MongoDB", async () => {
    const consoleLogSpyOn = jest.spyOn(console, "log");
    const mongooseConnectSpyOn = jest
      .spyOn(mongoose, "connect")
      .mockImplementationOnce(() => Promise.resolve(mongoose));
    await connectDB();
    expect(mongooseConnectSpyOn).toBeCalledWith(mongoURI, options);
    expect(consoleLogSpyOn).toBeCalledWith("MongoDB Connected!");
  });
  it.skip("Should throw error if unable to connect to MongoDB", async () => {
    const consoleLogSpyOn = jest.spyOn(console, "error");
    const mongooseConnectSpyOn = jest
      .spyOn(mongoose, "connect")
      .mockImplementationOnce(() => Promise.reject(new Error("Authentication Error")));
    await connectDB();
    expect(mongooseConnectSpyOn).toBeCalledWith(mongoURI, options);
    expect(consoleLogSpyOn).toBeCalledWith("Exception in mongoose config Authentication Error");
    // expect(mocked(connectDB)).rejects.toThrowError(new Error('Authentication Error'));
  });
});
