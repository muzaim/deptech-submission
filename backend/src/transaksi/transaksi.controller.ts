import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { TransaksiService } from './transaksi.service';
import { CreateTransaksiDto } from './dto/create-transaksi.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { CreateTransaksiWithDetailsDto } from '../detail-transaksi/dto/create-transaksi-with-details.dto';
import { Transaksi } from '../transaksi/entities/transaksi.entity';
@Controller('transaksi')
export class TransaksiController {
  constructor(private readonly transaksiService: TransaksiService) {}

  // Create a new transaction
  @Post()
  @UseInterceptors(
    FileInterceptor('bukti_transfer', {
      storage: diskStorage({
        destination: './uploads', // Folder for storing uploaded files
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `bukti_transfer-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  async createWithDetails(
    @Body() formData: any,
    @UploadedFile() bukti_transfer: Express.Multer.File,
  ): Promise<Transaksi> {
    // Parsing `purchase_details` from JSON string
    const purchaseDetails = JSON.parse(formData.purchase_details);

    // Preparing DTO
    const createTransaksiWithDetailsDto: CreateTransaksiWithDetailsDto = {
      ...formData,
      bukti_transfer: bukti_transfer.filename,
      purchase_details: purchaseDetails,
    };

    // Log to debug
    console.log('DTO:', createTransaksiWithDetailsDto);

    return this.transaksiService.createWithDetails(
      createTransaksiWithDetailsDto,
    );
  }

  // Get all transactions
  @Get()
  findAll() {
    return this.transaksiService.findAll();
  }

  // Get a transaction by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transaksiService.findOne(Number(id));
  }

  // Update a transaction by ID
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransaksiDto: CreateTransaksiDto,
  ) {
    return this.transaksiService.update(Number(id), updateTransaksiDto);
  }

  // Delete a transaction by ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transaksiService.remove(Number(id));
  }
}
