import app from './app';
import request from 'supertest';
jest.mock('./config/mongoose');

const mockApp = {
  use: jest.fn(),
  listen: jest.fn(),
};
jest.doMock('express', () => {
  return () => {
    return mockApp;
  };
});



describe('Server Test', () => {
  it('should test ', () => {
    return request(app).get('/status').expect(200);
  });
});
