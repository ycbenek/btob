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

export default async function CategoriesPage() {
    const categories = await db.category.findMany({
        include: {
            _count: {
                select: { products: true },
            },
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    type CategoryWithCount = typeof categories[0];

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Kategoriler</h1>
                <Link href="/admin/categories/new">
                    <Button size="sm" className="gap-1">
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Kategori Ekle
                        </span>
                    </Button>
                </Link>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Kategoriler</CardTitle>
                    <CardDescription>
                        Ürün kategorilerinizi yönetin.
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
                                <TableHead>Slug</TableHead>
                                <TableHead>Ürünler</TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Oluşturulma Tarihi
                                </TableHead>
                                <TableHead>
                                    <span className="sr-only">İşlemler</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.map((category: CategoryWithCount) => (
                                <TableRow key={category.id}>
                                    <TableCell className="hidden sm:table-cell">
                                        {/* Placeholder for image */}
                                        <div className="h-16 w-16 rounded bg-muted" />
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {category.name}
                                    </TableCell>
                                    <TableCell>
                                        {category.slug}
                                    </TableCell>
                                    <TableCell>
                                        {category._count.products}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {category.createdAt.toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <Button size="sm" variant="ghost">Düzenle</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {categories.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center text-muted-foreground py-10">
                                        Kategori bulunamadı.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                    <div className="text-xs text-muted-foreground">
                        <strong>{categories.length}</strong> kategori gösteriliyor
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
