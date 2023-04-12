import Replicate from "replicate";

// Set your Replicate API key as a Secret
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export default async function(req, res) {

  const output = await replicate.run("cjwbw/damo-text-to-video:1e205ea73084bd17a0a3b43396e49ba0d6bc2e754e9283b2df49fad2dcf95755",
    {
      input: {
        prompt: req.body.prompt
      }
    }
  );
  res.status(200).json(output);

}

