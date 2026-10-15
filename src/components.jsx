import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { contact, instagram, orderForms } from "./data.js";

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

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef(null);
  const location = useLocation();
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

export function OrderLink({
  form = "custom",
  className = "button",
  label = "Order now",
}) {
  const destination = orderForms[form];
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
export function ProductGrid({ products }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export function PageIntro({ eyebrow, title, children }) {
  return (
    <div className="page-intro">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1>{title}</h1>
      {children && <p>{children}</p>}
    </div>
  );
}
