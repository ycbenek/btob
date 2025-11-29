import Link from "next/link";
import { PlusCircle, Trash2 } from "lucide-react";
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
import { deleteSlider } from "@/lib/actions";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function SlidersPage() {
    const sliders = await db.slider.findMany({
        orderBy: {
            order: 'asc'
        }
    });

    type SliderType = typeof sliders[0];

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Sliderlar</h1>
                <Link href="/admin/sliders/new">
                    <Button size="sm" className="gap-1">
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Slider Ekle
                        </span>
                    </Button>
                </Link>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Sliderlar</CardTitle>
                    <CardDescription>
                        Ana sayfa sliderlarını yönetin.
                    </CardDescription>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="hidden w-[100px] sm:table-cell">
                                    Resim
                                </TableHead>
                                <TableHead>Sıra</TableHead>
                                <TableHead>Aktif</TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Oluşturulma Tarihi
                                </TableHead>
                                <TableHead>
                                    <span className="sr-only">İşlemler</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sliders.map((slider: SliderType) => (
                                <TableRow key={slider.id}>
                                    <TableCell className="hidden sm:table-cell">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={slider.image}
                                            alt="Slider Image"
                                            className="aspect-video rounded-md object-cover"
                                            height="64"
                                            width="64"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {slider.order}
                                    </TableCell>
                                    <TableCell>
                                        {slider.active ? "Evet" : "Hayır"}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {slider.createdAt.toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <form action={async () => {
                                            "use server";
                                            await deleteSlider(slider.id);
                                        }}>
                                            <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive/90">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </form>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {sliders.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center text-muted-foreground py-10">
                                        Slider bulunamadı.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                    <div className="text-xs text-muted-foreground">
                        <strong>{sliders.length}</strong> slider gösteriliyor
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
