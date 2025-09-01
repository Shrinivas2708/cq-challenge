"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { users } from "@/db/schema/auth"; // Corrected import path
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";

// Type for our form state
type FormState = { error: string } | undefined;

export async function loginUser(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password." };
        default:
          return { error: "Something went wrong." };
      }
    }
    // This is required for redirects to work
    throw error;
  }
}

export async function registerUser(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "All fields are required." };
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    await db.insert(users).values({
      name,
      email,
      hashedPassword,
    });
  } catch (error) {
    // This could be a unique constraint violation
    return { error: "User with this email already exists." };
  }

  // After successful registration, redirect to login
  redirect("/login");
}
