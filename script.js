const whatsappNumbers = ["27712365920", "27820425487"];

const imageSources = {
  "iPhone XR": "assets/phones/iphone-xr.png",
  "iPhone 11": "assets/phones/iphone-11.png",
  "iPhone 11 Pro": "assets/phones/iphone-11-pro.png",
  "iPhone 11 Pro Max": "assets/phones/iphone-11-pro-max.png",
  "iPhone 12": "assets/phones/iphone-12.png",
  "iPhone 12 Pro": "assets/phones/iphone-12-pro.png",
  "iPhone 12 Pro Max": "assets/phones/iphone-12-pro-max.png",
  "iPhone 13": "assets/phones/iphone-13.png",
  "iPhone 13 Pro": "assets/phones/iphone-13-pro.png",
  "iPhone 13 Pro Max": "assets/phones/iphone-13-pro-max.png",
  "iPhone 14": "assets/phones/iphone-14.png",
  "iPhone 14 Pro": "assets/phones/iphone-14-pro.png",
  "iPhone 14 Pro Max": "assets/phones/iphone-14-pro-max.png",
  "iPhone 15": "assets/phones/iphone-15.png",
  "iPhone 15 Pro": "assets/phones/iphone-15-pro.png",
  "iPhone 15 Pro Max": "assets/phones/iphone-15-pro-max.png",
  "iPhone 16": "assets/phones/iphone-16.png",
  "iPhone 16 Pro": "assets/phones/iphone-16-pro.png",
  "iPhone 16 Pro Max": "assets/phones/iphone-16-pro-max.png",
  "iPhone 17": "assets/phones/iphone-17.png",
  "iPhone 17 Pro": "assets/phones/iphone-17-pro.png",
  "iPhone 17 Pro Max": "assets/phones/iphone-17-pro-max.png",
};

const categories = [
  {
    icon: "⭐",
    name: "New Arrivals",
    items: [
      ["iPhone 17 256GB", 18999],
      ["iPhone 17 Pro 256GB", 25999],
      ["iPhone 17 Pro Max 256GB", 29499],
    ],
  },
  {
    icon: "🔥",
    name: "Premium Range",
    items: [
      ["iPhone 16 128GB", 15999],
      ["iPhone 16 Pro 128GB", 19499],
      ["iPhone 16 Pro 256GB", 19999],
      ["iPhone 16 Pro Max", 22499],
    ],
  },
  {
    icon: "💎",
    name: "Best Value Deals",
    items: [
      ["iPhone 15 128GB", 12999],
      ["iPhone 15 256GB", 13999],
      ["iPhone 15 Pro 128GB", 15999],
      ["iPhone 15 Pro 256GB", 16499],
      ["iPhone 15 Pro Max", 18999],
    ],
  },
  {
    icon: "🏷",
    name: "Affordable Range",
    items: [
      ["iPhone 14 128GB", 9499],
      ["iPhone 14 256GB", 10499],
      ["iPhone 14 Pro", 12499],
      ["iPhone 14 Pro 256GB", 13499],
      ["iPhone 14 Pro Max", 15499],
    ],
  },
  {
    icon: "◷",
    name: "Classic Models",
    items: [
      ["iPhone 13 128GB", 8499],
      ["iPhone 13 256GB", 8999],
      ["iPhone 13 Pro", 9999],
      ["iPhone 13 Pro 256GB", 10999],
      ["iPhone 13 Pro Max", 12999],
    ],
  },
  {
    icon: "▣",
    name: "Older Models",
    items: [
      ["iPhone 12 64GB", 6500],
      ["iPhone 12 128GB", 7000],
      ["iPhone 12 Pro", 8000],
      ["iPhone 12 Pro 256GB", 8500],
      ["iPhone 12 Pro Max", 9500],
      ["iPhone 12 Pro Max 256GB", 10000],
      ["iPhone XR 64GB", 4500],
      ["iPhone XR 128GB", 5000],
      ["iPhone 11 64GB", 5500],
      ["iPhone 11 128GB", 6000],
      ["iPhone 11 Pro", 6500],
      ["iPhone 11 Pro 256GB", 7500],
      ["iPhone 11 Pro Max", 8000],
      ["iPhone 11 Pro Max 256GB", 9000],
    ],
  },
];

const colorThemes = [
  ["#c8d3e6", "#2d3b5b"],
  ["#e7bd78", "#4b2c13"],
  ["#b9b2a6", "#10100f"],
  ["#e9e7df", "#303030"],
  ["#8a78a9", "#1c1530"],
  ["#6a8db9", "#0b1630"],
  ["#183a56", "#050910"],
  ["#6d7f6e", "#1a211b"],
];
const products = categories.flatMap((cat, catIndex) =>
  cat.items.map(([name, price], itemIndex) => ({
    name,
    price,
    category: cat.name,
    icon: cat.icon,
    catIndex,
    itemIndex,
  }))
);
const featuredNames = [
  "iPhone 17 256GB",
  "iPhone 17 Pro Max 256GB",
  "iPhone 16 Pro 256GB",
  "iPhone 15 Pro Max",
  "iPhone 14 Pro Max",
  "iPhone 13 Pro Max",
  "iPhone 12 Pro Max 256GB",
  "iPhone 11 Pro Max 256GB",
];
const formatRand = (value) => "R" + value.toLocaleString("en-ZA").replace(/,/g, " ");
const makeWhatsappUrl = (message) =>
  `https://wa.me/${whatsappNumbers[0]}?text=${encodeURIComponent(message)}`;
