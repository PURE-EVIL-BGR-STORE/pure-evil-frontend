export interface Product {
  id: number;
  name: string;
  category: "tees" | "hoodies" | "bottoms";
  price: string;
  tag: string;
  spec: string;
  specEn?: string;
  image: string;
  hoverImage: string;
}

export interface CatalogCategory {
  id: "all" | "tees" | "hoodies" | "bottoms";
  label: string;
}

export const CATALOG_CATEGORIES: CatalogCategory[] = [
  { id: "all", label: "Tất cả Drop 01" },
  { id: "tees", label: "Áo Thun & Pump Cover" },
  { id: "hoodies", label: "Hoodie & Zip-Up" },
  { id: "bottoms", label: "Quần Sweatpants & Shorts" },
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "CONTROLLED CHAOS HEAVY TEE // ACID WASH",
    category: "tees",
    price: "680.000₫",
    tag: "BEST SELLER",
    spec: "290 GSM • Acid Wash Mineral",
    specEn: "290 GSM • Acid Wash Mineral",
    image:
      "https://cdn.shopify.com/s/files/1/0807/4556/2400/files/WashedVintageStudio-3761.jpg",
    hoverImage:
      "https://cdn.shopify.com/s/files/1/0807/4556/2400/files/WashedVintageStudio-3795.jpg",
  },
  {
    id: 2,
    name: "AMETHYST CAMO PUMP COVER // HEAVY OVERSIZED",
    category: "tees",
    price: "720.000₫",
    tag: "DROP 001",
    spec: "320 GSM • Form Boxy Trễ Vai",
    specEn: "320 GSM • Drop-Shoulder Boxy Fit",
    image:
      "https://cdn.shopify.com/s/files/1/0807/4556/2400/files/DSC01361_1.jpg",
    hoverImage:
      "https://cdn.shopify.com/s/files/1/0807/4556/2400/files/DSC01364.jpg",
  },
  {
    id: 3,
    name: "OUTLAW WAFFLE KNIT ZIP UP // DISTRESSED GREY",
    category: "hoodies",
    price: "1.150.000₫",
    tag: "LIMITED",
    spec: "480 GSM • Waffle Dệt Nhiệt Nặng",
    specEn: "480 GSM • Heavy Thermal Waffle Knit",
    image:
      "https://cdn.shopify.com/s/files/1/0807/4556/2400/files/Reaper6.jpg",
    hoverImage:
      "https://cdn.shopify.com/s/files/1/0807/4556/2400/files/Reaper5.jpg",
  },
  {
    id: 4,
    name: "AMETHYST CAMO HEAVY SWEATPANTS // TACTICAL",
    category: "bottoms",
    price: "950.000₫",
    tag: "NEW",
    spec: "450 GSM • Ống Suông Rộng Rút Dây",
    specEn: "450 GSM • Wide-Leg Tactical Sweatpants",
    image:
      "https://cdn.shopify.com/s/files/1/0807/4556/2400/files/DSC04306.jpg",
    hoverImage:
      "https://cdn.shopify.com/s/files/1/0807/4556/2400/files/DSC04307.jpg",
  },
  {
    id: 5,
    name: "ARCTIC CAMO PUMP COVER // GLACIAL FROST",
    category: "tees",
    price: "720.000₫",
    tag: "DROP 001",
    spec: "300 GSM • Vải Dày Thấm Hút Cao",
    specEn: "300 GSM • High-Density Heavy Cotton",
    image:
      "https://cdn.shopify.com/s/files/1/0807/4556/2400/files/DSC01354.jpg",
    hoverImage:
      "https://cdn.shopify.com/s/files/1/0807/4556/2400/files/DSC01356.jpg",
  },
  {
    id: 6,
    name: "ARCTIC CAMO HEAVYWEIGHT SWEATPANTS // SUBZERO",
    category: "bottoms",
    price: "950.000₫",
    tag: "ESSENTIAL",
    spec: "450 GSM • Bo Cạp Co Giãn 2 Lớp",
    specEn: "450 GSM • Double-Layer Elastic Waistband",
    image:
      "https://cdn.shopify.com/s/files/1/0807/4556/2400/files/DSC01375.jpg",
    hoverImage:
      "https://cdn.shopify.com/s/files/1/0807/4556/2400/files/DSC01376.jpg",
  },
  {
    id: 7,
    name: "SMOKE HEAVY ZIP UP HOODIE // FADED CHARCOAL",
    category: "hoodies",
    price: "1.250.000₫",
    tag: "HOT",
    spec: "500 GSM • Khóa Kim Loại Đôi",
    specEn: "500 GSM • Dual Metal Zipper Hardware",
    image:
      "https://cdn.shopify.com/s/files/1/0807/4556/2400/files/Untitled-1-7_8af8c22e-d822-403e-8737-6aac011a86d5.jpg",
    hoverImage:
      "https://cdn.shopify.com/s/files/1/0807/4556/2400/files/Untitled-1-8_de4fa1cc-3dcd-4a36-877b-fdc2f9870a60.jpg",
  },
  {
    id: 8,
    name: "REAPER WAFFLE KNIT SWEATPANTS // OBSIDIAN",
    category: "bottoms",
    price: "890.000₫",
    tag: "LIMITED",
    spec: "420 GSM • Form Suông Relaxed Fit",
    specEn: "420 GSM • Relaxed Waffle Thermal Fit",
    image:
      "https://cdn.shopify.com/s/files/1/0807/4556/2400/files/Reaper31.jpg",
    hoverImage:
      "https://cdn.shopify.com/s/files/1/0807/4556/2400/files/Reaper30.jpg",
  },
];
