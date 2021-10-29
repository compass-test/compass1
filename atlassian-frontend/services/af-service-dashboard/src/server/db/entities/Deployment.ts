import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';

import WithUUID from './WithUUID';
import Service from './Service';

@Entity()
export default class Deployment extends WithUUID {
  @ManyToOne(() => Service)
  @JoinColumn()
  service!: Service;

  @Column()
  pipelineUuid!: string;

  @Column()
  env!: string;

  @Column()
  commit!: string;

  @Column()
  branch!: string;

  @Column()
  packageVersion!: string;

  @Column()
  isRollback!: boolean;

  static getById(id?: string) {
    return this.findOne({
      where: {
        id,
      },
      relations: ['service'],
    });
  }

  static async getAllEnvsByService(serviceId: string): Promise<string[]> {
    const result = await this.createQueryBuilder('deployment')
      .innerJoin('deployment.service', 'service')
      .select('env')
      .distinct(true)
      .where('service.id = :serviceId', { serviceId })
      .getRawMany();
    return result.map(row => row.env);
  }
}
