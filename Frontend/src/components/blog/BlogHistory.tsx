import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { History, Search, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface BlogEntry {
  id: number;
  title: string;
  tone: string;
  length: number;
  keywords: string;
  content: string;
  date: string;
}

const BlogHistory = () => {
  const [blogHistory, setBlogHistory] = useState<BlogEntry[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<BlogEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("blogHistory") || "[]");
    setBlogHistory(history);
    setFilteredHistory(history);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = blogHistory.filter((blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.keywords.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredHistory(filtered);
    } else {
      setFilteredHistory(blogHistory);
    }
  }, [searchTerm, blogHistory]);

  const handleDeleteBlog = (id: number) => {
    const updatedHistory = blogHistory.filter((blog) => blog.id !== id);
    setBlogHistory(updatedHistory);
    setFilteredHistory(updatedHistory);
    localStorage.setItem("blogHistory", JSON.stringify(updatedHistory));
    toast({
      title: "Blog deleted",
      description: "Blog post has been deleted from your history",
    });
  };

  const handleClearHistory = () => {
    setBlogHistory([]);
    setFilteredHistory([]);
    localStorage.setItem("blogHistory", JSON.stringify([]));
    toast({
      title: "History cleared",
      description: "All blog posts have been cleared from your history",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Function to convert markdown-style bold text to HTML
  const formatBlogContent = (content: string) => {
    // Replace markdown-style bold (**text**) with HTML bold
    let formattedContent = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Replace markdown-style headings with HTML headings
    formattedContent = formattedContent.replace(/^# (.*$)/gm, '<h1>$1</h1>');
    formattedContent = formattedContent.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    formattedContent = formattedContent.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    
    // Replace line breaks with <br> tags
    formattedContent = formattedContent.replace(/\n/g, '<br>');
    
    return formattedContent;
  };

return (
  <div className="relative z-20 text-white">
    {/* Optional: Add background video (optional) */}
    <video
      autoPlay
      muted
      loop
      playsInline
      className="fixed top-0 left-0 w-full h-full object-cover z-0"
    >
      <source src="https://cdn.pixabay.com/video/2023/07/08/170655-843752693_tiny.mp4" type="video/mp4" />
    </video>
    <div className="fixed top-0 left-0 w-full h-full bg-black/60 z-10" />

    {/* Main Content */}
    <div className="relative z-20 mt-20 bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2 text-white">
          <History className="h-6 w-6 text-primary" /> Blog History
        </h2>
        <p className="text-gray-300">
          View and manage your previously generated blog posts
        </p>
      </div>
      <div className="flex items-center gap-2 w-full md:w-auto">
        <div className="relative flex-1 md:flex-none md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search blogs..."
            className="pl-8 bg-white/10 text-white border-white/20 placeholder:text-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="icon">
              <Trash className="h-4 w-4" />
              <span className="sr-only">Clear history</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white/10 text-white border border-white/20 backdrop-blur-md">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription className="text-gray-300">
                This action will delete all blog posts from your history.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleClearHistory}>
                Clear All
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {filteredHistory.length === 0 ? (
        <Card className="border-dashed bg-white/5 text-white">
          <CardContent className="pt-6 text-center">
            <div className="flex flex-col items-center justify-center space-y-2">
              <History className="h-8 w-8 text-gray-400" />
              <h3 className="text-xl font-medium">No blog posts found</h3>
              <p className="text-gray-400">
                {searchTerm
                  ? "No blog posts match your search criteria."
                  : "You haven't generated any blog posts yet."}
              </p>
              {searchTerm ? (
                <Button
                  variant="outline"
                  onClick={() => setSearchTerm("")}
                  className="mt-4"
                >
                  Clear Search
                </Button>
              ) : (
                <Button
                  onClick={() => window.location.href = "/dashboard"}
                  className="mt-4"
                >
                  Generate Your First Blog
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {filteredHistory.map((blog) => (
            <Tabs key={blog.id} defaultValue="preview" className="w-full">
              <Card className="bg-white/5 text-white border-white/20">
                <CardHeader className="pb-3">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <CardTitle>{blog.title}</CardTitle>
                      <CardDescription className="text-gray-300">
                        Created on {formatDate(blog.date)}
                      </CardDescription>
                    </div>
                    <TabsList>
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                      <TabsTrigger value="details">Details</TabsTrigger>
                    </TabsList>
                  </div>
                </CardHeader>
                <CardContent>
                  <TabsContent value="preview" className="mt-0">
                    <div
                      className="prose prose-sm max-w-none text-white"
                      dangerouslySetInnerHTML={{ __html: formatBlogContent(blog.content) }}
                    />
                  </TabsContent>
                  <TabsContent value="details" className="mt-0">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label className="text-white">Tone</Label>
                        <div className="rounded-md border border-white/20 p-2 mt-1 capitalize text-white">
                          {blog.tone}
                        </div>
                      </div>
                      <div>
                        <Label className="text-white">Length</Label>
                        <div className="rounded-md border border-white/20 p-2 mt-1 text-white">
                          {blog.length} words
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <Label className="text-white">Keywords</Label>
                        <div className="rounded-md border border-white/20 p-2 mt-1 text-white">
                          {blog.keywords || "None"}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                  className="text-black"
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText(blog.content);
                      toast({
                        title: "Copied",
                        description: "Blog content copied to clipboard",
                      });
                    }}
                  >
                    Copy to Clipboard
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="icon">
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white/10 text-black border border-white/20 backdrop-blur-md">
                      <AlertDialogHeader>
                        <AlertDialogTitle className='text-white'>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-300">
                          This will delete this blog post. It cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteBlog(blog.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardFooter>
              </Card>
            </Tabs>
          ))}
        </div>
      )}
    </div>
  </div>
);

};

export default BlogHistory;
