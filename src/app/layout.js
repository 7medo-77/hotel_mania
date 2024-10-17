/* General layout */
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import GlobalProvider from "./globalprovider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Snacky",
  description: "We're dedicated to giving you the very best of Healthy food (sancks), with a focus on quality, freshness, and customer service.",
};

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <GlobalProvider>
        <div className='container'>
        <NavBar />
        {children}
        <Footer />
        </div>
        </GlobalProvider>
      </body>
    </html>
  );
}
