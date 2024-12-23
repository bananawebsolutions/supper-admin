"use client";

import { Home, ShoppingCart, Users } from "lucide-react";
import Link from "next/link";
// import { Badge } from "./ui/badge";
import { useState } from "react";

function Navigation() {
    const url = window.location.href;
    const parts = url.split("/");
    const [active, setActive] = useState<string>(parts[parts.length - 1]);

    return (
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
                onClick={() => setActive("dashboard")}
                href="/"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                    active === "dashboard"
                        ? "bg-muted text-primary"
                        : "text-muted-foreground"
                }`}
            >
                <Home className="h-4 w-4" />
                Dashboard
            </Link>
            <Link
                onClick={() => setActive("pedidos")}
                href="/pedidos"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                    active === "pedidos"
                        ? "bg-muted text-primary"
                        : "text-muted-foreground"
                }`}
            >
                <ShoppingCart className="h-4 w-4" />
                Pedidos
                {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    6
                </Badge> */}
            </Link>
            <Link
                onClick={() => setActive("clientes")}
                href="/clientes"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                    active === "clientes"
                        ? "bg-muted text-primary"
                        : "text-muted-foreground"
                }`}
            >
                <Users className="h-4 w-4" />
                Clientes
            </Link>
        </nav>
    );
}

export default Navigation;
