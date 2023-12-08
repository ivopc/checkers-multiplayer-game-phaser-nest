import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../../src/infrastructure/database/database.service';
import { IHashCryptography } from '@/domain/contracts/cryptography/i-hash.cryptography';

@Injectable()
export class UserFactory {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly hashCryptography: IHashCryptography,
  ) {}

  async makeUser(overrideData: Partial<Prisma.UserUncheckedCreateInput> = {}) {
    const user = await this.databaseService.databaseInstance.user.create({
      data: {
        name: faker.person.fullName(),
        dateBirth: faker.date.past(),
        login: faker.internet.userName(),
        email: faker.internet.email(),
        password: this.hashCryptography.create(faker.internet.password()),
        ruleId: 1,
        inviteCode: overrideData.inviteCode || faker.string.alphanumeric(6),
        ...overrideData,
      },
    });

    return user;
  }
}
