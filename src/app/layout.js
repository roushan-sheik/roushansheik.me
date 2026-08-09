import { Roboto } from "next/font/google";

import Footer from "@/components/shared/footer/Footer";
import Header from "@/components/shared/header/Header";
import "./globals.css";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700", "900"] });

export const metadata = {
  title: "Roushan Sheik",
  description: "roushan sheik personal portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.className} bg_gradient mx-auto`}>
        <main className="max-w-[760px] mx-auto px-6 lg:px-8">
          <Header />
          <div>{children}</div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
