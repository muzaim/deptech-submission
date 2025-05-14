"use client";

import { useEffect, useState } from "react";
import { deleteProduk, fetchProduk, Produk } from "../../app/api/produk";
import { fetchTransaksi, Transaksi } from "../../app/api/transaksi";
import Link from "next/link";
import moment from "moment";

const TableTransaksi = () => {
  const [transaksiList, setTransaksiList] = useState<Transaksi[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTransaksiData = async () => {
      try {
        setLoading(true);
        const data = await fetchTransaksi();
        setTransaksiList(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getTransaksiData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="grid grid-cols-7 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Nomor Transaksi</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Tanggal Transaksi</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Nama Pembeli</p>
        </div>
        <div className="col-span-1 hidden items-center sm:flex">
          <p className="font-medium">Alamat</p>
        </div>

        <div className="col-span-1 flex items-center">
          <p className="font-medium">Action</p>
        </div>
      </div>
      {transaksiList?.length === 0 ? (
        <div className="py-4 text-center text-sm text-black dark:text-white">
          Data transaksi tidak ada
        </div>
      ) : (
        transaksiList?.map((transaksi, key) => (
          <div
            className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
            key={key}
          >
            <div className="col-span-2 flex items-center">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center justify-center gap-1">
                  <span
                    className={`rounded px-2 py-1 text-sm text-black dark:text-white`}
                  >
                    {transaksi.nomor_transaksi}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-2 flex items-center">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center justify-center gap-1">
                  <span className="text-sm text-black dark:text-white">
                    {moment(transaksi.tanggal).format("DD MMMM YYYY, HH:mm")}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-2 flex items-center">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center justify-center gap-1">
                  <span className="text-sm text-black dark:text-white">
                    {transaksi.nama_pembeli}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">
                {transaksi.alamat}
              </p>
            </div>
            <div className="col-span-1 flex items-center justify-start gap-3">
              <Link
                href={`/transaksi/detail-transaksi/${transaksi.id}`}
                className="flex items-center text-blue-500 dark:text-blue-400"
              >
                Detail
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TableTransaksi;
