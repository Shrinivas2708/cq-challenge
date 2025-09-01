"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useActionState } from "react";

import { loginUser, registerUser } from "@/actions/auth.actions";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const inputStyles =
  "dark:bg-transparent backdrop-blur-sm focus-visible:outline-none focus-visible:ring-0 border-pink-300/30 dark:border-pink-200/15 h-9";

function CredentialsForm() {
  const [formState, formAction] = useActionState(loginUser, undefined);

  return (
    <Card className="w-full max-w-sm border-pink-300/30 bg-transparent backdrop-blur-lg dark:border-pink-200/15">
      <form action={formAction}>
        <CardHeader>
          <CardTitle className="font-montserrat text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {formState?.error && (
            <p className="rounded-md bg-red-900/50 p-2 text-center text-sm text-red-400">
              {formState.error}
            </p>
          )}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="m@example.com"
              required
              className={inputStyles}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              required
              className={inputStyles}
            />
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-4">
          <Button
            type="submit"
            className="w-full cursor-pointer rounded-full bg-gradient-to-bl from-pink-400 to-pink-800 px-5 text-white"
          >
            Sign in with Email
          </Button>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-pink-400 hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}

export function LoginForm() {
  return (
    <div className="flex w-full max-w-sm flex-col items-center justify-center gap-4">
      <CredentialsForm />
      <div className="relative w-full">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-pink-200/15" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="grid w-full grid-cols-2 gap-4">
        <Button
          variant="outline"
          onClick={() => signIn("github")}
          className="rounded-full"
        >
          GitHub
        </Button>
        <Button
          variant="outline"
          onClick={() => signIn("google")}
          className="rounded-full"
        >
          Google
        </Button>
      </div>
    </div>
  );
}

export function RegisterForm() {
  const [formState, formAction] = useActionState(registerUser, undefined);

  return (
    <Card className="w-full max-w-sm border-pink-300/30 bg-transparent backdrop-blur-lg dark:border-pink-200/15">
      <form action={formAction}>
        <CardHeader>
          <CardTitle className="font-montserrat text-2xl">Register</CardTitle>
          <CardDescription>
            Create a new account to start saving your moments.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {formState?.error && (
            <p className="rounded-md bg-red-900/50 p-2 text-center text-sm text-red-400">
              {formState.error}
            </p>
          )}
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Your Name"
              required
              className={inputStyles}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="m@example.com"
              required
              className={inputStyles}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              required
              className={inputStyles}
            />
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-4">
          <Button
            type="submit"
            className="w-full cursor-pointer rounded-full bg-gradient-to-bl from-pink-400 to-pink-800 px-5 text-white"
          >
            Create Account
          </Button>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-pink-400 hover:underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}

export function LoginButton() {
  return (
    <Button
      asChild
      className="cursor-pointer rounded-full bg-gradient-to-bl from-pink-400 to-pink-800 px-5 text-white"
    >
      <Link href="/login">Sign In</Link>
    </Button>
  );
}

export function SignOut({ userName }: { userName?: string | null }) {
  return (
    <div className="flex items-center gap-4">
      <span className="hidden text-sm font-medium sm:inline">
        {userName}
      </span>
      <form
        action={async () => {
          // "use server";
          await signOut();
        }}
      >
        <Button
          type="submit"
          variant="outline"
          className="cursor-pointer rounded-full"
        >
          Sign Out
        </Button>
      </form>
    </div>
  );
}
