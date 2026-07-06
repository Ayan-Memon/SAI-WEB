import "./globals.css";
import { Bebas_Neue, Inter, Poppins } from "next/font/google";
import Providers from "./providers";
import LenisProvider from "@/components/UI/LenisProvider";

export const metadata = {
  title: "SAI COLLEGE WEBSITE",
  description: "SAI COLLEGE WEBSITE",
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
});

// bg color suggests
// bg-[#EFE6DA]
// bg-[#F8F4EE]

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={` ${inter.variable} ${poppins.variable} ${bebas.variable} h-full antialiased w-full`}
    >
      <body
        className="max-w-355 relative mx-auto bg-primary w-full h-full"
        cz-shortcut-listen="true"
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
