"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Chrome, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useSearchParams } from "next/navigation";

export default function SignInPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const handleSignIn = async (provider: string) => {
    setLoading(provider);
    try {
      await signIn(provider, { callbackUrl });
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Welcome to Cloud Share</CardTitle>
            <CardDescription>
              Sign in to upload, share, and manage your files securely
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="outline"
              className="w-full"
              size="lg"
              onClick={() => handleSignIn("google")}
              disabled={loading !== null}
            >
              {loading === "google" ? (
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              ) : (
                <Chrome className="h-5 w-5 mr-2" />
              )}
              Continue with Google
            </Button>

            <Button
              variant="outline"
              className="w-full"
              size="lg"
              onClick={() => handleSignIn("github")}
              disabled={loading !== null}
            >
              {loading === "github" ? (
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              ) : (
                <Github className="h-5 w-5 mr-2" />
              )}
              Continue with GitHub
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Secure Authentication
                </span>
              </div>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
