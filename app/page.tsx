import HomePage from "@/components/HomePage";
import { homeSeo } from "@/lib/pageSeo";

export const metadata = homeSeo;

export default function Page() {
  return <HomePage />;
}
