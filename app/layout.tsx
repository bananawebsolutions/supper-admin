import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import ClientLayout from "./client-layout";
import { esMX } from "@clerk/localizations";

export const metadata: Metadata = {
    title: "Supper Admin",
    description: "Dashboard de ventas de Supper",
};

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider localization={esMX}>
            <html lang="es" suppressHydrationWarning>
                <body
                    className={cn(
                        "min-h-screen bg-background font-sans antialiased",
                        fontSans.variable
                    )}
                >
                    <ClientLayout>{children}</ClientLayout>
                </body>
            </html>
        </ClerkProvider>
    );
}
