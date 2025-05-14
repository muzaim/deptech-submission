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
import ImageUploader from "../ImageUploader";

const validationSchema = z.object({
  namaProduk: z.string().min(1, { message: "Nama Produk is required" }),
  harga: z.string().min(1, { message: "Harga is required" }),
});

type FormData = {
  namaProduk: string;
  harga: number;
  foto: File | null;
};

const EditProdukElements = () => {
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
  const [dataProduk, setDataProduk] = useState<any>(null);

  useEffect(() => {
    flatpickr(".form-datepicker", {
      dateFormat: "m/d/Y",
    });
  }, []);

  useEffect(() => {
    if (dataProduk) {
      console.log('dataProduk', dataProduk);
      setValue("namaProduk", dataProduk.nama);
      setValue("harga", dataProduk.harga);
      setValue("foto", dataProduk.foto);
    }
    // setSelectedFile(dataProduk.foto);
  }, [dataProduk, setValue]);

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
    

        const result = await editProduk(Number(id), {
          nama: String(data.namaProduk),
          harga: String(data.harga),
          foto: selectedFile ?? null, // Ensure the correct file is passed here
        });

        console.log('result', result);

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
    setSelectedFile(file); // Store the selected file
  };

  useEffect(() => {
    fetchDataById(Number(id));
  }, [id]);

  const fetchDataById = async (id: number) => {
    try {
      setLoading(true);
      const data = await fetchProdukById(id);
      setDataProduk(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch pegawai data");
      console.error("Error fetching data by ID:", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Breadcrumb pageName="Edit Data Produk" />
  
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
                    defaultImage={dataProduk?.foto ?? null}
                    error={errors.foto?.message}
                    onFileSelect={(file) => {
                      setSelectedFile(file); // update React Hook Form
                    }}
                  />
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

export default EditProdukElements;
