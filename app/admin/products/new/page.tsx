import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import db from "@/lib/db";
import ProductForm from "./product-form";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function NewProductPage() {
    const categories = await db.category.findMany();

    return (
        <div className="flex max-w-4xl flex-col gap-4">
            <div className="flex items-center gap-4">
                <Link href="/admin/products">
                    <Button variant="outline" size="icon" className="h-7 w-7">
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Geri</span>
                    </Button>
                </Link>
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    Yeni Ürün
                </h1>
            </div>
            <ProductForm categories={categories} />
        </div>
    );
}
