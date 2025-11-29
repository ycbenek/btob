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
import { createCategory } from "@/lib/actions";
import { useFormState } from "react-dom";

export default function NewCategoryPage() {
    const [state, formAction] = useFormState(createCategory, null);

    return (
        <div className="flex max-w-4xl flex-col gap-4">
            <div className="flex items-center gap-4">
                <Link href="/admin/categories">
                    <Button variant="outline" size="icon" className="h-7 w-7">
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Geri</span>
                    </Button>
                </Link>
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    Yeni Kategori
                </h1>
            </div>
            <form action={formAction}>
                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                    <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Kategori Detayları</CardTitle>
                                <CardDescription>
                                    Yeni kategori detaylarını girin.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6">
                                    <div className="grid gap-3">
                                        <Label htmlFor="name">İsim</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            type="text"
                                            className="w-full"
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="slug">Slug</Label>
                                        <Input
                                            id="slug"
                                            name="slug"
                                            type="text"
                                            className="w-full"
                                            required
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
                                <Button size="sm" type="submit" className="w-full">
                                    Kategoriyi Kaydet
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </div>
    );
}
