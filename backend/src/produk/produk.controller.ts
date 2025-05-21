// src/cuti/cuti.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
  UseInterceptors,
  HttpException,
  HttpStatus,
  UploadedFile,
  HttpCode,
  UploadedFiles,
} from '@nestjs/common';
import { CreateProdukDto } from './dto/create-produk.dto';
import { ProdukService } from './produk.service';
import { Produk } from './entities/produk.entity';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('produk')
export class ProdukController {
  constructor(private readonly produkService: ProdukService) {}

  // Endpoint untuk menambah cuti
  @Post()
  @UseInterceptors(
    FilesInterceptor('fotos', 100, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `produk-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return callback(
            new HttpException(
              'Only image files are allowed!',
              HttpStatus.BAD_REQUEST,
            ),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async create(
    @Body() createProdukDto: CreateProdukDto,
    @UploadedFiles() fotos: Express.Multer.File[],
  ) {
    if (!fotos || fotos.length === 0) {
      throw new HttpException(
        'Minimal 1 foto is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.produkService.create(createProdukDto, fotos);
  }

 @Put(':id')
@UseInterceptors(
  FilesInterceptor('fotos', 100, {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `produk-${uniqueSuffix}${ext}`);
      },
    }),
    fileFilter: (req, file, callback) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
        return callback(
          new HttpException('Only image files are allowed!', HttpStatus.BAD_REQUEST),
          false,
        );
      }
      callback(null, true);
    },
  }),
)
async update(
  @Param('id') id: number,
  @Body() updateProdukDto: any,
  @UploadedFiles() fotos: Express.Multer.File[],
) {
  const { existingFileIds } = updateProdukDto;

  let parsedIds: number[] = [];
  if (typeof existingFileIds === 'string') {
    parsedIds = JSON.parse(existingFileIds); // dikirim dari form-data sebagai string
  } else if (Array.isArray(existingFileIds)) {
    parsedIds = existingFileIds;
  }

  return this.produkService.update(id, updateProdukDto, fotos, parsedIds);
}


  // Endpoint untuk mengambil semua cuti
  @Get()
  async findAll(): Promise<Produk[]> {
    return this.produkService.findAll();
  }

  // Endpoint untuk mengambil cuti berdasarkan ID
  @Get(':id')
  async findById(@Param('id') id: number): Promise<Produk> {
    const result = await this.produkService.findOne(id);
    return result;
  }

  @Delete(':id')
  // Menghapus cuti berdasarkan ID
  async remove(@Param('id') id: number): Promise<void> {
    // Check if the ID is valid and exists in the database
    const result = await this.produkService.delete(id);

    if (result.affected === 0) {
      throw new Error('Produk not found');
    }
  }
}
