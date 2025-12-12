import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function generateProjectDescription(
  title: string,
  briefDescription: string | undefined,
  imageBase64s: string[]
): Promise<string> {
  const content: any[] = [
    {
      type: "text",
      text: `You are a professional construction project description writer. 
          Based on the provided project title, brief description (if any), and images, 
          write a short paragraph about the project. Make it a marketable professional project description for a general contracting company's portfolio for this specfic 
          projects page.
          
          Project Title: ${title}
          ${briefDescription ? `Brief Description: ${briefDescription}` : ""}
          
          Please analyze the images and create a detailed description that includes:
          - The type of project/work shown
          - Key features and details visible in the images
          - Quality of workmanship
          - Highlight the unqique features that were added to the given project
          
          Make it professional, engaging, and suitable for a portfolio website. Ensure that it SEO and AEO friendly.`,
    },
  ];

  for (const base64Image of imageBase64s) {
    content.push({
      type: "image_url",
      image_url: {
        url: `data:image/jpeg;base64,${base64Image}`,
      },
    });
  }
  console.log("Sending response to AI 🤖")

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: content,
      },
    ],
    max_completion_tokens: 500,
  });
  console.log("🤖 Ai responded 🤖")
  return response.choices[0]?.message?.content || "No Description Generated";
}
