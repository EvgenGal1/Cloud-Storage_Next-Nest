import { Injectable } from '@nestjs/common';
// import { CreateFileDto } from './dto/create-file.dto';
// import { UpdateFileDto } from './dto/update-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { Repository } from 'typeorm';
import { FileType } from './entities/file.entity';

@Injectable()
export class FilesService {
  // ч/з внедрение зависимостей, добав.доп.repository FileEntity. Указав так repositorий, получ.возм.внутри этого кл.FilesService раб.с табл.files
  constructor(
    @InjectRepository(FileEntity)
    private repository: Repository<FileEntity>,
  ) {}

  // мтд.получ.всех ф. // возвращ.ф.опред.user и с опред.типом(декор.Query)
  findAll(userId: number, fileType: FileType) {
    // return `Это действие возвращает все файлы`;
    // после @InjectRepository(FileEntity) в любом мтд.FilesService, можем обращ.к this.repository для получ.доступ. ко всем мтд.БД табл.files
    // return this.repository.find();
    // после @UserId(user-id.decorator.ts)
    // генер.спец. SQL req ч/з `Создать строитель запросов`
    const qb = this.repository.createQueryBuilder('file');

    // наход.ф.где id user совпад.с передан.в парам.
    qb.where('file.userId = :userId', { userId });

    // е/и тип ф. === фото
    if (fileType == FileType.PHOTOS) {
      // возвращ.ф.с mimetype = image
      qb.andWhere('file.mimetype LIKE = :type', { type: '%image%' });
    }

    // е/и тип ф. === `мусор`
    if (fileType == FileType.TRASH) {
      // возвращ.ф.с пометкой удалён
      qb.withDeleted().andWhere('file,deletedAt IS NOT NULL');
    }

    // возвращ.ф. по генер.спец.req
    return qb.getMany();
  }

  // мтд.создания ф. (получ.ф., id user)
  create(file: Express.Multer.File, userId: number) {
    // инфо о ф.сохр.в БД для опред.user
    return this.repository.save({
      filename: file.filename,
      originalname: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      user: { id: userId },
    });
  }

  // мтд.удал.
  async remove(userId: number, ids: string) {
    // превращ.ids ф.в масс.
    const idsArray = ids.split(',');

    // генер.спец. SQL req ч/з `Создать строитель запросов`
    const qb = this.repository.createQueryBuilder('files');

    // наход.ф.по ids И userId
    qb.where('id IN (:...ids) AND userId = :userId', {
      ids: idsArray,
      userId,
    });

    // пометка `мягк.удал.`ф.
    return qb.softDelete().execute();
  }

  // create(createFileDto: CreateFileDto) {
  //   return 'Это действие добавляет новый файл';
  // }

  // findOne(id: number) {
  //   return `Это действие возвращает файл с ID_#${id} `;
  // }

  // update(id: number, updateFileDto: UpdateFileDto) {
  //   return `Это действие обновляет файл с ID_#${id} `;
  // }

  // remove(id: number) {
  //   return `Это действие удаляет файл с ID_#${id} `;
  // }
}
