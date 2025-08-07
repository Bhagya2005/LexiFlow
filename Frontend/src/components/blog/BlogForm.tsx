import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sparkles, Copy, Check } from "lucide-react";
import { blogAPI } from "@/lib/api";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [tone, setTone] = useState("informative");
  const [length, setLength] = useState(500);
  const [keywords, setKeywords] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedBlog, setGeneratedBlog] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const generateBlog = async () => {
    if (!title) {
      toast({
        title: "Title required",
        description: "Please provide a title for your blog post",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedBlog("");

    try {
      const response = await blogAPI.generateBlog(title, tone, length, keywords);
      setGeneratedBlog(response.content);

      const history = JSON.parse(localStorage.getItem("blogHistory") || "[]");
      const newBlog = {
        id: Date.now(),
        title,
        tone,
        length,
        keywords: keywords || "None",
        content: response.content,
        date: new Date().toISOString(),
      };
      localStorage.setItem("blogHistory", JSON.stringify([newBlog, ...history]));

      toast({
        title: "Blog generated",
        description: "Your blog post has been generated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Generation failed",
        description: error.response?.data?.error || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedBlog);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "Blog content has been copied to your clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const formatBlogContent = (content: string) => {
    let formattedContent = content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    formattedContent = formattedContent.replace(/^# (.*$)/gm, "<h1>$1</h1>");
    formattedContent = formattedContent.replace(/^## (.*$)/gm, "<h2>$1</h2>");
    formattedContent = formattedContent.replace(/^### (.*$)/gm, "<h3>$1</h3>");
    formattedContent = formattedContent.replace(/\n/g, "<br>");
    return formattedContent;
  };

  return (
    <Card className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg text-white">
      <CardHeader>
        <CardTitle className="text-2xl">Generate Blog Post</CardTitle>
        <CardDescription className="text-gray-300">
          Fill in the details below to generate your perfect blog post
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-white">Blog Title</Label>
          <Input
            id="title"
            className="bg-white/10 border-white/30 placeholder:text-gray-300 text-white"
            placeholder="Enter your blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tone" className="text-white">Writing Tone</Label>
          <Select value={tone} onValueChange={setTone}>
            <SelectTrigger className="bg-white/10 border-white/30 text-white">
              <SelectValue placeholder="Select a tone" />
            </SelectTrigger>
            <SelectContent className="bg-black/80 text-white">
              <SelectItem value="informative">Informative</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="friendly">Friendly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-white">Blog Length (words)</Label>
          <Slider
            value={[length]}
            onValueChange={(value) => setLength(value[0])}
            min={100}
            max={2000}
            step={100}
          />
          <p className="text-sm text-gray-300">{length} words</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="keywords" className="text-white">Keywords (optional)</Label>
          <Input
            id="keywords"
            className="bg-white/10 border-white/30 placeholder:text-gray-300 text-white"
            placeholder="Enter keywords separated by commas"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
        </div>
        <Button
          onClick={generateBlog}
          className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:brightness-110 text-white font-semibold"
          disabled={isGenerating}
        >
          {isGenerating ? (
            "Generating..."
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Blog
            </>
          )}
        </Button>
      </CardContent>

      {generatedBlog && (
        <CardFooter className="flex flex-col space-y-4">
          <div className="w-full space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-white">Generated Blog</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="flex items-center gap-1 text-black border-white/30"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy</span>
                  </>
                )}
              </Button>
            </div>
            <div
              className="prose prose-sm max-w-none p-4 border border-white/20 rounded-md min-h-[200px] overflow-auto text-white"
              dangerouslySetInnerHTML={{ __html: formatBlogContent(generatedBlog) }}
            />
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default BlogForm;
