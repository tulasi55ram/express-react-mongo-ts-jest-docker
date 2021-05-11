import supertest from 'supertest';
import app from '../../../app';
import User from '../../../models/mongoose/user';
import { IUser, IUserDoc } from '../../../models/mongoose/user/types';
import { connect, clearDatabase, closeConnection } from '../../../config/test/mockmongoose';
import StatusCodes from 'http-status-codes';
import { mocked } from 'ts-jest/utils';

jest.mock('../../../config/mongoose');


const registerUser: IUser = {
    "email": "temp@test.com",
    "password": "passw00rd",
    "first_name": "testFirst",
    "last_name": "testLast",
    "role": "user"
};

beforeAll(async () => {
    await connect();
});
afterAll(async () => {
    await closeConnection();
});
describe("Register User ", () => {
    beforeEach(async ()=>{
        jest.clearAllMocks();
        await clearDatabase()
    });
    it("Should send 'User Already Exists' if user already exists", async () => {
        const user = { ...registerUser } as IUserDoc;
        await new User(user).save();
        const response = await supertest(app)
                .post('/register')
                .send(registerUser)
                .expect(StatusCodes.BAD_REQUEST)
        const { body: { message } } = response;
        expect(message).toEqual("User Already Exists");
    });
    it("Should register new User", async () => {
        const response = await supertest(app)
                .post('/register')
                .send(registerUser)
                .expect(StatusCodes.OK);
        const { body: { email } } = response;
        expect(email).toEqual(registerUser.email);
    });
});