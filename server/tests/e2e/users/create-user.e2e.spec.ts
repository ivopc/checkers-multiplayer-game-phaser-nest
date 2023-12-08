import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../../../src/app.module';

describe('[POST] /users', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();

    await app.init();
  });

  it('It must be possible to create user', async () => {
    const data = {
      name: 'Test Name',
      dateBirth: '2023-09-24',
      login: 'Test Login',
      email: 'test@email.com',
      password: 'TestPassword11',
    };

    const response = await request(app.getHttpServer())
      .post('/users')
      .send(data);

    expect(response.status).toEqual(201);
  });
});
