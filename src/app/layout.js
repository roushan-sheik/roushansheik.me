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
        <main className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 min-h-screen flex flex-col">
          <Header />
          <div className="flex-1 flex flex-col">{children}</div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
