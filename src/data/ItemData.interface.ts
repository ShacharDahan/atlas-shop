import z from "zod";

const itemData = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  image: z.string(),
  category: z.string(),
});

export type ItemData = z.infer<typeof itemData>;
