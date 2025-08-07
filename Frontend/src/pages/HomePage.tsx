
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <div className="relative overflow-hidden text-white">
      {/* 🔁 Background Video (stays fixed) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="https://cdn.pixabay.com/video/2023/07/08/170655-843752693_tiny.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 🌓 Overlay to darken video */}
      <div className="fixed inset-0 bg-black/60 z-10" />

      {/* 🌐 Content Wrapper */}
      <div className="relative z-20 space-y-32">

        {/* 🔥 Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
          <h1 className="text-xl md:text-6xl font-bold mb-4">AI Blog & Email Generator [2.90 Second]</h1>
          <p className="max-w-xl text-lg md:text-2xl text-white/80 mb-6">
            Instantly create high-quality content with the power of AI.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 text-lg rounded-xl animate-bounce"
            >
              <a href="/signup">Sign Up</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-black px-6 py-4 text-lg rounded-xl"
            >
              <a href="#features">
                Learn More
                <ChevronRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </section>

        {/* 💡 Features Section */}
        <section id="features" className="py-20 px-6 max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Features</h2>
          <div className="grid md:grid-cols-3 gap-8 text-white/90">
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-md shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Generate Blogs</h3>
              <p>Input title, tone, and keywords to get full blog posts instantly.</p>
            </div>
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-md shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Write Emails</h3>
              <p>Craft cold emails, replies, and formal messages in seconds.</p>
            </div>
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-md shadow-lg">
              <h3 className="text-xl font-semibold mb-2">History Access</h3>
              <p>Every content piece you generate is saved for easy reuse.</p>
            </div>
          </div>
        </section>

        {/* 🧑‍💻 About Developer Section */}
        <section id="about" className="py-20 px-6 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">About the Developer</h2>
          <p className="text-white/80 text-lg">
            I'm <strong>Bhagya Nitinkumar Patel</strong>, a 3rd-year Computer Science Engineering student passionate about building smart, intuitive tools powered by AI. This project combines my love for clean UI and useful automation.
          </p>
        </section>

     
      </div>
    </div>
  );
};

export default HomePage;
