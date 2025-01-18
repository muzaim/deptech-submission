import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DetailTransaksiElements from "@/components/DetailTransaksiElements";

export const metadata: Metadata = {
  title: "Detail Data Transaksi",
  description:
    "This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const FormElementsPage = () => {
  return (
    <DefaultLayout>
      <DetailTransaksiElements />
    </DefaultLayout>
  );
};

export default FormElementsPage;
