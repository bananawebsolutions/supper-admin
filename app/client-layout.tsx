"use client";

import { usePathname } from "next/navigation";
import { ThemeProvider } from "next-themes";
import Sidebar from "@/components/sidebar";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isAuthPage =
        pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {!isAuthPage ? (
                <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
                    <Sidebar>{children}</Sidebar>
                </div>
            ) : (
                <main>{children}</main>
            )}
        </ThemeProvider>
    );
}
