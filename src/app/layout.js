"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import Footer from "@/layouts/footer/Footer";
import Navbar from "@/layouts/navbar/Navbar";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const Layout = ({ children }) => {
  return (
    <AuthProvider>
      <html lang="fr">
        <body>
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
