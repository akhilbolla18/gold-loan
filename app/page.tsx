"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";



export default function Home() {
  const router = useRouter()

  useEffect(()=> {
    router.replace("/apply-gold-loan")
})


  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Link href="/apply-gold-loan" className="px-6 py-2 bg-primary text-primaryText border border-primary rounded">Apply Gold Loan</Link>
    </div>
  );
}
