import type { Metadata } from "next";
import Board from "@/components/Board";

export const metadata: Metadata = {
  title: "Need help",
};

export default function HomePage() {
  return <Board />;
}
