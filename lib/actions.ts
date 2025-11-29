"use server";

import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const CategorySchema = z.object({
    name: z.string(),
    slug: z.string(),
});

export async function createCategory(prevState: any, formData: FormData) {
    const validatedFields = CategorySchema.safeParse({
        name: formData.get("name"),
        slug: formData.get("slug"),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Create Category.",
        };
    }

    const { name, slug } = validatedFields.data;

    try {
        await db.category.create({
            data: {
                name,
                slug,
            },
        });
    } catch (error) {
        return {
            message: "Database Error: Failed to Create Category.",
        };
    }

    revalidatePath("/admin/categories");
    redirect("/admin/categories");
}

const ProductSchema = z.object({
    name: z.string(),
    slug: z.string(),
    description: z.string().optional(),
    price: z.coerce.number(),
    categoryId: z.string(),
    image: z.string().optional(),
});

export async function createProduct(prevState: any, formData: FormData) {
    const validatedFields = ProductSchema.safeParse({
        name: formData.get("name"),
        slug: formData.get("slug"),
        description: formData.get("description"),
        price: formData.get("price"),
        categoryId: formData.get("categoryId"),
        image: formData.get("image"),
    });

    if (!validatedFields.success) {
        return {
            message: "Missing Fields. Failed to Create Product.",
        };
    }

    const { name, slug, description, price, categoryId, image } = validatedFields.data;
    const images = image ? JSON.stringify([image]) : null;

    try {
        await db.product.create({
            data: {
                name,
                slug,
                description,
                price,
                categoryId,
                images,
            },
        });
    } catch (error) {
        return {
            message: "Database Error: Failed to Create Product.",
        };
    }

    revalidatePath("/admin/products");
    redirect("/admin/products");
}

const SliderSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: z.string(),
    mobileImage: z.string().optional(),
    link: z.string().optional(),
    order: z.coerce.number().default(0),
    active: z.coerce.boolean().default(true),
});

export async function createSlider(prevState: any, formData: FormData) {
    const validatedFields = SliderSchema.safeParse({
        title: formData.get("title") || undefined,
        description: formData.get("description") || undefined,
        image: formData.get("image"),
        mobileImage: formData.get("mobileImage") || undefined,
        link: formData.get("link") || undefined,
        order: formData.get("order"),
        active: formData.get("active") === "on",
    });

    if (!validatedFields.success) {
        return {
            message: "Missing Fields. Failed to Create Slider.",
        };
    }

    const { title, description, image, mobileImage, link, order, active } = validatedFields.data;

    // Build data object with only defined optional fields
    const sliderData: any = {
        image,
        order,
        active,
    };
    if (title) sliderData.title = title;
    if (description) sliderData.description = description;
    if (mobileImage) sliderData.mobileImage = mobileImage;
    if (link) sliderData.link = link;

    try {
        await db.slider.create({
            data: sliderData,
        });
    } catch (error) {
        return {
            message: "Database Error: Failed to Create Slider.",
        };
    }

    revalidatePath("/admin/sliders");
    redirect("/admin/sliders");
}

export async function deleteSlider(id: string) {
    try {
        await db.slider.delete({
            where: { id },
        });
        revalidatePath("/admin/sliders");
    } catch (error) {
        return {
            message: "Database Error: Failed to Delete Slider.",
        };
    }
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn("credentials", formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Invalid credentials.";
                default:
                    return "Something went wrong.";
            }
        }
        throw error;
    }
}
