import { Entity, Column } from 'typeorm';

import WithUUID from './WithUUID';
@Entity()
export default class Service extends WithUUID {
  @Column()
  name!: string;

  @Column()
  package!: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  team!: string;

  static getAll() {
    return this.find({
      order: {
        name: 'ASC',
      },
    });
  }

  static getByName(name: string) {
    return this.findOne({
      where: {
        name,
      },
    });
  }
}
