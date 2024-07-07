import { Inter } from "next/font/google";

import Footer from "@/components/shared/footer/Footer";
import Header from "@/components/shared/header/Header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Roushan Sheik",
  description: "roushan sheik personal portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg_gradient mx-auto`}>
        <main className={" container w-[90%] mx-auto"}>
          <Header />
          <div>{children}</div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
