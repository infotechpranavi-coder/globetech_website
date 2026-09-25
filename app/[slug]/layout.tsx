import type { Metadata } from "next";
import { productSeo } from "@/lib/pageSeo";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return productSeo[params.slug] ?? {};
}

export default function ProductSlugLayout({ children }: { children: React.ReactNode }) {
  return children;
}
