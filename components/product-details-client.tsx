"use client";

import Link from "next/link";
import PublicHeader from "@/components/public-header";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";

export default function ProductDetailsClient({ product, images }: { product: any, images: string[] }) {
    const [selectedImage, setSelectedImage] = useState(images[0] || null);

    return (
        <div className="flex min-h-screen flex-col">
            <PublicHeader />
            <main className="flex-1 container py-8 md:py-12 px-4 md:px-6 mx-auto">
                <Link
                    href={`/categories/${product.category.slug}`}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
                >
                    <ChevronLeft className="h-4 w-4" />
                    {product.category.name} Kategorisine Dön
                </Link>
                <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
                    <div className="flex flex-col gap-4">
                        <div className="aspect-square overflow-hidden rounded-lg bg-muted flex items-center justify-center border border-border/50">
                            {selectedImage ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={selectedImage}
                                    alt={product.name}
                                    className="h-full w-full object-contain"
                                />
                            ) : (
                                <span className="text-muted-foreground">Resim Yok</span>
                            )}
                        </div>
                        {images.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto pb-2">
                                {images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(img)}
                                        className={`relative flex-none w-20 h-20 rounded-md overflow-hidden border-2 ${selectedImage === img ? "border-primary" : "border-transparent"
                                            }`}
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-6">
                        <div>
                            <div className="text-sm text-muted-foreground mb-2">{product.category.name}</div>
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-2">
                                {product.name}
                            </h1>
                            <div className="text-3xl font-bold text-primary">
                                ₺{Number(product.price).toFixed(2)}
                            </div>
                        </div>

                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                            <p>{product.description || "Açıklama bulunmuyor."}</p>
                        </div>

                        <div className="flex flex-col gap-4 sm:flex-row mt-4">
                            <Button size="lg" className="w-full md:w-auto text-lg px-8">
                                Teklif İste
                            </Button>
                            <Button size="lg" variant="outline" className="w-full md:w-auto text-lg px-8">
                                Teknik Özellikleri İndir
                            </Button>
                        </div>

                        <div className="border-t pt-6 mt-6">
                            <h3 className="font-semibold mb-4">Ürün Özellikleri</h3>
                            <dl className="grid gap-4 sm:grid-cols-2 text-sm">
                                <div className="grid gap-1">
                                    <dt className="font-medium text-muted-foreground">Ürün ID</dt>
                                    <dd>{product.id}</dd>
                                </div>
                                <div className="grid gap-1">
                                    <dt className="font-medium text-muted-foreground">Kategori</dt>
                                    <dd>{product.category.name}</dd>
                                </div>
                                {/* Add more specs here if available in DB */}
                            </dl>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
