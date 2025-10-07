import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ClientLayout } from "@/app/components/ClientLayout";
import { ThemeProvider } from "./context/ThemeContext";
import icon from "@/app/documents/main-icon.png";

export const metadata = {
  title: "QSTORE",
  description: "SHOP",
  icons: {
    icon: icon.src,
    shortcut: icon.src,
    apple: icon.src,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <div className="min-h-screen bg-background">
                <ClientLayout>{children}</ClientLayout>
              </div>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
