"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import SelectGroupTwo from "@/components/SelectGroup/JenisKelaminSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import flatpickr from "flatpickr";
import { addAdmin } from "@/app/api/admin";

const validationSchema = z.object({
  firstName: z.string().min(1, { message: "Nama depan is required" }),
  lastName: z.string().min(1, { message: "Nama belakang is required" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  dateOfBirth: z.string().min(1, { message: "No HP is required" }),
  gender: z.string().min(1, { message: "Jenis kelamin is required" }),
  password: z.string().min(1, { message: "Address is required" }),
});

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  password: string;
};

const AddAdminElements = () => {
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

  useEffect(() => {
    flatpickr(".form-datepicker", {
      dateFormat: "m/d/Y",
    });
  }, []);

  const formatDate = (date: string): string => {
    const [month, day, year] = date.split("/");
    const formattedDate = new Date(`${year}-${month}-${day}`);
    return formattedDate.toISOString().split("T")[0];
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError("");

    const confirmation = await Swal.fire({
      title: "Pastikan Data Sudah Benar",
      text: "Apakah Anda yakin ingin mengirimkan data admin ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Kirim!",
      cancelButtonText: "Batal",
    });

    if (confirmation.isConfirmed) {
      const formattedMulaiTanggal = formatDate(data.dateOfBirth);

      try {
        const result = await addAdmin({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          dateOfBirth: formattedMulaiTanggal,
          gender: data.gender,
          password: data.password,
        });

        Swal.fire({
          title: "Success!",
          text: "Data data admin berhasil ditambahkan.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          router.push("/data-admin");
        });
      } catch (err: any) {
        setError("Failed to add data admin");
        console.error("Error:", err.message || err);
        Swal.fire({
          title: "Error",
          text: err.message || "Terjadi kesalahan saat menambahkan data admin.",
          icon: "error",
          confirmButtonText: "OK",
        });
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Tambah Data Admin" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            {successMessage && (
              <div className="flex w-full border-l-6 border-[#34D399] bg-[#34D399] bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
                <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#34D399]">
                  <svg
                    width="16"
                    height="12"
                    viewBox="0 0 16 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.2984 0.826822L15.2868 0.811827L15.2741 0.797751C14.9173 0.401867 14.3238 0.400754 13.9657 0.794406L5.91888 9.45376L2.05667 5.2868C1.69856 4.89287 1.10487 4.89389 0.747996 5.28987C0.417335 5.65675 0.417335 6.22337 0.747996 6.59026L0.747959 6.59029L0.752701 6.59541L4.86742 11.0348C5.14445 11.3405 5.52858 11.5 5.89581 11.5C6.29242 11.5 6.65178 11.3355 6.92401 11.035L15.2162 2.11161C15.5833 1.74452 15.576 1.18615 15.2984 0.826822Z"
                      fill="white"
                      stroke="white"
                    ></path>
                  </svg>
                </div>
                <div className="w-full">
                  <h5 className="mb-3 text-lg font-semibold text-black dark:text-[#34D399] ">
                    Message Sent Successfully
                  </h5>
                  <p className="text-base leading-relaxed text-body">
                    Data Admin berhasil ditambahkan.
                  </p>
                </div>
              </div>
            )}
            <div className="flex flex-col gap-5.5 p-6.5">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="my-5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Nama Depan
                  </label>
                  <input
                    type="text"
                    placeholder="Nama Depan"
                    {...register("firstName")}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.firstName && (
                    <span className="text-red-500">
                      {errors.firstName.message}
                    </span>
                  )}
                </div>

                <div className="my-5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Nama Belakang
                  </label>
                  <input
                    type="text"
                    placeholder="Nama Belakang"
                    {...register("lastName")}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.lastName && (
                    <span className="text-red-500">
                      {errors.lastName.message}
                    </span>
                  )}
                </div>

                <div className="my-5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                  )}
                </div>

                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Tanggal Lahir
                  </label>
                </div>
                <div className="relative">
                  <input
                    {...register("dateOfBirth")}
                    className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    placeholder="mm/dd/yyyy"
                    type="text"
                  />

                  <div className="pointer-events-none absolute inset-0 left-auto right-5 flex items-center">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.7504 2.9812H14.2879V2.36245C14.2879 2.02495 14.0066 1.71558 13.641 1.71558C13.2754 1.71558 12.9941 1.99683 12.9941 2.36245V2.9812H4.97852V2.36245C4.97852 2.02495 4.69727 1.71558 4.33164 1.71558C3.96602 1.71558 3.68477 1.99683 3.68477 2.36245V2.9812H2.25039C1.29414 2.9812 0.478516 3.7687 0.478516 4.75308V14.5406C0.478516 15.4968 1.26602 16.3125 2.25039 16.3125H15.7504C16.7066 16.3125 17.5223 15.525 17.5223 14.5406V4.72495C17.5223 3.7687 16.7066 2.9812 15.7504 2.9812ZM1.77227 8.21245H4.16289V10.9968H1.77227V8.21245ZM5.42852 8.21245H8.38164V10.9968H5.42852V8.21245ZM8.38164 12.2625V15.0187H5.42852V12.2625H8.38164V12.2625ZM9.64727 12.2625H12.6004V15.0187H9.64727V12.2625ZM9.64727 10.9968V8.21245H12.6004V10.9968H9.64727ZM13.8379 8.21245H16.2285V10.9968H13.8379V8.21245ZM2.25039 4.24683H3.71289V4.83745C3.71289 5.17495 3.99414 5.48433 4.35977 5.48433C4.72539 5.48433 5.00664 5.20308 5.00664 4.83745V4.24683H13.0504V4.83745C13.0504 5.17495 13.3316 5.48433 13.6973 5.48433C14.0629 5.48433 14.3441 5.20308 14.3441 4.83745V4.24683H15.7504C16.0316 4.24683 16.2566 4.47183 16.2566 4.75308V6.94683H1.77227V4.75308C1.77227 4.47183 1.96914 4.24683 2.25039 4.24683ZM1.77227 14.5125V12.2343H4.16289V14.9906H2.25039C1.96914 15.0187 1.77227 14.7937 1.77227 14.5125ZM15.7504 15.0187H13.8379V12.2625H16.2285V14.5406C16.2566 14.7937 16.0316 15.0187 15.7504 15.0187Z"
                        fill="#64748B"
                      />
                    </svg>
                  </div>
                  {errors.dateOfBirth && (
                    <span className="text-red-500">
                      {errors.dateOfBirth.message}
                    </span>
                  )}
                </div>

                <div className="my-5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Jenis Kelamin
                  </label>
                  <div className="flex items-center space-x-8">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value="male"
                        {...register("gender")}
                        className="h-6 w-6 text-primary focus:ring-2 focus:ring-primary dark:border-form-strokedark dark:bg-form-input dark:ring-offset-0"
                      />
                      <span className="text-sm text-black dark:text-white">
                        Male
                      </span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value="female"
                        {...register("gender")}
                        className="h-6 w-6 text-primary focus:ring-2 focus:ring-primary dark:border-form-strokedark dark:bg-form-input dark:ring-offset-0"
                      />
                      <span className="text-sm text-black dark:text-white">
                        Female
                      </span>
                    </label>
                  </div>
                  {errors.gender && (
                    <span className="mt-1 text-sm text-red-500">
                      {errors.gender.message}
                    </span>
                  )}
                </div>

                <div className="my-5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.password && (
                    <span className="text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                </div>

                <div className="flex justify-end gap-2.5">
                  <Link
                    href="/data-admin"
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAdminElements;
