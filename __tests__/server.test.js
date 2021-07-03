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
    const response = await request.delete('/person?name=alaa');
    expect(response.status).toEqual(404);
  });

  it('create record', async () => {
    const response = await request.post('/person?name=alaa');
    expect(response.status).toEqual(404);
  });

  let id;
  it('Post method', async () => {
    const Obj = {
      name: 'mansaf',
      description: 'traditional food',
    };
    const response = await request.post('/api/v1/food').send(Obj);
    id = response.body.id;
    expect(response.status).toEqual(200);
    expect(response.body.data.name).toBe(Obj.name);
    expect(response.body.data.description).toBe(Obj.description);
  });

  it('reading a list of records', async () => {
    const Obj1 = {
      name: 'mansaf',
      description: 'traditional food',
    };

    const Obj2 = {
      name: 'maglobeh',
      description: 'traditional food',
    };

    await request.post('/api/v1/food').send(Obj1);
    await request.post('/api/v1/food').send(Obj2);

    const response = await request.get('/api/v1/food');
    expect(response.status).toEqual(200);
    expect(response.body.length).toBe(3);
  });

  it('reading a record', async () => {
    const response = await request.get('/api/v1/food/' + id);
    expect(response.status).toEqual(200);
    expect(response.body.data.name).toBe('mansaf');
  });

  it('updating a record', async () => {
    const Obj = {
      name: 'Burger',
      description: 'junk food',
    };

    const response = await request.put('/api/v1/food/' + id).send(Obj);
    expect(response.status).toEqual(200);
    expect(response.body.data.name).toBe('Burger');
  });

  it('deleting a record', async () => {
    const response = await request.delete('/api/v1/food/' + id);
    expect(response.status).toEqual(200);
    expect(response.body).toBe('');
  });

});