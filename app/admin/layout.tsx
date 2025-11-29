import Link from "next/link";
import { LayoutDashboard, Package, FolderTree, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40 md:flex-row">
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background sm:flex">
                <div className="flex h-14 items-center border-b px-6">
                    <Link href="/admin/products" className="flex items-center gap-2 font-semibold">
                        <Package className="h-6 w-6" />
                        <span className="">B2B Admin</span>
                    </Link>
                </div>
                <nav className="flex flex-col gap-4 px-4 py-4">
                    <Link
                        href="/admin/products"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                        <Package className="h-4 w-4" />
                        Ürünler
                    </Link>
                    <Link
                        href="/admin/categories"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                        <FolderTree className="h-4 w-4" />
                        Kategoriler
                    </Link>
                    <Link
                        href="/admin/sliders"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                        <LayoutDashboard className="h-4 w-4" />
                        Sliderlar
                    </Link>
                    <Link
                        href="/admin/settings"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                        <Settings className="h-4 w-4" />
                        Ayarlar
                    </Link>
                </nav>
                <div className="mt-auto p-4">
                    <form
                        action={async () => {
                            "use server";
                            await signOut();
                        }}
                    >
                        <Button variant="outline" className="w-full gap-2">
                            <LogOut className="h-4 w-4" />
                            Çıkış Yap
                        </Button>
                    </form>
                </div>
            </aside>
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 md:ml-64 transition-all duration-300">
                {children}
            </main>
        </div>
    );
}
