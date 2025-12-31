import z from "zod";
import ShopItems from "./ShopItems.json"
import { itemDataSchema } from "./ItemData.interface";

export const SHOP_ITEMS = z.array(itemDataSchema).parse(ShopItems);