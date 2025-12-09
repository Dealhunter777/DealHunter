import { pgTable, text, varchar, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const categories = pgTable("categories", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  icon: text("icon").notNull(),
  description: text("description"),
  productCount: integer("product_count").default(0),
});

export const products = pgTable("products", {
  id: varchar("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  shortDescription: text("short_description"),
  features: text("features").array(),
  originalPrice: integer("original_price").notNull(),
  salePrice: integer("sale_price").notNull(),
  discountPercent: integer("discount_percent").notNull(),
  imageUrl: text("image_url").notNull(),
  affiliateLink: text("affiliate_link").notNull(),
  categoryId: varchar("category_id").notNull(),
  partner: text("partner").notNull(),
  badge: text("badge"),
  stock: integer("stock"),
  isFeatured: boolean("is_featured").default(false),
  isDealOfDay: boolean("is_deal_of_day").default(false),
  isTrending: boolean("is_trending").default(false),
  dealEndsAt: timestamp("deal_ends_at"),
  viewCount: integer("view_count").default(0),
});

export const insertCategorySchema = createInsertSchema(categories).omit({ id: true });
export const insertProductSchema = createInsertSchema(products).omit({ id: true });

export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export const users = pgTable("users", {
  id: varchar("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
