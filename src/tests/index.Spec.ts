import supertest from 'supertest';
import { app } from '../index';

const request = supertest(app);

describe('Test Server Status', () => {
  it('should return 200 OK', async () => {
    const res = await request.get('/');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      API: 'Image Processing API',
      Author: 'Hassan Ali',
      Version: '1.0.0',
      Description: 'EGFWD - Project 1 Image Processing API',
      'Created At': '2022-08-15',
      Contact: '7assan.3li1998@gmail.com',
    });
  });
});
