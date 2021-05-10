import supertest from 'supertest';
import app from '../../app';

describe("CheckStatus", () => {
    it("Should respond with status 200", async ()=>{
        const response = await supertest(app).get('/status');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Ok');
    });
});