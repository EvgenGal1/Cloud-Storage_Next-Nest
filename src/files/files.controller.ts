import {
  Get,
  // Body,
  // Patch,
  // Param,
  // Delete,
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
} from '@nestjs/common';
// import { CreateFileDto } from './dto/create-file.dto';
// import { UpdateFileDto } from './dto/update-file.dto';
import { FilesService } from './files.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileStorage } from './storage';

@Controller('files')
//  групп.мтд.cntrl files
@ApiTags('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  // мтд.для получ.всех ф.списком.масс. Обращ.к files, возвращ.масс.всех ф. При получ.запроса обращ.к serv берём мтд.findAll который обращ.к БД, резулт.данн.fn вернёт в ответ на данн.запрос
  @Get()
  findAll() {
    return this.filesService.findAll();
  }

  @Post()
  // перехват.для раб.с ф
  @UseInterceptors(FileInterceptor('file', { storage: fileStorage }))
  // тип запроса
  @ApiConsumes('multipart/form-data')
  // настр.схемы swagge
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })

  // create(@Body() createFileDto: CreateFileDto) { return this.filesService.create(createFileDto); } // до UploadedFile
  // вытяг.ф.из запроса
  create(
    @UploadedFile(
      // валид.разм.в bite. Здесь макс.3 Mb
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 3 })],
      }),
    )
    file: Express.Multer.File,
  ) {
    return file;
  }

  // удал.после декоратора UseInterceptors
  // @Get()
  // findAll() {
  //   return this.filesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.filesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
  //   return this.filesService.update(+id, updateFileDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.filesService.remove(+id);
  // }
}
