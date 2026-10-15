// REUSABLE PIECES: Photo → Header → Footer → OrderLink → ProductCard → ProductGrid → PageIntro.
// Components are functions that return JSX. Uppercase tags such as <Photo /> call them.
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { contact, instagram, orderForms } from "./data.js";

// PHOTO: props are inputs from the parent, e.g. <Photo name="bearbuns" alt="..." />.
// "name" selects a file in public/images; defaults apply when a prop is omitted.
// eager=true loads promptly; otherwise the browser may wait until the photo is nearby.
export function Photo({ name, alt, className = "", eager = false }) {
  return (
    <img
      className={className}
      src={`/images/${name}.webp`}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
    />
  );
}

// HEADER: shared logo/navigation. Look here to edit links or mobile-menu behavior.
export function Header() {
  // State remembers a value between renders; calling its setter requests a new render.
  const [menuOpen, setMenuOpen] = useState(false);
  // A ref holds the actual button so Escape can return keyboard focus to it.
  const menuButton = useRef(null);
  const location = useLocation();
  // An effect runs after rendering. This dependency makes it run when the URL path changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);
  function closeWithEscape(event) {
    if (event.key === "Escape" && menuOpen) {
      setMenuOpen(false);
      menuButton.current?.focus();
    }
  }
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="header" onKeyDown={closeWithEscape}>
        <Link className="wordmark" to="/" aria-label="G&G Bakery home">
          <Photo name="gglogo" alt="Original G&G Bakery bear logo" eager />
        </Link>
        {/* Event handler: clicking flips menuOpen. The same state controls the label and CSS class. */}
        <button
          ref={menuButton}
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "Close ×" : "Menu ☰"}
        </button>
        <nav
          id="main-navigation"
          aria-label="Main navigation"
          className={menuOpen ? "navigation open" : "navigation"}
        >
          {/* NavLink marks the current page active; ordinary Link just navigates within the app. */}
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/shop">Shop</NavLink>
          <NavLink to="/delivery">Delivery & pickup</NavLink>
          <NavLink to="/events">Events & sales</NavLink>
          <NavLink to="/about">About Us</NavLink>
          <a className="nav-contact" href={contact}>
            Contact Us <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>
    </>
  );
}

// FOOTER: shared contact details and links. Their destinations come from data.js.
export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <Link className="footer-brand" to="/" aria-label="G&G Bakery home">
            <Photo name="gglogo" alt="Original G&G Bakery bear logo" />
          </Link>
        </div>
        <div>
          <p className="eyebrow">Contact Us</p>
          <a href={contact}>gg.bakery.service@gmail.com ↗</a>
          <a href={instagram} target="_blank" rel="noreferrer">
            Instagram ↗
          </a>
        </div>
        <div>
          <Link to="/shop">Shop</Link>
          <Link to="/events">Events & Sales</Link>
          <Link to="/delivery">Delivery & Pickup</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} G&G Bakery</span>
      </div>
    </footer>
  );
}

// ORDER LINK: pick a verified Google Form, or fall back to contacting the bakery.
// The "form" prop is a key such as "bread", not the form's full URL.
export function OrderLink({
  form = "custom",
  className = "button",
  label = "Order now",
}) {
  const destination = orderForms[form];
  // ?. safely checks the property even if the requested form key does not exist.
  if (destination?.verifiedActive)
    return (
      <a
        className={className}
        href={destination.url}
        target="_blank"
        rel="noreferrer"
      >
        {label} <span aria-hidden="true">↗</span>
      </a>
    );
  return (
    <a className={className} href={contact}>
      Ask about ordering <span aria-hidden="true">↗</span>
    </a>
  );
}

// ONE PRODUCT: read the product prop and pass some of its fields to smaller components.
// Edit this markup once to change every card rendered by ProductGrid.
export function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-image">
        <Photo name={product.image} alt={product.alt} />
        <span className="product-category">{product.category}</span>
      </div>
      <div className="product-heading">
        <h3>{product.name}</h3>
        <span aria-hidden="true">✳</span>
      </div>
      <p>{product.description}</p>
      <OrderLink className="text-link" form={product.form} />
    </article>
  );
}
// PRODUCT LIST: map() transforms each data record into a ProductCard.
// A stable key helps React match each card to its product when filtering changes the list.
export function ProductGrid({ products }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// PAGE INTRO: "children" is content written between <PageIntro> and </PageIntro>.
// && displays optional content only when a value was provided.
export function PageIntro({ eyebrow, title, children }) {
  return (
    <div className="page-intro">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1>{title}</h1>
      {children && <p>{children}</p>}
    </div>
  );
}
