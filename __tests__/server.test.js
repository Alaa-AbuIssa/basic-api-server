'use strict';

const supergoose = require('@code-fellows/supergoose');
const server = require('../src/server');
const request = supergoose(server.app);

describe('API Server Test', () => {
  let id;

  it('Handles bad route', async () => {
    const response = await request.get('/else');
    expect(response.status).toEqual(404);
  });

  it('Handles bad method', async () => {
    const response = await request.delete('/api/v1/food/');
    expect(response.status).toEqual(500);
  });

  it('create data', async () => {
    let obj = { name: 'test', description: 'test' };
    const response = await request.post('/api/v1/food').send(obj);
    id = response.body._id;

    expect(response.body.name).toBe(obj.name);
    expect(response.body.description).toBe(obj.description);
    expect(response.status).toEqual(200);
  });

  it('read data', async () => {
    const response = await request.get('/api/v1/food');

    expect(response.body.storedData[0].name).toBe('test');
    expect(response.body.storedData[0].description).toBe('test');
    expect(response.body.storedData.length).toBe(1);
    expect(response.status).toEqual(200);
  });

  it('update a record', async () => {
    let newObj = {
      name: 'mansaf',
      description: 'jordan traditional food',
    };
    const response = await request.put('/api/v1/food/' + id).send(newObj);
    expect(response.body.name).toBe('mansaf');
    expect(response.body.description).toBe('jordan traditional food');
    expect(response.status).toEqual(200);
  });

  it('delete a record', async () => {
    const response = await request.delete('/api/v1/food/' + id);
    expect(response.body.name).toBe('mansaf');
    expect(response.body.description).toBe('jordan traditional food');
    expect(response.status).toEqual(200);
  });
});