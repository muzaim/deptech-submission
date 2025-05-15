"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import * as z from "zod";

import { useEffect, useState } from "react";
import { fetchPegawai, Pegawai } from "@/app/api/pegawai";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { addProduk } from "@/app/api/produk";
import ImageUploader from "../ImageUploader";

const validationSchema = z.object({
  stock: z.string().min(1, { message: "Stock is required" }),
  namaProduk: z.string().min(1, { message: "Nama Produk is required" }),
  harga: z.string().min(1, { message: "Harga is required" }),
});

type FormData = {
  stock: string;
  namaProduk: string;
  harga: number;
  foto: File | null;
};

const AddProdukElements = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
  });

  const [successMessage, setSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [pegawaiList, setPegawaiList] = useState<Pegawai[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    flatpickr(".form-datepicker", {
      dateFormat: "m/d/Y",
    });
  }, []);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError("");

    const confirmation = await Swal.fire({
      title: "Pastikan Data Sudah Benar",
      text: "Apakah Anda yakin ingin memasukkan data produk ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Kirim!",
      cancelButtonText: "Batal",
    });

    if (confirmation.isConfirmed) {
      try {
        // Manually check if the file is valid
        if (!selectedFile) {
          Swal.fire({
            title: "Error",
            text: "Foto produk wajib diupload.",
            icon: "error",
            confirmButtonText: "OK",
          });
          setLoading(false);
          return;
        }

        const result = await addProduk({
          nama: String(data.namaProduk),
          stock: Number(data.stock),
          harga: data.harga,
          foto: selectedFile, // Ensure the correct file is passed here
        });

        Swal.fire({
          title: "Success!",
          text: "Data Produk berhasil ditambahkan.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          router.push("/produk");
        });
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || "Gagal menambahkan data Produk.";
        Swal.fire({
          title: "Error",
          text: errorMessage,
          icon: "error",
          confirmButtonText: "OK",
        });
        reset();
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    console.log(file);
    if (file === null) return;
    setPreviewImage(URL.createObjectURL(file));
    setSelectedFile(file); // Store the selected file
  };

  useEffect(() => {
    const getPegawaiData = async () => {
      try {
        setLoading(true);
        const data = await fetchPegawai();
        setPegawaiList(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getPegawaiData();
  }, []);

  return (
    <>
      <Breadcrumb pageName="Tambah Data Produk" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Nama Produk
                  </label>
                  <input
                    type="text"
                    placeholder="Nama Produk"
                    {...register("namaProduk")}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.namaProduk && (
                    <span className="text-red-500">
                      {errors.namaProduk.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Stock
                  </label>
                  <input
                    type="number"
                    placeholder="Stock Produk"
                    {...register("stock")}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.stock && (
                    <span className="text-red-500">{errors.stock.message}</span>
                  )}
                </div>

                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Harga Produk
                  </label>
                  <input
                    type="number"
                    placeholder="Harga Produk"
                    {...register("harga")}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.harga && (
                    <span className="text-red-500">{errors.harga.message}</span>
                  )}
                </div>

                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Gambar Produk
                  </label>
                  <ImageUploader
                    error={errors.foto?.message}
                    onFileSelect={(file) => {
                      setSelectedFile(file); // Kirim ke form
                    }}
                    />
                    {errors.foto && (
                      <span className="text-red-500">{errors.foto.message}</span>
                    )}
                </div>

                <div className="flex justify-end gap-2.5">
                  <Link
                    href="/produk"
                    className="flex items-center justify-center gap-3.5 rounded-lg bg-gray-500 px-10 py-4 text-sm font-medium text-white transition-colors hover:bg-gray-600"
                  >
                    Batal
                  </Link>

                  <button
                    type="submit"
                    className="hover:bg-primary-dark flex items-center justify-center gap-3.5 rounded-lg bg-primary px-10 py-4 text-sm font-medium text-white transition-colors"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProdukElements;
