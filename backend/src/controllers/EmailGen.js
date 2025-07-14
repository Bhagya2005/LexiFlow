import emailModel from "../models/EmailSchema.js";
import groq from "../config/Ai.js";
import user from "../models/UsersSchema.js";

const generateEmail = async (req, res) => {
  try {
    const { subject, length, tone, context } = req.body;
    const userID = req.userId;

    if (!subject) {
      return res.status(400).json({ error: "Email subject is required" });
    }

    // Create dynamic prompt for email
    let prompt = `Write a ${tone || "formal"} email with the subject "${subject}". It should be around ${length || 150} words.`;

    if (context && context.trim()) {
      prompt += ` The email should consider the following context: ${context}.`;
    }

    console.log("Prompt sent to Groq:", prompt);

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama3-70b-8192",
      temperature: 0.7,
      max_tokens: 2048,
      top_p: 1,
      stream: false,
    });

    const emailContent = chatCompletion.choices[0]?.message?.content || "Failed to generate email content";

    const newEmail = new emailModel({
      subject,
      content: emailContent,
      author: userID,
    });
    await newEmail.save();

    await user.findByIdAndUpdate(userID, { $push: { emails: newEmail._id } });

    return res.status(200).json({
      success: true,
      content: emailContent,
      emailId: newEmail._id,
    });
  } catch (error) {
    console.error("Error generating email:", error);
    return res.status(500).json({ 
      error: "Failed to generate email",
      details: error.message 
    });
  }
};

export default generateEmail;
