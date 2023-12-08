import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../../../src/app.module';
import { DatabaseModule } from '../../../src/infrastructure/database/database.module';
import { UserFactory } from '../../factories/user.factory';
import { CryptographyModule } from '@/infrastructure/cryptography/cryptography.module';

describe('[GET] /users/:id', () => {
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

  it('It must be possible to find by id user', async () => {
    const user = await userFactory.makeUser();

    const response = await request(app.getHttpServer())
      .get(`/users/${user.id}`)
      .send();

    expect(response.status).toEqual(200);
  });
});
