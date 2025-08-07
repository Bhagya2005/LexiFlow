import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "@/components/layout/AuthLayout";
import BlogForm from "@/components/blog/BlogForm";
import EmailForm from "@/components/blog/EmailForm";
import { Sparkles, PenLine, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"email" | "blog">("email");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) navigate("/login");
  }, [navigate]);

  return (
    <AuthLayout requireAuth>
      {/* 🔁 Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://cdn.pixabay.com/video/2023/07/08/170655-843752693_tiny.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* 🌫 Overlay */}
      <div className="fixed inset-0 bg-black/60 z-10" />

      {/* ⚙️ Foreground Content */}
      <div className="relative mt-20 z-20 min-h-screen flex flex-col md:flex-row items-center justify-center p-6">
        {/* Left Illustration & Info */}
        <motion.div
          className="md:w-1/2 text-center md:text-left mb-10 md:mb-0 space-y-6 text-white"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold flex items-center justify-center gap-3">
            <Sparkles className="text-yellow-400 h-8 w-8 animate-pulse" />
            Generate Smarter ✨
          </h1>
          <p className="text-lg max-w-md mx-auto items-center justify-center text-white/80">
            AI-powered blog & email generator to boost your content game. Generate in one click, copy, done.
          </p>
        </motion.div>

        {/* Right Interactive Panel */}
        <motion.div
          className="md:w-1/2 w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-6 md:p-10 max-w-xl mx-auto space-y-6"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Tab Buttons */}
          <div className="flex justify-center md:justify-start gap-4 mb-4">
            <Button
              variant={activeTab === "blog" ? "default" : "outline"}
              onClick={() => setActiveTab("blog")}
              className="flex gap-2 items-center"
            >
              <Mail className="w-4 h-4" /> Blog
            </Button>
            <Button
              variant={activeTab === "email" ? "default" : "outline"}
              onClick={() => setActiveTab("email")}
              className="flex gap-2 items-center"
            >
              <PenLine className="w-4 h-4" /> Email
            </Button>
          </div>

          {/* Form Section */}
          <div className="overflow-y-auto max-h-[600px] custom-scrollbar pr-1">
            {activeTab === "email" ? <EmailForm /> : <BlogForm />}
          </div>
        </motion.div>
      </div>
    </AuthLayout>
  );
};

export default DashboardPage;
