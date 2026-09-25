import { clientsSeo } from "@/lib/pageSeo";

export const metadata = clientsSeo;

export default function ClientsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
