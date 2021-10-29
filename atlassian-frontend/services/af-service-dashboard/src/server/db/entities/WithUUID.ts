import { BaseEntity, PrimaryColumn, BeforeInsert } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export default abstract class WithUUID extends BaseEntity {
  @PrimaryColumn()
  id!: string;

  @BeforeInsert()
  generateId() {
    this.id = uuidv4();
  }
}
