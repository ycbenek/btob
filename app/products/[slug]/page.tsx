import { notFound } from "next/navigation";
import db from "@/lib/db";
import ProductDetailsClient from "@/components/product-details-client";

export default async function ProductPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const product = await db.product.findUnique({
        where: { slug },
        include: { category: true },
    });

    if (!product) {
        notFound();
    }

    const images = product.images ? JSON.parse(product.images) : [];

    // Serialize product to avoid "Date object not supported" error in client component
    const serializedProduct = JSON.parse(JSON.stringify(product));

    // Client component wrapper for image gallery state
    return <ProductDetailsClient product={serializedProduct} images={images} />;
}
