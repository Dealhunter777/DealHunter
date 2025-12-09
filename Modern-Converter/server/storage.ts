import { type User, type InsertUser, type Product, type Category } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product | undefined>;
  getProductsByCategory(categoryId: string): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  getDealsOfDay(): Promise<Product[]>;
  getTrendingProducts(): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  
  getAllCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private products: Map<string, Product>;
  private categories: Map<string, Category>;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.categories = new Map();
    this.initializeData();
  }

  private initializeData() {
    const categoriesData: Category[] = [
      { id: "elektronik", name: "Elektronik", slug: "elektronik", icon: "Laptop", description: "Smartphones, Tablets, Computer und mehr", productCount: 3 },
      { id: "mode", name: "Mode & Fashion", slug: "mode", icon: "Shirt", description: "Kleidung, Schuhe und Accessoires", productCount: 3 },
      { id: "haushalt", name: "Haushalt & Garten", slug: "haushalt", icon: "Home", description: "Möbel, Dekoration und Gartengeräte", productCount: 3 },
      { id: "sport", name: "Sport & Fitness", slug: "sport", icon: "Dumbbell", description: "Sportausrüstung und Fitnessgeräte", productCount: 3 },
      { id: "beauty", name: "Beauty & Pflege", slug: "beauty", icon: "Sparkles", description: "Kosmetik, Hautpflege und Wellness", productCount: 3 },
      { id: "spielzeug", name: "Spielzeug & Gaming", slug: "spielzeug", icon: "Gamepad2", description: "Spielzeug, Videospiele und Konsolen", productCount: 3 },
      { id: "reisen", name: "Reisen & Erlebnisse", slug: "reisen", icon: "Plane", description: "Reiseangebote und Erlebnisgeschenke", productCount: 3 },
      { id: "digital", name: "Digital & Software", slug: "digital", icon: "Download", description: "Software, Kurse und digitale Produkte", productCount: 3 },
    ];

    categoriesData.forEach(cat => this.categories.set(cat.id, cat));

    const productsData: Product[] = [
      {
        id: "1",
        title: "Apple iPhone 15 Pro Max 256GB",
        description: "Das leistungsstärkste iPhone aller Zeiten mit dem revolutionären A17 Pro Chip, Titan-Design und fortschrittlichem Kamerasystem. Erleben Sie Gaming auf Konsolen-Niveau und professionelle Videoaufnahmen.",
        shortDescription: "Titan. A17 Pro. Action-Button.",
        features: ["A17 Pro Chip", "48MP Hauptkamera", "Titan-Gehäuse", "Action-Button", "USB-C"],
        originalPrice: 149900,
        salePrice: 129900,
        discountPercent: 13,
        imageUrl: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800",
        affiliateLink: "https://amazon.de/dp/example",
        categoryId: "elektronik",
        partner: "Amazon",
        badge: "Bestseller",
        stock: 15,
        isFeatured: true,
        isDealOfDay: true,
        isTrending: true,
        dealEndsAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        viewCount: 2547,
      },
      {
        id: "2",
        title: "Sony WH-1000XM5 Noise Cancelling Kopfhörer",
        description: "Branchenführende Noise Cancelling Kopfhörer mit 30 Stunden Akkulaufzeit und kristallklarem Sound. Der perfekte Begleiter für unterwegs.",
        shortDescription: "Premium ANC Kopfhörer",
        features: ["30h Akku", "Multipoint", "Schnellladung", "HD Audio", "Touch-Steuerung"],
        originalPrice: 39900,
        salePrice: 29900,
        discountPercent: 25,
        imageUrl: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800",
        affiliateLink: "https://amazon.de/dp/example2",
        categoryId: "elektronik",
        partner: "Amazon",
        badge: "Top-Bewertung",
        stock: 42,
        isFeatured: true,
        isDealOfDay: false,
        isTrending: true,
        dealEndsAt: null,
        viewCount: 1823,
      },
      {
        id: "3",
        title: "Samsung Galaxy Tab S9 Ultra",
        description: "Das ultimative Android-Tablet mit 14.6 Zoll Dynamic AMOLED 2X Display und S Pen. Perfekt für kreative Profis und Entertainment-Enthusiasten.",
        shortDescription: "14.6 Zoll Premium Tablet",
        features: ["14.6 Zoll Display", "S Pen inklusive", "Snapdragon 8 Gen 2", "12GB RAM", "IP68"],
        originalPrice: 119900,
        salePrice: 99900,
        discountPercent: 17,
        imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800",
        affiliateLink: "https://amazon.de/dp/example3",
        categoryId: "elektronik",
        partner: "Amazon",
        badge: null,
        stock: 28,
        isFeatured: false,
        isDealOfDay: false,
        isTrending: true,
        dealEndsAt: null,
        viewCount: 945,
      },
      {
        id: "4",
        title: "Nike Air Max 270 React Herren",
        description: "Ikonischer Streetwear-Sneaker mit React-Dämpfung für ganztägigen Komfort. Modernes Design trifft auf maximale Performance.",
        shortDescription: "Lifestyle Sneaker mit React",
        features: ["React Dämpfung", "Air Max Einheit", "Mesh-Obermaterial", "Gummiaußensohle"],
        originalPrice: 15999,
        salePrice: 11999,
        discountPercent: 25,
        imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
        affiliateLink: "https://ebay.de/item/example",
        categoryId: "mode",
        partner: "eBay",
        badge: "Flash Sale",
        stock: 67,
        isFeatured: true,
        isDealOfDay: true,
        isTrending: false,
        dealEndsAt: new Date(Date.now() + 12 * 60 * 60 * 1000),
        viewCount: 3421,
      },
      {
        id: "5",
        title: "HUGO BOSS Herren Sakko Slim Fit",
        description: "Elegantes Business-Sakko aus feiner Schurwolle. Der perfekte Anzugsakko für den modernen Gentleman.",
        shortDescription: "Premium Business Sakko",
        features: ["100% Schurwolle", "Slim Fit", "Perlmuttknöpfe", "Innentaschen"],
        originalPrice: 34999,
        salePrice: 24999,
        discountPercent: 29,
        imageUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800",
        affiliateLink: "https://awin.com/example",
        categoryId: "mode",
        partner: "Awin",
        badge: null,
        stock: 12,
        isFeatured: false,
        isDealOfDay: false,
        isTrending: false,
        dealEndsAt: null,
        viewCount: 654,
      },
      {
        id: "6",
        title: "Tommy Hilfiger Damen Daunenmantel",
        description: "Warmer, stylischer Daunenmantel für die kalte Jahreszeit. Premium-Qualität trifft auf zeitloses Design.",
        shortDescription: "Premium Wintermantel",
        features: ["90% Daunen", "Wasserabweisend", "Kapuze abnehmbar", "Seitentaschen"],
        originalPrice: 29999,
        salePrice: 19999,
        discountPercent: 33,
        imageUrl: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800",
        affiliateLink: "https://amazon.de/dp/example6",
        categoryId: "mode",
        partner: "Amazon",
        badge: "Winter Sale",
        stock: 23,
        isFeatured: false,
        isDealOfDay: false,
        isTrending: true,
        dealEndsAt: null,
        viewCount: 1234,
      },
      {
        id: "7",
        title: "Dyson V15 Detect Absolute",
        description: "Der intelligenteste kabellose Staubsauger mit Laser-Stauberkennung und automatischer Saugleistungsanpassung.",
        shortDescription: "Kabelloser Premium Staubsauger",
        features: ["Laser-Erkennung", "60 Min Laufzeit", "HEPA-Filter", "LCD-Display", "5 Aufsätze"],
        originalPrice: 74999,
        salePrice: 59999,
        discountPercent: 20,
        imageUrl: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800",
        affiliateLink: "https://amazon.de/dp/example7",
        categoryId: "haushalt",
        partner: "Amazon",
        badge: "Tipp der Redaktion",
        stock: 18,
        isFeatured: true,
        isDealOfDay: true,
        isTrending: true,
        dealEndsAt: new Date(Date.now() + 18 * 60 * 60 * 1000),
        viewCount: 2156,
      },
      {
        id: "8",
        title: "Philips Hue Starter Set E27 White & Color",
        description: "Verwandeln Sie Ihr Zuhause mit smarter Beleuchtung. 16 Millionen Farben per App steuerbar.",
        shortDescription: "Smart Home Beleuchtung",
        features: ["3x E27 Lampen", "Bridge inklusive", "16 Mio Farben", "Sprachsteuerung", "App-Steuerung"],
        originalPrice: 13999,
        salePrice: 10999,
        discountPercent: 21,
        imageUrl: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=800",
        affiliateLink: "https://amazon.de/dp/example8",
        categoryId: "haushalt",
        partner: "Amazon",
        badge: null,
        stock: 56,
        isFeatured: false,
        isDealOfDay: false,
        isTrending: false,
        dealEndsAt: null,
        viewCount: 876,
      },
      {
        id: "9",
        title: "Weber Genesis E-325s Gasgrill",
        description: "Premium Gasgrill mit 3 Brennern und Sear Zone für perfekte Grillergebnisse. Made in USA Qualität.",
        shortDescription: "Premium 3-Brenner Gasgrill",
        features: ["3 Brenner", "Sear Zone", "GS4 Grillsystem", "iGrill 3 kompatibel"],
        originalPrice: 149900,
        salePrice: 119900,
        discountPercent: 20,
        imageUrl: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800",
        affiliateLink: "https://amazon.de/dp/example9",
        categoryId: "haushalt",
        partner: "Amazon",
        badge: "Sommer-Hit",
        stock: 8,
        isFeatured: false,
        isDealOfDay: false,
        isTrending: false,
        dealEndsAt: null,
        viewCount: 543,
      },
      {
        id: "10",
        title: "Peloton Bike+ Indoor Cycling",
        description: "Das ultimative Indoor-Cycling-Erlebnis mit drehbarem HD-Touchscreen und Live-Kursen von Weltklasse-Trainern.",
        shortDescription: "Premium Indoor Bike",
        features: ["24 Zoll Display", "Auto-Resistance", "Apple GymKit", "Live Kurse", "Integrierte Lautsprecher"],
        originalPrice: 239900,
        salePrice: 199900,
        discountPercent: 17,
        imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800",
        affiliateLink: "https://amazon.de/dp/example10",
        categoryId: "sport",
        partner: "Amazon",
        badge: "Premium",
        stock: 5,
        isFeatured: true,
        isDealOfDay: false,
        isTrending: true,
        dealEndsAt: null,
        viewCount: 1678,
      },
      {
        id: "11",
        title: "Garmin Fenix 7X Solar Smartwatch",
        description: "Die ultimative Outdoor-Smartwatch mit Solar-Ladung und bis zu 37 Tagen Akkulaufzeit im Smartwatch-Modus.",
        shortDescription: "Premium Outdoor Smartwatch",
        features: ["Solar-Ladung", "37 Tage Akku", "Topo-Karten", "Multi-Sport", "Puls & SpO2"],
        originalPrice: 89999,
        salePrice: 74999,
        discountPercent: 17,
        imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
        affiliateLink: "https://amazon.de/dp/example11",
        categoryId: "sport",
        partner: "Amazon",
        badge: null,
        stock: 21,
        isFeatured: false,
        isDealOfDay: false,
        isTrending: true,
        dealEndsAt: null,
        viewCount: 1432,
      },
      {
        id: "12",
        title: "Bowflex SelectTech 552 Hanteln Set",
        description: "Verstellbare Kurzhanteln von 2-24 kg. Ersetzen 15 Hantelpaare und sparen Platz.",
        shortDescription: "Verstellbare Kurzhanteln",
        features: ["2-24 kg pro Hantel", "15-in-1", "Schnellverstellung", "Platzsparend"],
        originalPrice: 54999,
        salePrice: 44999,
        discountPercent: 18,
        imageUrl: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800",
        affiliateLink: "https://amazon.de/dp/example12",
        categoryId: "sport",
        partner: "Amazon",
        badge: "Bestseller",
        stock: 34,
        isFeatured: false,
        isDealOfDay: true,
        isTrending: false,
        dealEndsAt: new Date(Date.now() + 8 * 60 * 60 * 1000),
        viewCount: 987,
      },
      {
        id: "13",
        title: "Dyson Airwrap Complete Multi-Styler",
        description: "Revolutionärer Haarstyler mit Coanda-Effekt für Locken, Wellen und glattes Haar ohne extreme Hitze.",
        shortDescription: "All-in-One Haarstyler",
        features: ["Coanda-Effekt", "6 Aufsätze", "3 Temperaturstufen", "Intelligente Hitzesteuerung"],
        originalPrice: 54900,
        salePrice: 44900,
        discountPercent: 18,
        imageUrl: "https://images.unsplash.com/photo-1522338242042-2d1c53c14cc2?w=800",
        affiliateLink: "https://amazon.de/dp/example13",
        categoryId: "beauty",
        partner: "Amazon",
        badge: "Trend",
        stock: 29,
        isFeatured: true,
        isDealOfDay: false,
        isTrending: true,
        dealEndsAt: null,
        viewCount: 3567,
      },
      {
        id: "14",
        title: "La Mer Crème de la Mer Moisturizer",
        description: "Die legendäre Feuchtigkeitscreme mit dem patentierten Miracle Broth für strahlend schöne Haut.",
        shortDescription: "Luxus Feuchtigkeitscreme",
        features: ["Miracle Broth", "60ml", "Anti-Aging", "Intensiv pflegend"],
        originalPrice: 38500,
        salePrice: 34900,
        discountPercent: 9,
        imageUrl: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800",
        affiliateLink: "https://amazon.de/dp/example14",
        categoryId: "beauty",
        partner: "Amazon",
        badge: "Luxus",
        stock: 14,
        isFeatured: false,
        isDealOfDay: false,
        isTrending: false,
        dealEndsAt: null,
        viewCount: 765,
      },
      {
        id: "15",
        title: "Foreo Luna 4 Gesichtsreinigungsgerät",
        description: "Sanfte T-Sonic Pulsationen für eine tiefe Gesichtsreinigung und straffere Haut in nur 2 Minuten.",
        shortDescription: "Smarte Gesichtsreinigung",
        features: ["T-Sonic Technologie", "App-gesteuert", "Wasserdicht", "400 Anwendungen pro Ladung"],
        originalPrice: 24900,
        salePrice: 19900,
        discountPercent: 20,
        imageUrl: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800",
        affiliateLink: "https://amazon.de/dp/example15",
        categoryId: "beauty",
        partner: "Amazon",
        badge: null,
        stock: 41,
        isFeatured: false,
        isDealOfDay: false,
        isTrending: true,
        dealEndsAt: null,
        viewCount: 1123,
      },
      {
        id: "16",
        title: "PlayStation 5 Slim Digital Edition",
        description: "Die neueste PlayStation in schlankem Design. Erleben Sie atemberaubende Grafik und blitzschnelle Ladezeiten.",
        shortDescription: "Next-Gen Gaming Konsole",
        features: ["4K Gaming", "120fps", "DualSense Controller", "825GB SSD", "Ray Tracing"],
        originalPrice: 44999,
        salePrice: 39999,
        discountPercent: 11,
        imageUrl: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800",
        affiliateLink: "https://amazon.de/dp/example16",
        categoryId: "spielzeug",
        partner: "Amazon",
        badge: "Hot",
        stock: 7,
        isFeatured: true,
        isDealOfDay: true,
        isTrending: true,
        dealEndsAt: new Date(Date.now() + 6 * 60 * 60 * 1000),
        viewCount: 5678,
      },
      {
        id: "17",
        title: "LEGO Star Wars Millennium Falcon UCS",
        description: "Das ultimative LEGO Star Wars Set für Sammler. 7.541 Teile für stundenlangen Bauspaß.",
        shortDescription: "Premium Sammler Set",
        features: ["7.541 Teile", "84cm lang", "Minifiguren enthalten", "Displayständer"],
        originalPrice: 84999,
        salePrice: 74999,
        discountPercent: 12,
        imageUrl: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=800",
        affiliateLink: "https://amazon.de/dp/example17",
        categoryId: "spielzeug",
        partner: "Amazon",
        badge: "Sammler",
        stock: 4,
        isFeatured: false,
        isDealOfDay: false,
        isTrending: false,
        dealEndsAt: null,
        viewCount: 2345,
      },
      {
        id: "18",
        title: "Nintendo Switch OLED Bundle Mario Kart",
        description: "Die verbesserte Nintendo Switch mit OLED-Display inklusive Mario Kart 8 Deluxe und 3 Monate Online.",
        shortDescription: "Handheld Gaming Bundle",
        features: ["7 Zoll OLED", "64GB Speicher", "Mario Kart 8 inklusive", "3 Monate Online"],
        originalPrice: 39999,
        salePrice: 34999,
        discountPercent: 13,
        imageUrl: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=800",
        affiliateLink: "https://amazon.de/dp/example18",
        categoryId: "spielzeug",
        partner: "Amazon",
        badge: null,
        stock: 19,
        isFeatured: false,
        isDealOfDay: false,
        isTrending: true,
        dealEndsAt: null,
        viewCount: 1876,
      },
      {
        id: "19",
        title: "Mallorca All-Inclusive Urlaub 7 Tage",
        description: "Traumurlaub im 4-Sterne Hotel mit Flug, Transfer und All-Inclusive Verpflegung. Direkt am Strand.",
        shortDescription: "Strandurlaub Spanien",
        features: ["Flug inklusive", "4-Sterne Hotel", "All-Inclusive", "Strandlage", "Transfer"],
        originalPrice: 89900,
        salePrice: 64900,
        discountPercent: 28,
        imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
        affiliateLink: "https://awin.com/travel1",
        categoryId: "reisen",
        partner: "Awin",
        badge: "Bestseller",
        stock: 12,
        isFeatured: true,
        isDealOfDay: false,
        isTrending: true,
        dealEndsAt: null,
        viewCount: 4321,
      },
      {
        id: "20",
        title: "Wellness Wochenende Schwarzwald",
        description: "2 Nächte im 5-Sterne Spa Hotel mit Vollpension, Massage und freiem Zugang zum Wellness-Bereich.",
        shortDescription: "Entspannung pur",
        features: ["2 Nächte", "Vollpension", "60 Min Massage", "Wellness-Bereich", "Sauna"],
        originalPrice: 59900,
        salePrice: 44900,
        discountPercent: 25,
        imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800",
        affiliateLink: "https://awin.com/travel2",
        categoryId: "reisen",
        partner: "Awin",
        badge: "Wellness",
        stock: 8,
        isFeatured: false,
        isDealOfDay: true,
        isTrending: false,
        dealEndsAt: new Date(Date.now() + 16 * 60 * 60 * 1000),
        viewCount: 987,
      },
      {
        id: "21",
        title: "Städtereise Paris 3 Tage inkl. Flug",
        description: "Romantische Städtereise nach Paris mit Flug, 3 Übernachtungen und Eiffelturm-Tickets.",
        shortDescription: "Stadt der Liebe",
        features: ["Hin- und Rückflug", "3 Nächte", "Frühstück", "Eiffelturm Tickets", "Zentrale Lage"],
        originalPrice: 49900,
        salePrice: 39900,
        discountPercent: 20,
        imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
        affiliateLink: "https://awin.com/travel3",
        categoryId: "reisen",
        partner: "Awin",
        badge: null,
        stock: 15,
        isFeatured: false,
        isDealOfDay: false,
        isTrending: false,
        dealEndsAt: null,
        viewCount: 1543,
      },
      {
        id: "22",
        title: "Online Marketing Masterclass Komplett",
        description: "Umfassender Video-Kurs mit über 80 Stunden Content zu SEO, Social Media, Ads und E-Mail Marketing.",
        shortDescription: "Kompletter Marketing Kurs",
        features: ["80+ Stunden Video", "Zertifikat", "Lifetime Zugang", "Community Zugang", "Updates inklusive"],
        originalPrice: 49900,
        salePrice: 19900,
        discountPercent: 60,
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
        affiliateLink: "https://digistore24.com/course1",
        categoryId: "digital",
        partner: "Digistore24",
        badge: "Bestseller",
        stock: null,
        isFeatured: true,
        isDealOfDay: false,
        isTrending: true,
        dealEndsAt: null,
        viewCount: 6789,
      },
      {
        id: "23",
        title: "Adobe Creative Cloud Jahresabo",
        description: "Alle Adobe Creative Apps für ein Jahr: Photoshop, Illustrator, Premiere Pro und mehr.",
        shortDescription: "Alle Adobe Apps",
        features: ["20+ Apps", "100GB Cloud", "Adobe Fonts", "Portfolio Website", "Updates"],
        originalPrice: 71388,
        salePrice: 52788,
        discountPercent: 26,
        imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800",
        affiliateLink: "https://amazon.de/dp/example23",
        categoryId: "digital",
        partner: "Amazon",
        badge: "Empfehlung",
        stock: null,
        isFeatured: false,
        isDealOfDay: false,
        isTrending: true,
        dealEndsAt: null,
        viewCount: 2345,
      },
      {
        id: "24",
        title: "NordVPN 2 Jahre + 3 Monate gratis",
        description: "Premium VPN-Schutz für alle Ihre Geräte. Sicher und anonym im Internet surfen.",
        shortDescription: "Premium VPN Service",
        features: ["6 Geräte gleichzeitig", "5500+ Server", "No-Logs Politik", "Threat Protection", "24/7 Support"],
        originalPrice: 28668,
        salePrice: 8916,
        discountPercent: 69,
        imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800",
        affiliateLink: "https://awin.com/nordvpn",
        categoryId: "digital",
        partner: "Awin",
        badge: "Top-Deal",
        stock: null,
        isFeatured: false,
        isDealOfDay: true,
        isTrending: true,
        dealEndsAt: new Date(Date.now() + 48 * 60 * 60 * 1000),
        viewCount: 8765,
      },
    ];

    productsData.forEach(prod => this.products.set(prod.id, prod));
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductById(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.categoryId === categoryId);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.isFeatured);
  }

  async getDealsOfDay(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.isDealOfDay);
  }

  async getTrendingProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.isTrending);
  }

  async searchProducts(query: string): Promise<Product[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.products.values()).filter(p => 
      p.title.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      (p.shortDescription && p.shortDescription.toLowerCase().includes(lowerQuery))
    );
  }

  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(c => c.slug === slug);
  }
}

export const storage = new MemStorage();
