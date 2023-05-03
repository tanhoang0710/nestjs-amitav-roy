import { User } from '../../modules/user/user.entity';
import { Connection, getManager } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export class UserCreateSeed implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    await getManager().query('truncate users');

    await factory(User)().create({
      name: 'tanhun',
      email: 'tanhoang0710@gmai.com',
      password: 'Password@123',
    });

    await factory(User)().createMany(20);
  }
}
