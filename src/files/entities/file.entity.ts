import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// типизация Query парам.ч/з enum. Filter ф.по фото и trash`мусор`
export enum FileType {
  PHOTOS = 'photos',
  TRASH = 'trash',
}

@Entity('files')
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileName: string;

  @Column()
  originalname: string;

  @Column()
  size: number;

  @Column()
  mimetype: string;

  // связь табл. Мн.к 1му. У Мн.данн.(файлов) Одна привязка (Один польз.)
  @ManyToOne(() => UserEntity, (user: UserEntity) => user.files)
  user: UserEntity;

  // декоратор поментки удаления (без удаления)
  @DeleteDateColumn()
  daletedAt?: Date;
}
