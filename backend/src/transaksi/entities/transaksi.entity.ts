import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { DetailTransaksi } from '../../detail-transaksi/entities/detail-transaksi.entity';

export enum MetodePengiriman {
  JNE = 'jne',
  JNT = 'jnt',
  SICEPAT = 'sicepat',
}

// Entity definition
@Entity()
export class Transaksi {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nomor_transaksi: string;

  @Column()
  nama_pembeli: string;

  @Column()
  alamat: string;

  @Column()
  telp: string;

  @Column()
  email: string;

  @Column()
  tanggal: Date;

  @Column()
  bukti_transfer: string;


  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  total_harga: Number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', select: false })
  deleted_at?: Date;

  @OneToMany(() => DetailTransaksi, (detail) => detail.transaksi, {
    cascade: true,
  })
  details: DetailTransaksi[];
}
