import Link from "next/link";
import {
    // BoxIcon,
    // Bell,
    // CircleUser,
    Home,
    Menu,
    // Package2,
    ShoppingCart,
    Users,
} from "lucide-react";

// import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/ui/mode-toggle";
import AdminSearch from "@/components/features/admin-search";
import Navigation from "./navigation";
import { SignedIn, UserButton } from "@clerk/nextjs";

export default function Sidebar({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="hidden border-r bg-muted/40 md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex items-center border-b px-4 h-[80px] lg:px-6">
                        <Link
                            href="/"
                            className="flex items-center gap-2 font-semibold text-lg"
                        >
                            <span>
                                <ShoppingCart />
                            </span>
                            Supper
                        </Link>
                        {/* <Button
                            variant="outline"
                            size="icon"
                            className="ml-auto h-8 w-8"
                        >
                            <Bell className="h-4 w-4" />
                            <span className="sr-only">
                                Toggle notifications
                            </span>
                        </Button> */}
                    </div>
                    <div className="flex-1">
                        <Navigation />
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <header className="flex items-center gap-4 border-b bg-muted/40 px-4 h-[80px] lg:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="shrink-0 md:hidden"
                            >
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">
                                    Toggle navigation menu
                                </span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="flex flex-col">
                            <nav className="grid gap-2 text-lg font-medium">
                                <Link
                                    href="#"
                                    className="flex items-center gap-2 text-lg font-semibold"
                                >
                                    <span>
                                        <ShoppingCart />
                                    </span>
                                    Supper
                                </Link>
                                <Link
                                    href="/"
                                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                >
                                    <Home className="h-5 w-5" />
                                    Dashboard
                                </Link>
                                <Link
                                    href="/pedidos"
                                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                                >
                                    <ShoppingCart className="h-5 w-5" />
                                    Pedidos
                                    {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                        6
                                    </Badge> */}
                                </Link>
                                {/* <Link
                                    href="#"
                                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                >
                                    <Package className="h-5 w-5" />
                                    Products
                                </Link> */}
                                <Link
                                    href="#"
                                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                >
                                    <Users className="h-5 w-5" />
                                    Clientes
                                </Link>
                                {/* <Link
                                    href="#"
                                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                >
                                    <LineChart className="h-5 w-5" />
                                    Analytics
                                </Link> */}
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <div className="w-full flex-1">
                        <AdminSearch />
                    </div>
                    <ModeToggle />
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    {/* <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="secondary"
                                size="icon"
                                className="rounded-full"
                            >
                                <CircleUser className="h-5 w-5" />
                                <span className="sr-only">
                                    Toggle user menu
                                </span>
                            </Button>
                        </DropdownMenuTrigger> */}
                    {/* <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent> */}
                    {/* </DropdownMenu> */}
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    {children}
                </main>
            </div>
        </>
    );
}
