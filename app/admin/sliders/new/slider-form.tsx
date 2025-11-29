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
import { Checkbox } from "@/components/ui/checkbox";
import { createSlider } from "@/lib/actions";
import { useActionState } from "react";

export default function SliderForm() {
    const [state, formAction, isPending] = useActionState(createSlider, null);

    return (
        <form action={formAction}>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Slider Detayları</CardTitle>
                            <CardDescription>
                                Yeni slider detaylarını girin.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="image">Resim URL (Masaüstü)</Label>
                                    <Input
                                        id="image"
                                        name="image"
                                        type="url"
                                        className="w-full"
                                        placeholder="https://example.com/image.jpg"
                                        required
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="mobileImage">Resim URL (Mobil)</Label>
                                    <Input
                                        id="mobileImage"
                                        name="mobileImage"
                                        type="url"
                                        className="w-full"
                                        placeholder="https://example.com/mobile-image.jpg"
                                    />
                                    <p className="text-xs text-muted-foreground">Opsiyonel: Mobil cihazlar için farklı bir görsel kullanmak isterseniz ekleyin.</p>
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="link">Link URL</Label>
                                    <Input
                                        id="link"
                                        name="link"
                                        type="text"
                                        className="w-full"
                                        placeholder="/products/example-product"
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="order">Sıra</Label>
                                    <Input
                                        id="order"
                                        name="order"
                                        type="number"
                                        className="w-full"
                                        defaultValue={0}
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="active" name="active" defaultChecked />
                                    <Label htmlFor="active">Aktif</Label>
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
                                {isPending ? "Kaydediliyor..." : "Sliderı Kaydet"}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </form>
    );
}
