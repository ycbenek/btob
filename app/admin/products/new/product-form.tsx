"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { createProduct } from "@/lib/actions";
import { useActionState } from "react";

interface Category {
    id: string;
    name: string;
}

export default function ProductForm({ categories }: { categories: Category[] }) {
    const [state, formAction, isPending] = useActionState(createProduct, null);

    console.log('Categories in form:', categories);
    console.log('Categories count in form:', categories.length);

    return (
        <form action={formAction}>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Ürün Detayları</CardTitle>
                            <CardDescription>
                                Yeni ürün için detayları girin.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="name">Ürün Adı</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        className="w-full"
                                        required
                                        placeholder="Ürün adını girin"
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="slug">Slug (URL)</Label>
                                    <Input
                                        id="slug"
                                        name="slug"
                                        type="text"
                                        className="w-full"
                                        required
                                        placeholder="urun-adi"
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="description">Açıklama</Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        className="min-h-32"
                                        placeholder="Ürün açıklamasını girin"
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="price">Fiyat (₺)</Label>
                                    <Input
                                        id="price"
                                        name="price"
                                        type="number"
                                        step="0.01"
                                        className="w-full"
                                        required
                                        placeholder="0.00"
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="category">Kategori</Label>
                                    <Select name="categoryId" required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Bir kategori seçin" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories && categories.length > 0 ? (
                                                categories.map((category) => (
                                                    <SelectItem key={category.id} value={category.id}>
                                                        {category.name}
                                                    </SelectItem>
                                                ))
                                            ) : (
                                                <div className="p-2 text-sm text-muted-foreground">
                                                    Kategori bulunamadı. Lütfen önce bir kategori ekleyin.
                                                </div>
                                            )}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="image">Resim URL</Label>
                                    <Input
                                        id="image"
                                        name="image"
                                        type="url"
                                        className="w-full"
                                        placeholder="https://example.com/resim.jpg"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>İşlemler</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Button size="sm" type="submit" className="w-full" disabled={isPending}>
                                {isPending ? 'Kaydediliyor...' : 'Ürünü Kaydet'}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </form>
    );
}
