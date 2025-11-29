import Link from "next/link";
import Image from "next/image";
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
import { HeroSlider } from "@/components/hero-slider";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const categories = await db.category.findMany({
    include: {
      products: {
        take: 3,
      },
    },
  });

  const featuredProducts = await db.product.findMany({
    take: 4,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      category: true,
    }
  });

  const sliders = await db.slider.findMany({
    where: { active: true },
    orderBy: { order: 'asc' },
  });

  console.log('Categories count:', categories.length);
  console.log('Sliders count:', sliders.length);
  console.log('Featured products count:', featuredProducts.length);

  type CategoryType = typeof categories[0];
  type ProductType = typeof featuredProducts[0];

  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <main className="flex-1">
        <HeroSlider slides={sliders} />

        <section className="w-full py-16 bg-secondary/30">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-serif text-center mb-12 text-primary tracking-wide">
              Kategoriler
            </h2>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              {categories.length > 0 ? (
                categories.map((category: CategoryType) => (
                  <Link key={category.id} href={`/categories/${category.slug}`} className="group flex flex-col items-center gap-4">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white shadow-sm border border-border flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:shadow-md group-hover:scale-105 group-hover:border-primary/20">
                      <div className="text-muted-foreground/50 font-serif italic">
                        {category.name}
                      </div>
                    </div>
                    <span className="text-lg font-medium text-gray-700 group-hover:text-primary transition-colors">
                      {category.name}
                    </span>
                  </Link>
                ))
              ) : (
                <p className="text-muted-foreground">Henüz kategori eklenmemiş.</p>
              )}
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center mb-16 space-y-2">
              <h2 className="text-3xl md:text-4xl font-serif text-center text-primary tracking-wide">
                Yeni Gelenler
              </h2>
              <div className="w-24 h-1 bg-accent rounded-full" />
              <p className="text-muted-foreground text-center max-w-2xl mt-4 font-light">
                Sizin için seçilmiş en yeni premium ev gereçleri koleksiyonumuzu keşfedin.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product: ProductType) => {
                const images = product.images ? JSON.parse(product.images) : [];
                const mainImage = images[0];
                return (
                  <Card key={product.id} className="flex flex-col border-none shadow-none group">
                    <CardContent className="p-0">
                      <div className="aspect-[3/4] w-full overflow-hidden bg-secondary/20 relative mb-4">
                        {mainImage ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={mainImage}
                            alt={product.name}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-muted-foreground/30 font-serif italic">
                            Resim Yok
                          </div>
                        )}
                        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center bg-gradient-to-t from-black/10 to-transparent">
                          <Link href={`/products/${product.slug}`} className="w-full">
                            <Button className="w-full bg-white/90 text-primary hover:bg-white shadow-sm backdrop-blur-sm border border-primary/10">
                              Detayları Gör
                            </Button>
                          </Link>
                        </div>
                      </div>
                      <div className="text-center space-y-1">
                        <div className="text-xs text-muted-foreground uppercase tracking-wider">{product.category.name}</div>
                        <h3 className="font-medium text-lg text-gray-800 line-clamp-1 group-hover:text-primary transition-colors">
                          <Link href={`/products/${product.slug}`}>
                            {product.name}
                          </Link>
                        </h3>
                        <div className="font-serif text-xl text-primary font-semibold">
                          ₺{Number(product.price).toFixed(2)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="mt-16 text-center">
              <Link href="/#categories">
                <Button variant="outline" size="lg" className="px-8 py-6 text-lg font-light tracking-widest uppercase border-primary/20 hover:bg-primary hover:text-white transition-all duration-300">
                  Tüm Ürünleri Gör
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t container mx-auto">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2025 Tüm hakları saklıdır.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Kullanım Şartları
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Gizlilik
          </Link>
        </nav>
      </footer>
    </div>
  );
}
