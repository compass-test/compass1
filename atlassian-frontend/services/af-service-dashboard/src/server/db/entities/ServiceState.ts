import { Entity, Column, CreateDateColumn, ManyToOne } from 'typeorm';

import WithUUID from './WithUUID';
import Service from './Service';
import Deployment from './Deployment';

@Entity()
export default class ServiceState extends WithUUID {
  @ManyToOne(() => Service)
  service!: Service;

  @ManyToOne(() => Deployment)
  deployment!: Deployment;

  @Column()
  isLocked!: boolean;

  @CreateDateColumn()
  createdDate!: Date;

  static getByServiceName(name: string) {
    return this.createQueryBuilder('service_state')
      .innerJoinAndSelect(
        'service_state.service',
        'service',
        'service.name = :name',
        { name },
      )
      .orderBy('service_state.createdDate', 'DESC')
      .getOne();
  }
}