function modelKey(name) {
  const withoutStorage = name
    .replace(/\s+(?:64GB|128GB|256GB|512GB|1TB|2TB)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();
  const match = withoutStorage.match(/^iPhone\s+(XR|\d+)(?:\s+(Pro Max|Pro))?$/i);
  if (!match) return "iPhone 15";
  const series = match[1].toUpperCase() === "XR" ? "XR" : match[1];
  const variant = match[2] ? ` ${match[2].replace(/\b\w/g, (c) => c.toUpperCase())}` : "";
  return `iPhone ${series}${variant}`;
}
function initMenu() {
  const btn = document.getElementById("menuToggle"),
    nav = document.getElementById("navMenu");
  if (!btn || !nav) return;
  const setOpen = (open) => {
    nav.classList.toggle("open", open);
    document.body.classList.toggle("menu-open", open);
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    btn.textContent = open ? "×" : "☰";
  };
  btn.addEventListener("click", () => setOpen(!nav.classList.contains("open")));
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setOpen(false)));
  document.addEventListener("click", (event) => {
    if (
      nav.classList.contains("open") &&
      !nav.contains(event.target) &&
      !btn.contains(event.target)
    )
      setOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) setOpen(false);
  });
}
function initLinks() {
  const general =
    "Hi Almighty eCom, I am interested in buying an iPhone. Please send me the latest availability.";
  ["topWhatsapp", "heroWhatsapp", "contactWhatsapp", "floatingWhatsapp"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.href = makeWhatsappUrl(general);
  });
}
function populateCategorySelect(select) {
  if (!select) return;
  categories.forEach((cat) => {
    const o = document.createElement("option");
    o.value = cat.name;
    o.textContent = cat.name;
    select.appendChild(o);
  });
}
function optimizedPhonePicture(name, className = "") {
  const fallback = imageSources[modelKey(name)];
  const stem = fallback.replace(/\.png$/i, "");
  return `<picture class="${className}"><source type="image/webp" srcset="${stem}-500.webp 500w, ${stem}-1000.webp 1000w" sizes="(max-width:560px) 82vw,(max-width:1000px) 42vw,23vw"><img loading="lazy" decoding="async" width="1000" height="1000" src="${fallback}" alt="${name} product image"></picture>`;
}
function productImage(name) {
  return `<div class="phone-art image-card">${optimizedPhonePicture(name)}</div>`;
}
function renderShop() {
  const grid = document.getElementById("productGrid");
  if (!grid) return;
  const search = document.getElementById("searchInput"),
    cat = document.getElementById("categoryFilter"),
    sort = document.getElementById("sortSelect");
  let data = products.filter((p) => featuredNames.includes(p.name));
  const query = (search?.value || "").trim().toLowerCase();
  if (query)
    data = products.filter(
      (p) => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)
    );
  if (cat && cat.value !== "all") data = data.filter((p) => p.category === cat.value);
  if (sort?.value === "low") data.sort((a, b) => a.price - b.price);
  if (sort?.value === "high") data.sort((a, b) => b.price - a.price);
  grid.innerHTML = data
    .map(
      (p, i) =>
        `<article class="product-card"><span class="category-chip">${p.category}</span>${productImage(p.name)}<h3>${p.name}</h3><p class="product-meta">Brand new • Factory sealed • 3 months warranty</p><div class="price">${formatRand(p.price)}</div><div class="card-actions"><button class="small-btn buy" onclick="openOrder('${p.name.replace(/'/g, "\\'")}',${p.price})">🛒 Buy Now</button><a class="small-btn" target="_blank" rel="noopener" href="${makeWhatsappUrl(`Hi Almighty eCom, is ${p.name} for ${formatRand(p.price)} available?`)}">WhatsApp</a></div></article>`
    )
    .join("");
  if (!data.length) grid.innerHTML = `<p class="empty">No iPhones found. Try another search.</p>`;
}
function renderPriceCatalogue() {
  const wrap = document.getElementById("priceCatalogue");
  if (!wrap) return;
  const search = document.getElementById("priceSearchInput"),
    cat = document.getElementById("priceCategoryFilter"),
    sort = document.getElementById("priceSortSelect");
  let data = products.slice();
  const query = (search?.value || "").trim().toLowerCase();
  if (query)
    data = data.filter(
      (p) => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)
    );
  if (cat && cat.value !== "all") data = data.filter((p) => p.category === cat.value);
  if (sort?.value === "low") data.sort((a, b) => a.price - b.price);
  if (sort?.value === "high") data.sort((a, b) => b.price - a.price);
  const grouped = categories
    .map((c) => ({ cat: c, items: data.filter((p) => p.category === c.name) }))
    .filter((g) => g.items.length);
  wrap.innerHTML = grouped
    .map(
      (g) =>
        `<div class="catalogue-category"><h3><span>${g.cat.icon}</span>${g.cat.name}</h3><div class="real-price-grid">${g.items.map((p) => `<article class="real-price-card"><div class="real-img-wrap">${optimizedPhonePicture(p.name)}</div><div class="content"><h4>${p.name}</h4><p class="real-price">${formatRand(p.price)}</p><p class="source-note">Correct model-matched local product picture • storage shown in the title. Confirm exact colour and stock on WhatsApp.</p><button class="small-btn buy" onclick="openOrder('${p.name.replace(/'/g, "\\'")}',${p.price})">🛒 Buy Now</button></div></article>`).join("")}</div></div>`
    )
    .join("");
  if (!data.length) wrap.innerHTML = `<p class="empty">No iPhones found. Try another search.</p>`;
}
let selectedProduct = null;
let lastFocusedElement = null;
window.openOrder = function (name, price) {
  selectedProduct = { name, price };
  const modal = document.getElementById("orderModal");
  if (!modal) {
    location.href = makeWhatsappUrl(
      `Hi Almighty eCom, is ${name} for ${formatRand(price)} available?`
    );
    return;
  }
  lastFocusedElement = document.activeElement;
  document.getElementById("modalTitle").textContent = name;
  document.getElementById("modalPrice").textContent = formatRand(price);
  updateModalWhatsapp();
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  setTimeout(() => document.getElementById("customerName")?.focus(), 0);
};
function closeOrderModal() {
  const modal = document.getElementById("orderModal");
  if (!modal) return;
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  lastFocusedElement?.focus?.();
}
function updateModalWhatsapp() {
  if (!selectedProduct) return;
  const n = document.getElementById("customerName")?.value.trim() || "Customer";
  const l = document.getElementById("customerLocation")?.value.trim() || "my area";
  const a = document.getElementById("modalWhatsapp");
  if (a)
    a.href = makeWhatsappUrl(
      `Hi Almighty eCom, my name is ${n}. I want to order ${selectedProduct.name} for ${formatRand(selectedProduct.price)}. My location is ${l}. Is it available?`
    );
}
function initModal() {
  const modal = document.getElementById("orderModal"),
    close = document.getElementById("closeModal");
  if (close && modal) close.addEventListener("click", closeOrderModal);
  if (modal)
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeOrderModal();
    });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal?.classList.contains("show")) closeOrderModal();
  });
  ["customerName", "customerLocation"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", updateModalWhatsapp);
  });
}
function initTradeForm() {
  const ids = ["tradeName", "tradeModel", "tradeStorage", "tradeBattery", "tradeCondition"],
    btn = document.getElementById("tradeFormWhatsapp");
  if (!btn) return;
  function update() {
    const v = Object.fromEntries(
      ids.map((id) => [id, document.getElementById(id)?.value.trim() || ""])
    );
    btn.href = makeWhatsappUrl(
      `Hi Almighty eCom, I want a trade-in quote. Name: ${v.tradeName || "Customer"}. Model: ${v.tradeModel || "Not specified"}. Storage: ${v.tradeStorage || "Not specified"}. Battery health: ${v.tradeBattery || "Not specified"}. Condition: ${v.tradeCondition || "Not specified"}.`
    );
  }
  ids.forEach((id) => document.getElementById(id)?.addEventListener("input", update));
  update();
}
initMenu();
initLinks();
initModal();
initTradeForm();
populateCategorySelect(document.getElementById("categoryFilter"));
populateCategorySelect(document.getElementById("priceCategoryFilter"));
["searchInput", "categoryFilter", "sortSelect"].forEach((id) =>
  document.getElementById(id)?.addEventListener("input", renderShop)
);
["priceSearchInput", "priceCategoryFilter", "priceSortSelect"].forEach((id) =>
  document.getElementById(id)?.addEventListener("input", renderPriceCatalogue)
);
renderShop();
renderPriceCatalogue();

function setAbsoluteSeoUrls() {
  if (location.protocol !== "http:" && location.protocol !== "https:") return;
  const absolute = (url) => new URL(url, location.origin).href;
  document
    .querySelectorAll('link[rel="canonical"]')
    .forEach((el) => (el.href = absolute(el.getAttribute("href"))));
  document
    .querySelectorAll(
      'meta[property="og:url"],meta[property="og:image"],meta[name="twitter:image"]'
    )
    .forEach((el) => (el.content = absolute(el.getAttribute("content"))));
  document.querySelectorAll('script[type="application/ld+json"]').forEach((el) => {
    try {
      const data = JSON.parse(el.textContent);
      const visit = (value) => {
        if (Array.isArray(value)) return value.forEach(visit);
        if (!value || typeof value !== "object") return;
        Object.keys(value).forEach((key) => {
          if (
            (key === "url" || key === "image" || key === "@id") &&
            typeof value[key] === "string" &&
            value[key].startsWith("/")
          )
            value[key] = absolute(value[key]);
          else visit(value[key]);
        });
      };
      visit(data);
      el.textContent = JSON.stringify(data);
    } catch (_error) {}
  });
}
setAbsoluteSeoUrls();
