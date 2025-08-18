//import OpenAI from "openai";
//// const client = new OpenAI();
////process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

//const client = new OpenAI({
// apiKey: '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', // This is the default and can be omitted
//});
//
//const response = await client.responses.create({
//    model: "gpt-4.1",
//    input: "Write a one-sentence bedtime story about a unicorn."
//});

//console.log(response.output_text);



import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyDQEqqlPOjnPXmIBrKk39H-0UQJhCBtVIc" });

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-001",
    contents: "Explain how AI works in a few words",
  });
  console.log(response.text);
}

await main();