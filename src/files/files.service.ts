import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';

@Injectable()
export class FilesService {
  create(createFileDto: CreateFileDto) {
    return 'Это действие добавляет новый файл';
  }

  findAll() {
    return `Это действие возвращает все файлы`;
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
