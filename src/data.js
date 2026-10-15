// CONTENT EDITS: change bakery information here rather than rewriting JSX layouts.
// Exports let App.jsx and components.jsx import the same source of data.
export const contact = "mailto:gg.bakery.service@gmail.com";
export const instagram = "https://www.instagram.com/gg._.bakery_/";

// Preserve the original destinations. Enable a form only after checking it accepts responses.
export const orderForms = {
  custom: {
    url: "https://docs.google.com/forms/d/e/1FAIpQLSeN1ZFrdGuOProo8FecOigSmd70JB5NKeAt2uLTJOBRrqR-nQ/viewform",
    verifiedActive: false,
  },
  general: {
    url: "https://forms.gle/yH6JcQLsUK5Ly4Fs5",
    verifiedActive: false,
  },
  bread: { url: "https://forms.gle/Kxe5DKqygRwto8GS8", verifiedActive: false },
};

// Catalog descriptions come from the original app; listing a product does not promise availability.
// To add a product, copy one record and give it a unique id.
// image="bearbuns" means public/images/bearbuns.webp; alt describes that image.
// form must match a key in orderForms above. The cards and filters use these records.
export const products = [
  {
    id: "bear-buns",
    name: "Bear Buns",
    category: "Breads",
    description: "Sweet milk buns, shaped into cute bears :) (4in diameter)",
    image: "bearbuns",
    alt: "Golden milk bread buns shaped like little bears",
    form: "general",
  },
  {
    id: "salt-bread",
    name: "Korean Salt Bread",
    category: "Breads",
    description: "Crispy, soft, and pillowy salt bread!",
    image: "saltbreadplain",
    alt: "Golden Korean salt bread rolls",
    form: "bread",
  },
  {
    id: "tiramisu",
    name: "Tiramisu",
    category: "Desserts",
    description: "Eggless tiramisu with smooth cream-cheese whipped cream.",
    image: "tira",
    alt: "G&G Bakery tiramisu dessert",
    form: "general",
  },
  {
    id: "cupcakes",
    name: "Cupcakes",
    category: "Cakes",
    description:
      "Vanilla and strawberry icing on red velvet and vanilla-bean infused cupcakes",
    image: "pink_cupcake",
    alt: "Cupcakes decorated with pink icing",
    form: "custom",
  },
  {
    id: "bear-bagels",
    name: "Bear Bagels",
    category: "Breads",
    description: "Bagels of your choice with bear faces c._.o",
    image: "bearbagels2",
    alt: "Handmade bagels decorated with bear faces",
    form: "general",
  },
  {
    id: "shokupan",
    name: "Shokupan",
    category: "Breads",
    description: "Soft, fluffy Japanese milk bread.",
    image: "shokupan",
    alt: "A loaf of Japanese milk bread",
    form: "general",
  },
  {
    id: "cake-pops",
    name: "Cake Pops",
    category: "Desserts",
    description:
      "Soft, flavorful cake pops coated in premium matcha & chocolate",
    image: "cakepopbag",
    alt: "A selection of G&G Bakery cake pops",
    form: "custom",
  },
];
// Build the dropdown from the products: map extracts categories, Set removes duplicates,
// and ... spreads those unique values into an array after the "All treats" option.
export const categories = [
  "All treats",
  ...new Set(products.map((product) => product.category)),
];

// Add confirmed events only. Dates are local calendar dates (YYYY-MM-DD), not UTC timestamps.
// Example shape: { id, title, date, description, link? }. Test events live in tests only.
export const events = [];
