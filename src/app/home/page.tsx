"use client";
import dynamic from "next/dynamic";
import { PageLoading } from "@/components";

const HomeView = dynamic(() => import("@/views/home"), {
  ssr: false,
  loading: () => <PageLoading />,
});

export default function Page() {
  return <HomeView />;
}
