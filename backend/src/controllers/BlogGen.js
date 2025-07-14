import blog from "../models/BlogSchema.js";
import groq from "../config/Ai.js"; // Ensure this is correctly configured for Groq
import user from "../models/UsersSchema.js";

const generateBlog = async (req, res) => {
  try {
    const { title, length, tone, keywords } = req.body; // Updated parameters to match frontend
    const userID = req.userId; // Extracted from authentication middleware

    // Check if title is provided
    if (!title) {
      return res.status(400).json({ error: "Blog title is required" });
    }

    // Generate prompt for AI model
    let prompt = `Write a ${tone || "informative"} blog post about "${title}". The blog should be approximately ${length || 500} words in length.`;
    
    // Add keywords to prompt if provided
    if (keywords && keywords.trim()) {
      prompt += ` Include these keywords: ${keywords}.`;
    }

    console.log("Sending prompt to Groq:", prompt);

    // Generate blog content using AI
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-70b-8192", // Updated to use a currently supported model
      temperature: 0.7,
      max_tokens: 2048,
      top_p: 1,
      stream: false, // Changed to false for simpler handling
    });

    // Get the blog content from the response
    const blogContent = chatCompletion.choices[0]?.message?.content || "Failed to generate content";

    // Save the generated blog to the database
    const newBlog = new blog({
      title: title,
      content: blogContent,
      author: userID, // Assign the user ID as the author
    });
    await newBlog.save();

    // Update the user's blogs array with the new blog ID
    await user.findByIdAndUpdate(userID, { $push: { blogs: newBlog._id } });

    // Return the generated blog content
    return res.status(200).json({
      success: true,
      content: blogContent,
      blogId: newBlog._id
    });
  } catch (error) {
    console.error("Error generating blog:", error);
    return res.status(500).json({ 
      error: "Failed to generate blog content",
      details: error.message 
    });
  }
};

export default generateBlog;
