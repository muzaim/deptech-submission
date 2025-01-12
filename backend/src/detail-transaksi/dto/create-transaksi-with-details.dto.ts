export class CreateTransaksiWithDetailsDto {
  nama_pembeli: string;
  alamat: string;
  kode_pos: string;
  metode_pengiriman: string;
  bukti_transfer: string;
  total_harga: number;
  purchase_details: {
    produk_id: number;
    quantity: number;
  }[];
}
