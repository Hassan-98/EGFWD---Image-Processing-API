import supertest from 'supertest';
import { app } from '../../index';
import fs from 'fs';

const request = supertest(app);

describe('Test API Route', () => {
  let imageCreateData: Date;

  it('should return 400 for missing filename', async () => {
    const res = await request.get('/api/images');

    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      error: 'Filename is required',
    });
  });

  it('should return 404 for not found file', async () => {
    const res = await request.get('/api/images?filename=notfound.jpg');

    expect(res.status).toBe(404);
    expect(res.body).toEqual({
      error: 'File not found',
    });
  });

  it('should return 400 for invalid width', async () => {
    const res = await request.get(
      '/api/images?filename=fjord.jpg&width=invalid&height=350'
    );

    expect(res.status).toBe(400);
    expect(res.body.error).toEqual('Image width must be a number');
  });

  it('should return 400 for invalid height', async () => {
    const res = await request.get(
      '/api/images?filename=fjord.jpg&width=350&height=invalid'
    );

    expect(res.status).toBe(400);
    expect(res.body.error).toEqual('Image height must be a number');
  });

  it('should return 200 for successfull processing', async () => {
    const res = await request.get('/api/images?filename=fjord.jpg');

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toEqual('image/jpeg');
    expect(fs.existsSync(`assets/thumb/fjord.jpg`)).toEqual(true);

    fs.unlinkSync(`assets/thumb/fjord.jpg`);
  });

  it('should return 200 for successfull resize', async () => {
    const res = await request.get(
      '/api/images?filename=fjord.jpg&width=350&height=350'
    );

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toEqual('image/jpeg');
    expect(fs.existsSync(`assets/thumb/fjord_350x350.jpg`)).toEqual(true);

    imageCreateData = fs.statSync(`assets/thumb/fjord_350x350.jpg`).birthtime;
  });

  it('should return 200 for successfull cache', async () => {
    const res = await request.get(
      '/api/images?filename=fjord.jpg&width=350&height=350'
    );

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toEqual('image/jpeg');
    expect(fs.existsSync(`assets/thumb/fjord_350x350.jpg`)).toEqual(true);
    expect(fs.statSync(`assets/thumb/fjord_350x350.jpg`).birthtime).toEqual(
      imageCreateData
    );

    fs.unlinkSync(`assets/thumb/fjord_350x350.jpg`);
  });
});
