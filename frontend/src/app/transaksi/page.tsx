"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import TableTransaksi from "@/components/Tables/TableTransaksi";
const CutiPages = () => {
  const router = useRouter();

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    console.log(accessToken);
    if (!accessToken) {
      router.push("/auth/signin");
    }
  }, [router]);
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Data Transaksi" />

      <div className="flex flex-col gap-10">
        <TableTransaksi />
      </div>
    </DefaultLayout>
  );
};

export default CutiPages;
