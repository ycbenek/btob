import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import db from "@/lib/db";

export default async function ProductsPage() {
    const products = await db.product.findMany({
        include: {
            category: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Ürünler</h1>
                <Link href="/admin/products/new">
                    <Button size="sm" className="gap-1">
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Ürün Ekle
                        </span>
                    </Button>
                </Link>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Ürünler</CardTitle>
                    <CardDescription>
                        Ürün kataloğunuzu yönetin.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="hidden w-[100px] sm:table-cell">
                                    Resim
                                </TableHead>
                                <TableHead>İsim</TableHead>
                                <TableHead>Kategori</TableHead>
                                <TableHead>Fiyat</TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Oluşturulma Tarihi
                                </TableHead>
                                <TableHead>
                                    <span className="sr-only">İşlemler</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="hidden sm:table-cell">
                                        {/* Placeholder for image */}
                                        <div className="h-16 w-16 rounded bg-muted" />
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {product.name}
                                    </TableCell>
                                    <TableCell>
                                        {product.category.name}
                                    </TableCell>
                                    <TableCell>
                                        ₺{Number(product.price).toFixed(2)}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {product.createdAt.toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <Button size="sm" variant="ghost">Düzenle</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {products.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center text-muted-foreground py-10">
                                        Ürün bulunamadı.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                    <div className="text-xs text-muted-foreground">
                        <strong>{products.length}</strong> ürün gösteriliyor
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
