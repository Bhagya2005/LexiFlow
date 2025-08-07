import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import AuthLayout from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const AboutDeveloperPage = () => {
  return (
    <AuthLayout>
      {/* Video Background */}
      <div className="relative">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="fixed top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="https://cdn.pixabay.com/video/2023/07/08/170655-843752693_tiny.mp4" type="video/mp4" />
        </video>

        {/* Overlay for better readability */}
        <div className="fixed  left-0 w-full h-full bg-black/50 z-10" />

        {/* Main Content */}
        <div className="relative mt-20 z-20 container py-12 text-white">
          <div className="mb-8 text-center animate-fade-in">
            <h1 className="text-4xl font-bold tracking-tight">About the Developer</h1>
            <p className="mt-4 text-xl text-gray-300">
              Meet the person behind LexiFlow
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            {/* Profile Card */}
            <Card className="md:col-span-1 bg-white/10 backdrop-blur-md border-none text-white hover:shadow-lg transition-all duration-300 animate-scale-in">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 aspect-square w-32 overflow-hidden rounded-full hover:scale-105 transition-transform">
                  <img
                    src="/a.jpg"
                    alt="Developer"
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardTitle>Bhagya Patel</CardTitle>
                <CardDescription className="text-gray-300">AI & MERN Stack Developer</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2 text-center">
                <p className="text-sm text-gray-300">
                  Building the future of content creation with AI
                </p>
                <div className="mt-4 flex justify-center gap-3">
                <Button size="icon" variant="outline" className="hover:scale-110 transition-transform" asChild>
  <a href="https://www.linkedin.com/in/bhagyapatel/" target="_blank" rel="noopener noreferrer">
    <Linkedin className="h-4 w-4 text-black" />
  </a>
</Button>

                </div>
              </CardContent>
              <CardFooter className="justify-center">
                <Button variant="outline" asChild className="text-black">
                  <a href="mailto:bhagya20052904@gmail.com">
                    <Mail className="mr-2 h-4 w-4" />
                    Contact Me
                  </a>
                </Button>
              </CardFooter>
            </Card>

            {/* Bio Card */}
            <Card className="md:col-span-2 bg-white/10 backdrop-blur-md border-none text-white animate-fade-in hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle>Biography</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-200">
                <p>
                  Hello, I'm Bhagya Patel, a passionate developer with expertise in AI and full-stack development. 
                  I created LexiFlow to help content creators leverage the power of artificial intelligence 
                  to generate high-quality email and blog content quickly and efficiently.
                </p>
                <p>
             A dedicated Computer Science Engineering student with strong command over programming languages like Java and Python. Proficient in MERN stack, with hands-on experience in full-stack web development using frameworks like Next.js and AngularJS. Actively exploring emerging fields such as Machine Learning, Deep Learning, Natural Language Processing (NLP), Large Language Models (LLMs), LangChain, and Computer Vision. Passionate about building innovative solutions by integrating AI technologies.
                </p>

                <Separator className="my-4 bg-gray-500" />

         


                <div>
       
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default AboutDeveloperPage;
