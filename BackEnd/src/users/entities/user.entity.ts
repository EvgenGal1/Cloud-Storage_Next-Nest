// ^ сущн.взаимод.с БД (стркт.табл./измен.данн.в табл.User)
// декораторы для раб.с БД
import { FileEntity } from '../../files/entities/file.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

// декоратор для соед.с БД
@Entity('users')
export class UserEntity {
  // декоратор для авто.генер.id
  @PrimaryGeneratedColumn()
  id: number;

  // созд.простых колонок
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  fullName: string;

  // доп.добав.на будущ.
  @Column()
  role: string;

  // доп.добав.на будущ.
  @Column()
  activated: boolean;

  // доп.добав.на будущ.
  @Column()
  link: string;

  // связь табл. 1го ко Мн. 1ый аргум.аноним.fn (табл.обращения - FileEntity), 2ый парам.получ.данн.и обратн.связь
  @OneToMany(() => FileEntity, (file: FileEntity) => file.user)
  // типиз.данн. (возвращ.список FileEntity)
  files: FileEntity[];
}
