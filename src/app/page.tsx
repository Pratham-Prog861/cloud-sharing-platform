"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Upload, BarChart3, Lock, Zap, Eye, Share2, Cloud, Shield, Users, CheckCircle2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleGetStarted = () => {
    if (session) {
      router.push("/dashboard");
    } else {
      router.push("/auth/signin");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <nav className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cloud className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Cloud Share</h1>
          </div>
          <div className="flex gap-3">
            {session ? (
              <Button onClick={() => router.push("/dashboard")} className="bg-linear-to-r from-blue-600 to-purple-600">Dashboard</Button>
            ) : (
              <>
                <Link href="/auth/signin">
                  <Button variant="outline">Sign In</Button>
                </Link>
                <Button onClick={handleGetStarted} className="bg-linear-to-r from-blue-600 to-purple-600">Get Started</Button>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="py-20 text-center">
          <div className="animate-fade-in-up">
            <div className="inline-block mb-6 animate-bounce-slow">
              <Cloud className="w-20 h-20 text-blue-600 mx-auto" />
            </div>
            
            <h2 className="text-6xl font-bold mb-6 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Secure File Sharing
              <br />
              Made Simple
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Upload, share, and manage your files with advanced analytics.
              Files are public by default - perfect for easy sharing!
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <Button 
                onClick={handleGetStarted}
                size="lg" 
                className="gap-2 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Upload className="h-5 w-5" />
                {status === "loading" ? "Loading..." : session ? "Go to Dashboard" : "Get Started Free"}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="gap-2 px-8 py-6 text-lg rounded-full hover:scale-105 transition-all duration-300"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Eye className="h-5 w-5" />
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <h2 className="text-4xl font-bold text-center mb-4">Why Choose Cloud Share?</h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Everything you need for seamless file sharing
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up animation-delay-100">
              <div className="w-16 h-16 bg-linear-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Upload and share files instantly with optimized CDN performance
              </p>
            </div>

            <div className="group text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up animation-delay-200">
              <div className="w-16 h-16 bg-linear-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Lock className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Flexible Privacy</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Files are public by default. Toggle to private with one click when needed.
              </p>
            </div>

            <div className="group text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up animation-delay-300">
              <div className="w-16 h-16 bg-linear-to-br from-pink-100 to-pink-200 dark:from-pink-900 dark:to-pink-800 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="h-8 w-8 text-pink-600 dark:text-pink-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Analytics Dashboard</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Track downloads, visitors, and engagement with detailed insights
              </p>
            </div>

            <div className="group text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up animation-delay-400">
              <div className="w-16 h-16 bg-linear-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Storage</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your files are encrypted and stored securely with industry standards
              </p>
            </div>

            <div className="group text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up animation-delay-500">
              <div className="w-16 h-16 bg-linear-to-br from-orange-100 to-orange-200 dark:from-orange-900 dark:to-orange-800 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Share2 className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Sharing</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Generate unique links and share with anyone via email or social media
              </p>
            </div>

            <div className="group text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up animation-delay-600">
              <div className="w-16 h-16 bg-linear-to-br from-cyan-100 to-cyan-200 dark:from-cyan-900 dark:to-cyan-800 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Collaboration Ready</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Share files with teams and track who&apos;s accessing your content
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-linear-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl my-12">
          <h2 className="text-4xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Three simple steps to start sharing
          </p>
          
          <div className="grid md:grid-cols-3 gap-12 px-8">
            <div className="text-center animate-fade-in-up animation-delay-100">
              <div className="w-20 h-20 bg-linear-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-xl">1</div>
              <h3 className="text-xl font-semibold mb-3">Sign In</h3>
              <p className="text-gray-600 dark:text-gray-300">Create a free account using Google or GitHub in seconds</p>
            </div>
            
            <div className="text-center animate-fade-in-up animation-delay-200">
              <div className="w-20 h-20 bg-linear-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-xl">2</div>
              <h3 className="text-xl font-semibold mb-3">Upload Files</h3>
              <p className="text-gray-600 dark:text-gray-300">Drag and drop your files or click to browse and upload instantly</p>
            </div>
            
            <div className="text-center animate-fade-in-up animation-delay-300">
              <div className="w-20 h-20 bg-linear-to-br from-pink-600 to-orange-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-xl">3</div>
              <h3 className="text-xl font-semibold mb-3">Share Instantly</h3>
              <p className="text-gray-600 dark:text-gray-300">Copy the link and share with anyone, anywhere in the world</p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in-up animation-delay-100">
              <div className="text-5xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">100%</div>
              <div className="text-gray-600 dark:text-gray-300">Free Forever</div>
            </div>
            <div className="animate-fade-in-up animation-delay-200">
              <div className="text-5xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">16MB</div>
              <div className="text-gray-600 dark:text-gray-300">Max File Size</div>
            </div>
            <div className="animate-fade-in-up animation-delay-300">
              <div className="text-5xl font-bold bg-linear-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent mb-2">∞</div>
              <div className="text-gray-600 dark:text-gray-300">File Shares</div>
            </div>
            <div className="animate-fade-in-up animation-delay-400">
              <div className="text-5xl font-bold bg-linear-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">24/7</div>
              <div className="text-gray-600 dark:text-gray-300">Availability</div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 text-center">
          <div className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white shadow-2xl animate-fade-in-up">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Sharing?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of users who trust Cloud Share for their file sharing needs
            </p>
            <Button 
              onClick={handleGetStarted}
              size="lg" 
              className="gap-2 bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Share2 className="h-5 w-5" />
              {session ? "Open Dashboard" : "Get Started Free"}
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 mt-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Cloud className="h-6 w-6 text-blue-600" />
              <span className="font-semibold">Cloud Share</span>
            </div>
            <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-400">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span>Secure & Encrypted</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © 2025 Cloud Share. Built with Next.js, MongoDB, and UploadThing.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
