import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../../../src/app.module';
import { DatabaseModule } from '../../../src/infrastructure/database/database.module';
import { UserFactory } from '../../factories/user.factory';
import { CryptographyModule } from '@/infrastructure/cryptography/cryptography.module';

describe('[PUT] /users/password', () => {
  let app: INestApplication;
  let userFactory: UserFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule, CryptographyModule],
      providers: [UserFactory],
    }).compile();

    app = module.createNestApplication();
    userFactory = module.get(UserFactory);

    await app.init();
  });

  it('It must be possible to update user', async () => {
    const user = await userFactory.makeUser();

    const response = await request(app.getHttpServer()).put('/users').send({
      id: user.id,
      name: 'Test Name Update',
      dateBirth: '2023-09-30',
      login: 'TestLoginUpdate',
      email: 'test-update@email.com',
    });

    expect(response.status).toEqual(201);
  });
});
