import type { Metadata } from "next";
import OfferingsBoard from "@/components/OfferingsBoard";

export const metadata: Metadata = {
  title: "Offering help",
};

export default function OffersPage() {
  return <OfferingsBoard />;
}
