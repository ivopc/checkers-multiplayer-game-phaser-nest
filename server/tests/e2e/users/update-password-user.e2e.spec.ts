import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../../../src/app.module';
import { DatabaseModule } from '../../../src/infrastructure/database/database.module';
import { UserFactory } from '../../factories/user.factory';
import { IHashCryptography } from '@/domain/contracts/cryptography/i-hash.cryptography';
import { CryptographyModule } from '@/infrastructure/cryptography/cryptography.module';

describe('[PATCH] /users/password', () => {
  let app: INestApplication;
  let userFactory: UserFactory;
  let hasher: IHashCryptography;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule, CryptographyModule],
      providers: [UserFactory],
    }).compile();

    app = module.createNestApplication();
    userFactory = module.get(UserFactory);
    hasher = module.get(IHashCryptography);

    await app.init();
  });

  it('It must be possible to update password user', async () => {
    const user = await userFactory.makeUser({
      password: hasher.create('TestPassword11'),
    });

    const response = await request(app.getHttpServer())
      .patch('/users/password')
      .send({
        id: user.id,
        passwordOld: 'TestPassword11',
        passwordNew: 'TestPassword22',
      });

    expect(response.status).toEqual(201);
  });
});
