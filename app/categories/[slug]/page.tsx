import Link from "next/link";
import { notFound } from "next/navigation";
import PublicHeader from "@/components/public-header";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import db from "@/lib/db";

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const category = await db.category.findUnique({
        where: { slug },
        include: {
            products: true,
        },
    });

    if (!category) {
        notFound();
    }

    type ProductType = typeof category.products[0];

    return (
        <div className="flex min-h-screen flex-col">
            <PublicHeader />
            <main className="flex-1 container py-8 md:py-12 px-4 md:px-6">
                <div className="flex flex-col gap-4 mb-8">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                        {category.name}
                    </h1>
                    <p className="text-muted-foreground">
                        {category.name} ürünlerimize göz atın.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {category.products.map((product: ProductType) => {
                        const images = product.images ? JSON.parse(product.images) : [];
                        const mainImage = images[0];
                        return (
                            <Card key={product.id} className="flex flex-col overflow-hidden group hover:shadow-lg transition-all duration-300 border-border/50">
                                <CardContent className="p-0">
                                    <div className="aspect-square w-full overflow-hidden bg-muted relative">
                                        {mainImage ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={mainImage}
                                                alt={product.name}
                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-muted-foreground bg-secondary">
                                                Resim Yok
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <h3 className="font-semibold text-lg leading-none tracking-tight mb-2 line-clamp-1">{product.name}</h3>
                                        <div className="font-bold text-xl text-primary">
                                            ₺{Number(product.price).toFixed(2)}
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="p-6 pt-0 mt-auto">
                                    <Link href={`/products/${product.slug}`} className="w-full">
                                        <Button className="w-full" variant="secondary">Detayları Gör</Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        );
                    })}
                    {category.products.length === 0 && (
                        <div className="col-span-full text-center py-12 text-muted-foreground">
                            Bu kategoride ürün bulunamadı.
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
