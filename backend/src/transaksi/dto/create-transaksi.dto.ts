import { IsString } from 'class-validator';

export class CreateTransaksiDto {
  @IsString()
  nama_pembeli: string;

  @IsString()
  alamat: string;

  @IsString()
  kode_pos: string;

  @IsString()
  bukti_transfer: string; // This will store the filename, not the file itself

  metode_pengiriman: string;
  total: number;
  tanggal?: Date; // Automatically set in the service
  nomor_transaksi?: string; // Automatically set in the service
}
