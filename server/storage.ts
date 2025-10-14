import { 
  type Category, 
  type InsertCategory, 
  type MenuItem, 
  type InsertMenuItem 
} from "@shared/schema";
import { randomUUID } from "crypto";

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

  // Initialize with sample data
  private initializeData() {
    // Create Categories
    const bowlsCat = this.createCategorySync({
      name: "Poke Bowls",
      nameDE: "Poke Bowls",
      order: 1,
    });

    const baoCat = this.createCategorySync({
      name: "Bao Buns",
      nameDE: "Bao Buns",
      order: 2,
    });

    const drinksCat = this.createCategorySync({
      name: "Drinks",
      nameDE: "Getränke",
      order: 3,
    });

    const sidesCat = this.createCategorySync({
      name: "Sides",
      nameDE: "Beilagen",
      order: 4,
    });

    // Create Poke Bowls
    this.createMenuItemSync({
      name: "Classic Salmon Bowl",
      nameDE: "Klassische Lachs Bowl",
      description: "Fresh salmon, avocado, edamame, cucumber, sesame, soy sauce",
      descriptionDE: "Frischer Lachs, Avocado, Edamame, Gurke, Sesam, Sojasauce",
      price: "12.90",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop",
      categoryId: bowlsCat.id,
      available: 1,
      popular: 1,
    });

    this.createMenuItemSync({
      name: "Spicy Tuna Bowl",
      nameDE: "Scharfe Thunfisch Bowl",
      description: "Spicy tuna, kimchi, jalapeño, spring onion, spicy mayo, crispy onions",
      descriptionDE: "Scharfer Thunfisch, Kimchi, Jalapeño, Frühlingszwiebel, scharfe Mayo, knusprige Zwiebeln",
      price: "13.50",
      image: "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=800&h=600&fit=crop",
      categoryId: bowlsCat.id,
      available: 1,
      popular: 1,
    });

    this.createMenuItemSync({
      name: "Vegetarian Rainbow Bowl",
      nameDE: "Vegetarische Rainbow Bowl",
      description: "Tofu, carrot, red cabbage, avocado, corn, sesame dressing",
      descriptionDE: "Tofu, Karotte, Rotkohl, Avocado, Mais, Sesam-Dressing",
      price: "11.90",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop",
      categoryId: bowlsCat.id,
      available: 1,
      popular: 0,
    });

    this.createMenuItemSync({
      name: "Chicken Teriyaki Bowl",
      nameDE: "Hähnchen Teriyaki Bowl",
      description: "Grilled chicken, pineapple, edamame, teriyaki sauce, sesame",
      descriptionDE: "Gegrilltes Hähnchen, Ananas, Edamame, Teriyaki-Sauce, Sesam",
      price: "12.50",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
      categoryId: bowlsCat.id,
      available: 1,
      popular: 0,
    });

    this.createMenuItemSync({
      name: "Shrimp Paradise Bowl",
      nameDE: "Garnelen Paradise Bowl",
      description: "Marinated shrimp, mango, avocado, cucumber, sweet chili sauce",
      descriptionDE: "Marinierte Garnelen, Mango, Avocado, Gurke, Sweet-Chili-Sauce",
      price: "14.90",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop",
      categoryId: bowlsCat.id,
      available: 1,
      popular: 0,
    });

    this.createMenuItemSync({
      name: "Build Your Own Bowl",
      nameDE: "Deine eigene Bowl",
      description: "Choose your base, protein, toppings, and dressing",
      descriptionDE: "Wähle deine Basis, Protein, Toppings und Dressing",
      price: "9.50",
      image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&h=600&fit=crop",
      categoryId: bowlsCat.id,
      available: 1,
      popular: 0,
    });

    // Create Bao Buns
    this.createMenuItemSync({
      name: "Crispy Chicken Bao",
      nameDE: "Knuspriges Hähnchen Bao",
      description: "Crispy chicken, coleslaw, sriracha mayo, cucumber",
      descriptionDE: "Knuspriges Hähnchen, Krautsalat, Sriracha-Mayo, Gurke",
      price: "5.90",
      image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&h=600&fit=crop",
      categoryId: baoCat.id,
      available: 1,
      popular: 1,
    });

    this.createMenuItemSync({
      name: "Pulled Pork Bao",
      nameDE: "Pulled Pork Bao",
      description: "Slow-cooked pork, hoisin sauce, pickled vegetables, cilantro",
      descriptionDE: "Langsam gegartes Schweinefleisch, Hoisin-Sauce, eingelegtes Gemüse, Koriander",
      price: "6.50",
      image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800&h=600&fit=crop",
      categoryId: baoCat.id,
      available: 1,
      popular: 0,
    });

    this.createMenuItemSync({
      name: "Tofu Teriyaki Bao",
      nameDE: "Tofu Teriyaki Bao",
      description: "Marinated tofu, teriyaki glaze, sesame, spring onion",
      descriptionDE: "Marinierter Tofu, Teriyaki-Glasur, Sesam, Frühlingszwiebel",
      price: "5.50",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
      categoryId: baoCat.id,
      available: 1,
      popular: 0,
    });

    // Create Drinks
    this.createMenuItemSync({
      name: "Homemade Lemonade",
      nameDE: "Hausgemachte Limonade",
      description: "Fresh lemon, mint, sparkling water",
      descriptionDE: "Frische Zitrone, Minze, Sprudelwasser",
      price: "3.90",
      image: "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9d?w=800&h=600&fit=crop",
      categoryId: drinksCat.id,
      available: 1,
      popular: 0,
    });

    this.createMenuItemSync({
      name: "Mango Smoothie",
      nameDE: "Mango Smoothie",
      description: "Fresh mango, coconut milk, ice",
      descriptionDE: "Frische Mango, Kokosmilch, Eis",
      price: "4.50",
      image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=800&h=600&fit=crop",
      categoryId: drinksCat.id,
      available: 1,
      popular: 1,
    });

    this.createMenuItemSync({
      name: "Green Tea",
      nameDE: "Grüner Tee",
      description: "Premium Japanese green tea",
      descriptionDE: "Premium japanischer grüner Tee",
      price: "2.90",
      image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&h=600&fit=crop",
      categoryId: drinksCat.id,
      available: 1,
      popular: 0,
    });

    // Create Sides
    this.createMenuItemSync({
      name: "Edamame",
      nameDE: "Edamame",
      description: "Steamed soybeans with sea salt",
      descriptionDE: "Gedämpfte Sojabohnen mit Meersalz",
      price: "3.50",
      image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800&h=600&fit=crop",
      categoryId: sidesCat.id,
      available: 1,
      popular: 0,
    });

    this.createMenuItemSync({
      name: "Wakame Salad",
      nameDE: "Wakame Salat",
      description: "Seaweed salad with sesame dressing",
      descriptionDE: "Seetang-Salat mit Sesam-Dressing",
      price: "4.90",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop",
      categoryId: sidesCat.id,
      available: 1,
      popular: 0,
    });

    this.createMenuItemSync({
      name: "Miso Soup",
      nameDE: "Miso Suppe",
      description: "Traditional miso soup with tofu and seaweed",
      descriptionDE: "Traditionelle Miso-Suppe mit Tofu und Seetang",
      price: "3.90",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&h=600&fit=crop",
      categoryId: sidesCat.id,
      available: 1,
      popular: 0,
    });
  }

  // Sync version for initialization
  private createCategorySync(category: InsertCategory): Category {
    const id = randomUUID();
    const cat: Category = { ...category, id };
    this.categories.set(id, cat);
    return cat;
  }

  private createMenuItemSync(menuItem: InsertMenuItem): MenuItem {
    const id = randomUUID();
    const item: MenuItem = { ...menuItem, id };
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
    const cat: Category = { ...category, id };
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
    const item: MenuItem = { ...menuItem, id };
    this.menuItems.set(id, item);
    return item;
  }
}

export const storage = new MemStorage();
