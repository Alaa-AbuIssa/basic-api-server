
'use strict';

const supertest = require('supertest');
const server = require('../src/server');
const request = supertest(server.app);


describe('Test Server Routes', () => {
  it('Bad route', async () => {
    const response = await request.get('/alaa');
    expect(response.status).toEqual(404);
  });
  it('Handles bad method', async () => {
    const response = await request.put('/person?name=alaa');
    expect(response.status).toEqual(404);
  });

  it('create record', async () => {
    const response = await request.delete('/person?name=alaa');
    expect(response.status).toEqual(404);
  });

  let id;
  it('Post method', async () => {
    const Obj = {
      name: 'Pizza',
      description: 'Pizza Hut',
    };
    const response = await request.post('/api/v1/food').send(Obj);
    // id = response.body.id;
    expect(response.status).toEqual(200);
    expect(response.body.data.name).toBe(Obj.name);
    expect(response.body.data.description).toBe(Obj.description);
  });

  

});