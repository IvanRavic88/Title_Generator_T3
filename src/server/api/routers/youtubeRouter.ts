import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { Configuration } from "openai";
import { OpenAIApi } from "openai/dist/api";

type VideoData = {
  title: string | null | undefined;
};

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const youtubeRouter = createTRPCRouter({
  youtube: publicProcedure
    .input(z.object({ topic: z.string(), alias: z.string() }))
    .mutation(async ({ input }) => {
      console.log(input);
      //open broswer
      //navigate to youtube channel
      //accept cookies
      //get all titiles with querySelectorAll
      //push all titles into array
      const videoData: VideoData[] = [];
      console.log(videoData);
      //close puppeteer browser

      const titles: VideoData[] = [];

      const prompt = `The following is a list of youtube video titles. After reading the titles, you are given a topic to then write a similar title for .\n\nTITLES:${titles
        .map((title) => title.title)
        .join("\n")}\n\nSIMILAR TITLE FOR TOPIC ${input.topic.toUpperCase()}`;

      const res = await openai.createCompletion({
        model: "text-davinvi-003",
        prompt,
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      return res.data.choices[0]?.text;
    }),
});
