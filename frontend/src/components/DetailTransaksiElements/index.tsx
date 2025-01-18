"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import * as z from "zod";

import { useEffect, useState } from "react";
import { fetchProdukById, Produk, editProduk } from "@/app/api/produk";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { addProduk } from "@/app/api/produk";
import Image from "next/image";

import { DetailTransaksi, fetchTransaksiById } from "@/app/api/transaksi";

const validationSchema = z.object({
  namaProduk: z.string().min(1, { message: "Nama Produk is required" }),
  harga: z.string().min(1, { message: "Harga is required" }),
});

type FormData = {
  namaProduk: string;
  harga: number;
  foto: File | null;
};

const DetailTransaksiElements = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
  });

  const [successMessage, setSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { id } = useParams();
  const [dataTransaksi, setdataTransaksi] = useState<any>(null);
  const [produkList, setProdukList] = useState<DetailTransaksi[]>([]);

  useEffect(() => {
    flatpickr(".form-datepicker", {
      dateFormat: "m/d/Y",
    });
  }, []);

  useEffect(() => {
    if (dataTransaksi) {
      setValue("namaProduk", dataTransaksi.nama);
      setValue("harga", dataTransaksi.harga);
      setValue("foto", dataTransaksi.foto);
    }
    // setSelectedFile(dataTransaksi.foto);
  }, [dataTransaksi, setValue]);

  useEffect(() => {
    fetchDataById(Number(id));
  }, [id]);

  const fetchDataById = async (id: number) => {
    try {
      setLoading(true);
      const data = await fetchTransaksiById(id);
      setdataTransaksi(data);
      setProdukList(data.details);
    } catch (err: any) {
      setError(err.message || "Failed to fetch pegawai data");
      console.error("Error fetching data by ID:", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Breadcrumb pageName="Detail Transaksi" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex flex-row items-center">
              <div className="flex w-full flex-col gap-5.5 p-6.5">
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Nomor Transaksi
                  </label>
                  <input
                    type="text"
                    placeholder="Nama Produk"
                    value={dataTransaksi?.nomor_transaksi}
                    disabled
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Tanggal Transaksi
                  </label>
                  <input
                    type="text"
                    placeholder="Harga Produk"
                    value={dataTransaksi?.tanggal}
                    disabled
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Kode Pos
                  </label>
                  <input
                    type="text"
                    placeholder="Harga Produk"
                    value={dataTransaksi?.kode_pos}
                    disabled
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Total Harga
                  </label>
                  <input
                    type="text"
                    placeholder="Harga Produk"
                    value={dataTransaksi?.total_harga}
                    disabled
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="flex w-full flex-col gap-5.5 p-6.5">
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Nama Pembeli
                  </label>
                  <input
                    type="text"
                    placeholder="Nama Produk"
                    value={dataTransaksi?.nama_pembeli}
                    disabled
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Alamat
                  </label>
                  <input
                    type="text"
                    placeholder="Harga Produk"
                    value={dataTransaksi?.alamat}
                    disabled
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Metode Pengiriman
                  </label>
                  <input
                    type="text"
                    placeholder="Harga Produk"
                    value={dataTransaksi?.metode_pengiriman}
                    disabled
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="block">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Bukti Transfer
                  </label>
                  {dataTransaksi?.bukti_transfer ? (
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                      <Link href={dataTransaksi.bukti_transfer} target="_blank">
                        <span>Download</span>
                      </Link>
                    </button>
                  ) : (
                    <span className="text-sm text-gray-500">
                      No file available
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* PRODUK NYA BRO */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex items-center justify-end px-4 py-6 md:px-6 xl:px-7.5"></div>
            <div className="grid grid-cols-7 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="font-medium">Gambar</p>
              </div>
              <div className="col-span-2 flex items-center">
                <p className="font-medium">Nama Produk</p>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="font-medium">Harga</p>
              </div>
              <div className="col-span-1 hidden items-center sm:flex">
                <p className="font-medium">Jumlah</p>
              </div>
              <div className="col-span-1 hidden items-center sm:flex">
                <p className="font-medium">Sub Total</p>
              </div>
            </div>
            {produkList?.length === 0 ? (
              <div className="py-4 text-center text-sm text-black dark:text-white">
                Data produk tidak ada
              </div>
            ) : (
              produkList?.map((produk, key) => (
                <div
                  className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
                  key={key}
                >
                  <div className="col-span-2 flex items-center">
                    <Image
                      src={produk.produk.foto}
                      alt="gambar"
                      width={100}
                      height={100}
                    />
                  </div>

                  <div className="col-span-2 flex items-center">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-sm text-black dark:text-white">
                          {produk.produk.nama}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2 flex items-center">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-sm text-black dark:text-white">
                          {produk.produk.harga}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-1 flex items-center">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-sm text-black dark:text-white">
                          {produk.quantity}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-1 flex items-center">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-sm text-black dark:text-white">
                          {produk.quantity * produk.produk.harga}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1 flex items-center">
                    <p className="text-sm text-black dark:text-white"></p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailTransaksiElements;
