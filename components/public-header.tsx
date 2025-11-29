"use client";

import Link from "next/link";
import { Package, Search, User, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function PublicHeader() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-white border-b">
            {/* Top Bar - Hidden on mobile */}
            <div className="bg-gray-50 border-b hidden md:block">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-10 text-xs">
                        <div className="flex items-center gap-6">
                            <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                                Mağazalarımız
                            </Link>
                            <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                                İletişim
                            </Link>
                        </div>
                        <div className="flex items-center gap-6">
                            <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                                Yardım
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 font-bold text-lg md:text-xl">
                        <img
                            src="https://www.kadencewp.com/wp-content/uploads/2020/10/alogo-2.png"
                            alt="B2B Catalog"
                            className="h-12 w-12 md:h-16 md:w-16 object-contain"
                        />
                        <span className="font-serif">Logo</span>
                    </Link>

                    {/* Search Bar - Desktop only */}
                    <div className="hidden md:flex flex-1 max-w-2xl mx-8">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input
                                type="search"
                                placeholder="Ürün, kategori veya marka ara..."
                                className="w-full pl-10 pr-4 py-2 border-gray-300 focus:border-primary rounded-full"
                            />
                        </div>
                    </div>

                    {/* Right Icons */}
                    <div className="flex items-center gap-2 md:gap-4">
                        <Button variant="ghost" size="icon" className="rounded-full hidden md:flex">
                            <User className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full hidden md:flex">
                            <Heart className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <ShoppingBag className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                {/* Mobile Search Bar */}
                <div className="md:hidden pb-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            type="search"
                            placeholder="Ara..."
                            className="w-full pl-9 pr-4 py-2 text-sm border-gray-300 focus:border-primary rounded-full"
                        />
                    </div>
                </div>
            </div>

            {/* Desktop Navigation Menu */}
            <div className="border-t bg-white hidden md:block">
                <div className="container mx-auto px-4">
                    <nav className="flex items-center justify-center gap-8 h-12">
                        <Link
                            className="text-sm font-medium hover:text-primary transition-colors"
                            href="/"
                        >
                            Ana Sayfa
                        </Link>
                        <Link
                            className="text-sm font-medium hover:text-primary transition-colors"
                            href="/#categories"
                        >
                            Kategoriler
                        </Link>
                        <Link
                            className="text-sm font-medium hover:text-primary transition-colors"
                            href="#"
                        >
                            Yeni Ürünler
                        </Link>
                        <Link
                            className="text-sm font-medium hover:text-primary transition-colors"
                            href="#"
                        >
                            Kampanyalar
                        </Link>
                        <Link
                            className="text-sm font-medium hover:text-primary transition-colors"
                            href="#"
                        >
                            Hakkımızda
                        </Link>
                    </nav>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t bg-white">
                    <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
                        <Link
                            className="text-sm font-medium hover:text-primary transition-colors py-2"
                            href="/"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Ana Sayfa
                        </Link>
                        <Link
                            className="text-sm font-medium hover:text-primary transition-colors py-2"
                            href="/#categories"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Kategoriler
                        </Link>
                        <Link
                            className="text-sm font-medium hover:text-primary transition-colors py-2"
                            href="#"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Yeni Ürünler
                        </Link>
                        <Link
                            className="text-sm font-medium hover:text-primary transition-colors py-2"
                            href="#"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Kampanyalar
                        </Link>
                        <Link
                            className="text-sm font-medium hover:text-primary transition-colors py-2"
                            href="#"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Hakkımızda
                        </Link>
                        <div className="border-t pt-4 mt-2">
                            <Link
                                className="text-sm font-medium hover:text-primary transition-colors py-2 flex items-center gap-2"
                                href="#"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <User className="h-4 w-4" />
                                Hesabım
                            </Link>
                            <Link
                                className="text-sm font-medium hover:text-primary transition-colors py-2 flex items-center gap-2"
                                href="#"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <Heart className="h-4 w-4" />
                                Favorilerim
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
