import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaksi } from './entities/transaksi.entity'; // Import Transaksi Entity
import { CreateTransaksiDto } from './dto/create-transaksi.dto';
import { CreateTransaksiWithDetailsDto } from '../detail-transaksi/dto/create-transaksi-with-details.dto';
import { DetailTransaksi } from '../detail-transaksi/entities/detail-transaksi.entity';
import { ProdukService } from 'src/produk/produk.service';
import { Produk } from 'src/produk/entities/produk.entity';
import { EntityManager } from 'typeorm';
@Injectable()
export class TransaksiService {
  constructor(
    @InjectRepository(Transaksi)
    private readonly transaksiRepository: Repository<Transaksi>,

    @InjectRepository(DetailTransaksi)
    private readonly produkRepository: Repository<Produk>,
    @InjectRepository(DetailTransaksi)
    private readonly detailRepository: Repository<DetailTransaksi>,
    private readonly produkService: ProdukService,
  ) {}
  // dadasadsa
  // Create a new transaction
  async createWithDetails(
    dto: CreateTransaksiWithDetailsDto,
  ): Promise<Transaksi> {
    const currentDate = new Date();
    const nomorTransaksi = `TR-${currentDate.getFullYear()}${('0' + (currentDate.getMonth() + 1)).slice(-2)}${('0' + currentDate.getDate()).slice(-2)}-${currentDate.getTime().toString().slice(-6)}`;

    return this.transaksiRepository.manager.transaction(async (manager) => {
      try {
        // Step 1: Insert transaksi (master data) with all required fields
        const insertTransaksiQuery = `
          INSERT INTO transaksi (nomor_transaksi, tanggal, total_harga, nama_pembeli, alamat, kode_pos, metode_pengiriman, bukti_transfer)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        await manager.query(insertTransaksiQuery, [
          nomorTransaksi,
          currentDate,
          0, // Total harga sementara
          dto.nama_pembeli, // nama_pembeli
          dto.alamat, // alamat
          dto.kode_pos, // kode_pos
          dto.metode_pengiriman, // metode_pengiriman
          dto.bukti_transfer, // bukti_transfer
        ]);

        // Step 2: Get the ID of the inserted transaksi using LAST_INSERT_ID()
        const transaksiIdQuery = `SELECT LAST_INSERT_ID() AS id`;
        const resultTransaksi = await manager.query(transaksiIdQuery);
        const transaksiId = resultTransaksi[0].id; // Ambil ID transaksi yang baru disimpan

        let totalHarga = 0; // Total harga untuk transaksi

        // Step 3: Insert detail transaksi
        const insertDetailQueries = [];
        for (const detail of dto.purchase_details) {
          const produk = await manager.findOne(Produk, {
            where: { id: detail.produk_id },
          });

          if (!produk) {
            throw new Error(`Product with ID ${detail.produk_id} not found`);
          }

          const subtotal = parseFloat(
            (detail.quantity * produk.harga).toFixed(2),
          );
          totalHarga += subtotal;

          // Insert detail transaksi untuk setiap produk
          const insertDetailQuery = `
            INSERT INTO detail_transaksi (quantity, subtotal, transaksi_id, produk_id)
            VALUES (?, ?, ?, ?)
          `;
          insertDetailQueries.push(
            manager.query(insertDetailQuery, [
              detail.quantity,
              subtotal,
              transaksiId, // Menggunakan ID transaksi yang baru disimpan
              detail.produk_id,
            ]),
          );
        }

        // Eksekusi semua query detail transaksi secara paralel
        await Promise.all(insertDetailQueries);

        // Step 4: Update total harga transaksi setelah detail transaksi disimpan
        const updateTransaksiQuery = `
          UPDATE transaksi
          SET total_harga = ?
          WHERE id = ?
        `;
        await manager.query(updateTransaksiQuery, [totalHarga, transaksiId]);

        // Step 5: Mengambil transaksi yang sudah disimpan dengan detailnya
        const savedTransaksi = await manager.findOne(Transaksi, {
          where: { id: transaksiId },
          relations: ['details', 'details.produk'],
        });

        return savedTransaksi;
      } catch (error) {
        console.error('Error dalam transaksi:', error);
        throw error; // Rollback transaksi jika ada error
      }
    });
  }

  // dsada
  // Get all transactions
  async findAll(): Promise<Transaksi[]> {
    return this.transaksiRepository.find();
  }

  // Get a single transaction by ID
  async findOne(id: number): Promise<Transaksi> {
    return this.transaksiRepository.findOne({ where: { id } });
  }

  // Update a transaction by ID
  async update(
    id: number,
    updateTransaksiDto: CreateTransaksiDto,
  ): Promise<Transaksi> {
    await this.transaksiRepository.update(id, updateTransaksiDto);
    return this.transaksiRepository.findOne({ where: { id } });
  }

  // Delete a transaction by ID
  async remove(id: number): Promise<void> {
    await this.transaksiRepository.delete(id);
  }
}
