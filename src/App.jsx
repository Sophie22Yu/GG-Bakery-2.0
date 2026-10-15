// PAGE MAP: Home → Shop → Delivery → Events → About → NotFound → App (routing).
// Edit page text/layout here, reusable pieces in components.jsx, and products in data.js.
import { useEffect, useRef, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import {
  Header,
  Footer,
  Photo,
  OrderLink,
  ProductGrid,
  PageIntro,
} from "./components.jsx";
import Calendar from "./Calendar.jsx";
import { products, categories, events, contact } from "./data.js";

// HOME: composes existing components; the product list and calendar receive data as props.
export function Home() {
  return (
    <>
      {/* Home section 1: welcome text and the main bakery photo. */}
      <section className="hero">
        <div className="hero-copy">
          <h1>G&G Bakery</h1>
          <p>
            Welcome valued customer!! Explore our past events, learn more about
            our team, or find the answer to your cravings in our shop!
            <br />
            Have fun ^-^
          </p>
          <div className="hero-actions">
            <Link className="button" to="/shop">
              Shop <span aria-hidden="true">↗</span>
            </Link>
            <Link className="underlined" to="/about">
              About Us
            </Link>
          </div>
          <div className="handwritten hero-note">
            baked with love, shared with you <span aria-hidden="true">♡</span>
          </div>
        </div>
        <div className="hero-photo">
          <Photo
            eager
            name="bearbuns"
            alt="Bear-shaped milk bread buns from G&G Bakery"
          />
        </div>
      </section>
      <section className="section">
        <div className="section-heading">
          <h2>Recent Desserts</h2>
          <Link className="text-link" to="/shop">
            Shop ↗
          </Link>
        </div>
        {/* Arrays start at index 0: these records are Tiramisu, Cake Pops, and Cupcakes. */}
        <ProductGrid products={[products[2], products[6], products[3]]} />
      </section>
      <section className="story-strip">
        <div className="story-art">
          <Photo
            name="landing_image"
            alt="Original G&G Bakery bear illustration"
          />
        </div>
        <div>
          <h2>Our Mission:</h2>
          <p>
            G&G Bakery strives not only to bring delicious treats to the local
            community, but also seeks to give back to the larger community.
          </p>
          <Link className="text-link" to="/about">
            About Us ↗
          </Link>
        </div>
      </section>
      <section className="section">
        <div className="section-heading">
          <h2>Calendar</h2>
          <Link className="text-link" to="/events">
            Events & Sales ↗
          </Link>
        </div>
        <Calendar events={events} />
      </section>
      <section className="contact-banner">
        <h2>Contact Us</h2>
        <a className="button" href={contact}>
          gg.bakery.service@gmail.com ↗
        </a>
      </section>
    </>
  );
}

// SHOP: the main example of user input → state → filtered data → updated interface.
export function Shop() {
  // query stores the search text; category stores the dropdown choice.
  // Setters such as setQuery tell React to render this component again with the new value.
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All treats");
  // Keep a product only if BOTH conditions pass: category matches AND text matches.
  // This is derived data, recalculated on each render; the original products array is unchanged.
  const matches = products.filter(
    (product) =>
      (category === "All treats" || product.category === category) &&
      `${product.name} ${product.description}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  return (
    <section className="section page-section">
      <PageIntro title="Our Shop" />
      <div className="shop-controls">
        <div className="search-field">
          <label htmlFor="product-search">Search products</label>
          {/* Controlled input: value displays state; onChange saves what the user types. */}
          <input
            id="product-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try bread, cupcakes, tiramisu…"
          />
        </div>
        <div className="category-field">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {categories.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </div>
        {/* Reset both inputs; matches is automatically recalculated from their new values. */}
        <button
          className="reset-button"
          onClick={() => {
            setQuery("");
            setCategory("All treats");
          }}
        >
          Reset filters
        </button>
      </div>
      <p className="result-count" aria-live="polite">
        {matches.length} {matches.length === 1 ? "product" : "products"}
      </p>
      {/* A ternary chooses the product grid when results exist, or the no-results message. */}
      {matches.length ? (
        <ProductGrid products={matches} />
      ) : (
        <div className="no-results">
          <span aria-hidden="true">♡</span>
          <h2>No products found.</h2>
          <p>Try another search or reset the filters.</p>
          <button
            className="button"
            onClick={() => {
              setQuery("");
              setCategory("All treats");
            }}
          >
            Show all products
          </button>
        </div>
      )}
      <p className="availability-note">
        Contact us for current availability and pricing.
      </p>
    </section>
  );
}

// DELIVERY: mostly static content. Map shape/spacing are controlled in styles.css.
function Delivery() {
  return (
    <section className="section page-section">
      <PageIntro title="Delivery & Pickup" />
      <div className="delivery-layout">
        <Photo
          className="delivery-map"
          name="map"
          alt="Original G&G Bakery map showing delivery meet-up locations"
        />
        <div>
          <h2>Delivery Locations:</h2>
          <p>
            The star markers mark locations where we deliver to, including: UW,
            Interlake HS, Bellevue HS, Tyee MS, and Newport HS.
          </p>
          <p>
            For delivery, you will meet someone from our team at the designated
            location, at an agreed time as discussed with said member.
          </p>
          <a className="button" href={contact}>
            Contact Us ↗
          </a>
          <p className="fine-print">
            Please contact us to confirm current locations and availability.
          </p>
          <h3>Pickup (or other) Options:</h3>
          <p>
            General pickups will be throughout the school day @ Newport HS
            <br />
            Special deliveries can be made to your house. For more info, dm us
            on instagram!
          </p>
        </div>
      </div>
    </section>
  );
}
// EVENTS: reuse the same calendar component shown on Home, with the same event records.
function Events() {
  return (
    <section className="section page-section">
      <PageIntro title="Events & Sales" />
      <Calendar events={events} />
    </section>
  );
}
// ABOUT: the array below holds each team member's content; map() renders their cards.
function About() {
  return (
    <section className="section page-section">
      <PageIntro title="Meet the Team:" />
      <div className="team-grid">
        {[
          {
            name: "Gia",
            image: "giapic",
            description:
              "Gia is one of our two co-founders. With a super tuff background in baking, she's brought her hobby of baking for friends to a community and regional-wide scale!",
            favorite: "Chocolate Chip Cookies XD",
          },
          {
            name: "Grace",
            image: "gracepic",
            description:
              "Grace, our other co-founder, bakes the best bread and bagels, so please try them out yes thank you :)",
            favorite: "Oreo McFlurry :P",
          },
          {
            name: "Sophie",
            image: "mepic2",
            description:
              "Sophie, a definitely super awesome coder, and very helpful person of course, is the tech and finance manager, making ordering and getting our desserts even easier~",
            favorite: "Crumbl Cannoli Cookie...",
          },
        ].map((member) => (
          <article key={member.name}>
            <Photo
              name={member.image}
              alt={`${member.name}, G&G Bakery team member`}
            />
            <h3>{member.name}</h3>
            <p>{member.description}</p>
            <p>Favorite sweet treat: {member.favorite}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
// FALLBACK PAGE: shown when no URL path matches one of our five pages.
function NotFound() {
  return (
    <section className="section not-found">
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <Link className="button" to="/">
        Home ↗
      </Link>
    </section>
  );
}

// APP SHELL: always display Header/Footer; swap the page between them based on the URL.
export default function App() {
  const location = useLocation();
  // Refs remember DOM elements/values without triggering a render when changed.
  const main = useRef(null);
  const previousPath = useRef(location.pathname);
  // Run after a path change: update the browser title, then move focus/scroll to the new page.
  useEffect(() => {
    const title =
      {
        "/": "Home",
        "/shop": "Our treats",
        "/delivery": "Delivery & pickup",
        "/events": "Events & sales",
        "/about": "Our story",
      }[location.pathname] || "Page not found";
    document.title = `${title} | G&G Bakery Website 2.0`;
    if (previousPath.current !== location.pathname) {
      main.current?.focus();
      window.scrollTo({ top: 0 });
      previousPath.current = location.pathname;
    }
  }, [location.pathname]);
  return (
    <>
      <Header />
      <main id="main" ref={main} tabIndex={-1}>
        {/* Each Route connects a URL path to a component. * catches all unmatched paths. */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/events" element={<Events />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
