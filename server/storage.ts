import { 
  type Category, 
  type InsertCategory, 
  type MenuItem, 
  type InsertMenuItem 
} from "@shared/schema";
import { randomUUID } from "crypto";
import { categories as seedCategories, createMenuItems } from "./data/menu";

export interface IStorage {
  // Categories
  getAllCategories(): Promise<Category[]>;
  getCategoryById(id: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Menu Items
  getAllMenuItems(): Promise<MenuItem[]>;
  getMenuItemById(id: string): Promise<MenuItem | undefined>;
  getMenuItemsByCategory(categoryId: string): Promise<MenuItem[]>;
  createMenuItem(menuItem: InsertMenuItem): Promise<MenuItem>;
}

export class MemStorage implements IStorage {
  private categories: Map<string, Category>;
  private menuItems: Map<string, MenuItem>;

  constructor() {
    this.categories = new Map();
    this.menuItems = new Map();
    this.initializeData();
  }

  // Initialize with PokePao menu data
  private initializeData() {
    // Create all categories
    const createdCategories = seedCategories.map(cat => this.createCategorySync(cat));
    
    // Map category names to IDs
    const categoryIds = {
      bowls: createdCategories[0].id,
      wraps: createdCategories[1].id,
      appetizers: createdCategories[2].id,
      desserts: createdCategories[3].id,
      drinks: createdCategories[4].id,
    };

    // Create all menu items
    const menuItemsData = createMenuItems(categoryIds);
    menuItemsData.forEach(item => this.createMenuItemSync(item));
  }


  // Sync version for initialization
  private createCategorySync(category: InsertCategory): Category {
    const id = randomUUID();
    const cat: Category = { 
      ...category, 
      id,
      order: category.order ?? 0,
    };
    this.categories.set(id, cat);
    return cat;
  }

  private createMenuItemSync(menuItem: InsertMenuItem): MenuItem {
    const id = randomUUID();
    const item: MenuItem = { 
      ...menuItem, 
      id,
      available: menuItem.available ?? 1,
      popular: menuItem.popular ?? 0,
      priceSmall: menuItem.priceSmall ?? null,
      priceLarge: menuItem.priceLarge ?? null,
      protein: menuItem.protein ?? null,
      marinade: menuItem.marinade ?? null,
      ingredients: menuItem.ingredients ?? null,
      sauce: menuItem.sauce ?? null,
      toppings: menuItem.toppings ?? null,
      allergens: menuItem.allergens ?? null,
      hasSizeOptions: menuItem.hasSizeOptions ?? 0,
    };
    this.menuItems.set(id, item);
    return item;
  }

  // Categories
  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values()).sort((a, b) => a.order - b.order);
  }

  async getCategoryById(id: string): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const id = randomUUID();
    const cat: Category = { 
      ...category, 
      id,
      order: category.order ?? 0,
    };
    this.categories.set(id, cat);
    return cat;
  }

  // Menu Items
  async getAllMenuItems(): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values());
  }

  async getMenuItemById(id: string): Promise<MenuItem | undefined> {
    return this.menuItems.get(id);
  }

  async getMenuItemsByCategory(categoryId: string): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values()).filter(
      (item) => item.categoryId === categoryId
    );
  }

  async createMenuItem(menuItem: InsertMenuItem): Promise<MenuItem> {
    const id = randomUUID();
    const item: MenuItem = { 
      ...menuItem, 
      id,
      available: menuItem.available ?? 1,
      popular: menuItem.popular ?? 0,
      priceSmall: menuItem.priceSmall ?? null,
      priceLarge: menuItem.priceLarge ?? null,
      protein: menuItem.protein ?? null,
      marinade: menuItem.marinade ?? null,
      ingredients: menuItem.ingredients ?? null,
      sauce: menuItem.sauce ?? null,
      toppings: menuItem.toppings ?? null,
      allergens: menuItem.allergens ?? null,
      hasSizeOptions: menuItem.hasSizeOptions ?? 0,
    };
    this.menuItems.set(id, item);
    return item;
  }
}

export const storage = new MemStorage();
