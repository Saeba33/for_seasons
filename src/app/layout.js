"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import Footer from "@/layouts/footer/Footer";
import Navbar from "@/layouts/navbar/Navbar";
import "./globals.css";

const Layout = ({ children }) => {
  return (
    <AuthProvider>
      <html lang="fr">
        <head>
          <title>4 seasons</title>
          <meta
            name="description"
            content="A website about seasonal fruits and vegetables"
          />
        </head>
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
