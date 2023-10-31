import {
  Get,
  // Body,
  // Patch,
  // Param,
  Delete,
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  UseGuards,
  Query,
} from '@nestjs/common';
// import { CreateFileDto } from './dto/create-file.dto';
// import { UpdateFileDto } from './dto/update-file.dto';
import { FilesService } from './files.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileStorage } from './storage';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { UserId } from 'src/decorators/user-id.decorator';
import { FileType } from './entities/file.entity';

@Controller('files')
//  групп.мтд.cntrl files
@ApiTags('files')
// оборач. f.cntrl в @UseGuard(JwtAuthGuard) для защищ.от Авториз. Откл.req е/и JWT Токен отсутств./просроч.
@UseGuards(JwtAuthGuard)
// оборач. чтоб swagger знал что req на files защищены jwt Токеном
@ApiBearerAuth()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  // мтд.для получ.всех ф.списком.масс. Обращ.к files, возвращ.масс.всех ф. При получ.запроса обращ.к serv берём мтд.findAll который обращ.к БД, резулт.данн.fn вернёт в ответ на данн.запрос
  @Get()
  // возвращ.ф.опред.user и с опред.типом(декор.Query)
  findAll(@UserId() userId: number, @Query('type') fileType: FileType) {
    return this.filesService.findAll(userId, fileType);
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

  // мтд.создания ф.
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
    @UserId() userId: number,
  ) {
    // return file;
    // использ.мтд.из serv. Пердача file ч/з Multer и userId ч/з UserId
    return this.filesService.create(file, userId);
  }

  // мтд.удал.ф
  @Delete()
  remove(@UserId() userId: number, @Query('ids') ids: string) {
    // передача ф.id ч/з запят.> удал. file?ids=1,2,4,
    return this.filesService.remove(userId, ids);
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
