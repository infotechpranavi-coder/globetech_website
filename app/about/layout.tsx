import { aboutSeo } from "@/lib/pageSeo";

export const metadata = aboutSeo;

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
