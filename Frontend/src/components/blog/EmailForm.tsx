import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sparkles, Copy, Check } from "lucide-react";
import { emailAPI } from "@/lib/api";

const EmailForm = () => {
  const [subject, setSubject] = useState("");
  const [tone, setTone] = useState("formal");
  const [length, setLength] = useState(150);
  const [context, setContext] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const generateEmail = async () => {
    if (!subject) {
      toast({
        title: "Subject required",
        description: "Please provide a subject for the email",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedEmail("");

    try {
      const response = await emailAPI.generateEmail(subject, tone, length, context);
      setGeneratedEmail(response.content);

      const history = JSON.parse(localStorage.getItem("emailHistory") || "[]");
      const newEmail = {
        id: Date.now(),
        subject,
        tone,
        length,
        context: context || "None",
        content: response.content,
        date: new Date().toISOString(),
      };
      localStorage.setItem("emailHistory", JSON.stringify([newEmail, ...history]));

      toast({
        title: "Email generated",
        description: "Your email has been generated successfully",
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
    navigator.clipboard.writeText(generatedEmail);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "Email content has been copied to your clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg text-white">
      <CardHeader>
        <CardTitle className="text-2xl">Generate Email</CardTitle>
        <CardDescription className="text-gray-300">
          Fill in the details below to generate your email content
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="subject" className="text-white">Email Subject</Label>
          <Input
            id="subject"
            className="bg-white/10 border-white/30 text-white placeholder:text-gray-300"
            placeholder="Enter your email subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tone" className="text-white">Tone</Label>
          <Select value={tone} onValueChange={setTone}>
            <SelectTrigger className="bg-white/10 border-white/30 text-white">
              <SelectValue placeholder="Select a tone" />
            </SelectTrigger>
            <SelectContent className="bg-black/80 text-white">
              <SelectItem value="formal">Formal</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="friendly">Friendly</SelectItem>
              <SelectItem value="persuasive">Persuasive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-white">Email Length (words)</Label>
          <Slider
            value={[length]}
            onValueChange={(value) => setLength(value[0])}
            min={50}
            max={1000}
            step={50}
          />
          <p className="text-sm text-gray-300">{length} words</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="context" className="text-white">Recipient Context (optional)</Label>
          <Input
            id="context"
            className="bg-white/10 border-white/30 text-white placeholder:text-gray-300"
            placeholder="E.g. cold email, job application"
            value={context}
            onChange={(e) => setContext(e.target.value)}
          />
        </div>
        <Button
          onClick={generateEmail}
          className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:brightness-110 text-white font-semibold"
          disabled={isGenerating}
        >
          {isGenerating ? (
            "Generating..."
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Email
            </>
          )}
        </Button>
      </CardContent>

      {generatedEmail && (
        <CardFooter className="flex flex-col space-y-4">
          <div className="w-full space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-white">Generated Email</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="text-black border-white/30 "
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            <div
              className="prose prose-sm max-w-none text-white p-4 border border-white/20 rounded-md min-h-[200px] overflow-auto"
              dangerouslySetInnerHTML={{ __html: generatedEmail.replace(/\n/g, "<br />") }}
            />
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default EmailForm;
