"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/employee");
  }, [router]);

  return null;
};

export default Page;
