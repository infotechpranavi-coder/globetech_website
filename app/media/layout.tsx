import { mediaSeo } from "@/lib/pageSeo";

export const metadata = mediaSeo;

export default function MediaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
