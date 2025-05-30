import React from "react";
import EditPegawaiElements from "@/components/EditPegawaiElements";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Edit Data Pegawai",
  description:
    "This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const FormElementsPage = () => {
  return (
    <DefaultLayout>
      <EditPegawaiElements />
    </DefaultLayout>
  );
};

export default FormElementsPage;
