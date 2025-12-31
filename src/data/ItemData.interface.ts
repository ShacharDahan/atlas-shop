import z from "zod";

export const itemDataSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  image: z.string(),
  category: z.string(),
});

export type ItemData = z.infer<typeof itemDataSchema>;
