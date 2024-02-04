"use client";

import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import {AuthProvider} from "@/utils/AuthContext";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const Layout = ({ children }) => {
  return (
    <AuthProvider>
      <html lang="fr">
        <body className={inter.className}>
          <div className="container">
            <Navbar />
            {children}
            <Footer />
          </div>
        </body>
      </html>
    </AuthProvider>
  );
};

export default Layout;
