import "./globals.css";
import { Toaster } from "sonner";
export const metadata = {
  title: "Optimus Pay",
  description:
    "Elevate your business without the tech headache; our intuitive account abstraction and easy SDK integration make accepting crypto a breeze. One click payment Integration for Web2 Merchants Site.",
};

import Provider from "./_config/Provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="shortcut icon" href="/images/logo.png" type="image/x-icon" />
      <Provider>
        {" "} 
        <body>{children}</body>
      </Provider>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      />
      <Toaster />
    </html>
  );
}
