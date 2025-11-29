"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Slide {
    id: string;
    title: string | null;
    description: string | null;
    image: string;
    mobileImage: string | null;
    link: string | null;
}

export function HeroSlider({ slides }: { slides: Slide[] }) {
    const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

    if (!slides || slides.length === 0) {
        return null;
    }

    return (
        <div className="overflow-hidden w-full" ref={emblaRef}>
            <div className="flex">
                {slides.map((slide) => (
                    <div key={slide.id} className="flex-[0_0_100%] min-w-0 relative h-[400px] md:h-[600px] flex items-center justify-center">
                        {slide.link ? (
                            <Link href={slide.link} className="relative w-full h-full block">
                                {/* Desktop Image */}
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={slide.image}
                                    alt="Slider"
                                    className="hidden md:block w-full h-full object-cover"
                                />
                                {/* Mobile Image */}
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={slide.mobileImage || slide.image}
                                    alt="Slider"
                                    className="block md:hidden w-full h-full object-cover"
                                />
                            </Link>
                        ) : (
                            <>
                                {/* Desktop Image */}
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={slide.image}
                                    alt="Slider"
                                    className="hidden md:block w-full h-full object-cover"
                                />
                                {/* Mobile Image */}
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={slide.mobileImage || slide.image}
                                    alt="Slider"
                                    className="block md:hidden w-full h-full object-cover"
                                />
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
