import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilesService {
  // ч/з внедрение зависимостей, добав.доп.repository FileEntity. Указав так repositorий, получ.возм.внутри этого кл.FilesService раб.с табл.files
  constructor(
    @InjectRepository(FileEntity)
    private repository: Repository<FileEntity>,
  ) {}

  create(createFileDto: CreateFileDto) {
    return 'Это действие добавляет новый файл';
  }

  findAll() {
    // return `Это действие возвращает все файлы`;
    // после @InjectRepository(FileEntity) в любом мтд.FilesService, можем обращ.к this.repository для получ.доступ. ко всем мтд.БД табл.files
    return this.repository.find();
  }

  findOne(id: number) {
    return `Это действие возвращает файл с ID_#${id} `;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `Это действие обновляет файл с ID_#${id} `;
  }

  remove(id: number) {
    return `Это действие удаляет файл с ID_#${id} `;
  }
}
