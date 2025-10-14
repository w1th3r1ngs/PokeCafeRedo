import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Menu Categories
export const categories = pgTable("categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  nameDE: text("name_de").notNull(),
  order: integer("order").notNull().default(0),
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
});

export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;

// Menu Items
export const menuItems = pgTable("menu_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  nameDE: text("name_de").notNull(),
  description: text("description").notNull(),
  descriptionDE: text("description_de").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  priceSmall: decimal("price_small", { precision: 10, scale: 2 }),
  priceLarge: decimal("price_large", { precision: 10, scale: 2 }),
  image: text("image").notNull(),
  categoryId: varchar("category_id").notNull().references(() => categories.id),
  available: integer("available").notNull().default(1), // 1 = available, 0 = not available
  popular: integer("popular").notNull().default(0), // 1 = popular item
  protein: text("protein"),
  marinade: text("marinade"),
  ingredients: text("ingredients").array(),
  sauce: text("sauce"),
  toppings: text("toppings").array(),
  allergens: text("allergens").array(),
  hasSizeOptions: integer("has_size_options").notNull().default(0), // 1 = has size options
});

export const insertMenuItemSchema = createInsertSchema(menuItems).omit({
  id: true,
});

export type MenuItem = typeof menuItems.$inferSelect;
export type InsertMenuItem = z.infer<typeof insertMenuItemSchema>;

// Cart Items (client-side only, stored in memory)
export const cartItemSchema = z.object({
  id: z.string(),
  menuItemId: z.string(),
  name: z.string(),
  nameDE: z.string(),
  price: z.string(),
  image: z.string(),
  quantity: z.number().int().positive(),
  size: z.enum(["klein", "standard"]).optional(),
});

export type CartItem = z.infer<typeof cartItemSchema>;

// Cart
export const cartSchema = z.object({
  items: z.array(cartItemSchema),
  total: z.string(),
});

export type Cart = z.infer<typeof cartSchema>;
