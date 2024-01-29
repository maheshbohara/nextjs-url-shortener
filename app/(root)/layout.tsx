import Header from "@/components/shared/Header";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="site">
        <main className="site-main">{children}</main>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
