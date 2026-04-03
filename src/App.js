import { useState, useEffect, useRef } from "react";
import "./App.css";

const BUBBLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: Math.random() * 30 + 8,
  left: Math.random() * 100,
  duration: Math.random() * 12 + 8,
  delay: Math.random() * 12,
}));

const PRODUCTS = [
  { emoji: "🪸", bg: "linear-gradient(135deg,#1a3a2a,#056946)", name: "Live Coral", species: "Euphyllia glabrescens", price: "$29.99" },
  { emoji: "🐠", bg: "linear-gradient(135deg,#3a1a0a,#581d0d)", name: "Clownfish", species: "Amphiprion ocellaris", price: "$35.99" },
  { emoji: "🦀", bg: "linear-gradient(135deg,#0d0d28,#1a1a3a)", name: "Emerald Crab", species: "Mithraculus sculptus", price: "$8.99" },
  { emoji: "🐟", bg: "linear-gradient(135deg,#1a2a3a,#203e5f)", name: "Gourami", species: "Trichogaster trichopterus", price: "$15" },
];

const SERVICES = [
  { icon: "🪸", title: "Live Coral Collection", desc: "Aquacultured and hand-selected wild corals from trusted sustainable sources. LPS, SPS, and soft coral varieties available weekly." },
  { icon: "🐠", title: "Marine and Freshwater Fish & Invertebrates", desc: "Rare and common species from the Pacific, Caribbean, and Indian Ocean. Quarantined and acclimated before hitting the floor." },
  { icon: "🔧", title: "Aquarium Setup & Design", desc: "From a nano cube to a 500-gallon display tank, our team designs and installs dream aquariums for homes and offices." },
  { icon: "🧪", title: "Water Testing & Dosing", desc: "Professional water analysis with precise dosing recommendations. We stock every additive, salt, and supplement you need." },
  { icon: "🚛", title: "Maintenance Contracts", desc: "Weekly, bi-weekly, or monthly full-service maintenance plans. We keep your reef thriving so you can just enjoy it." },
  { icon: "📚", title: "Expert Consultation", desc: "New to the hobby or upgrading your system? Our certified marine biologists and experienced hobbyists are here to guide you." },
];

const TESTIMONIALS = [
  { text: "The Reef is the best aquarium store in the Midwest, period. Their torch coral selection blew me away, and the staff actually knew what they were talking about.", author: "Marcus T.", since: "Customer since 2019", initials: "MT" },
  { text: "They set up a 180-gallon reef in my living room and it's been running flawlessly for two years. The maintenance team is professional and thorough every single visit.", author: "Jennifer & Paul K.", since: "Customer since 2021", initials: "JK" },
  { text: "I've tried every store in Indy. Nothing compares. The water quality on their fish is exceptional and they actually quarantine properly. Rare to find that.", author: "Derek W.", since: "Customer since 2018", initials: "DW" },
];

export default function ReefLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [ring, setRing] = useState({ x: -100, y: -100 });
  const ringRef = useRef({ x: -100, y: -100 });
  const animRef = useRef();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const move = (e) => {
      setCursor({ x: e.clientX, y: e.clientY });
      ringRef.current.targetX = e.clientX;
      ringRef.current.targetY = e.clientY;
    };
    window.addEventListener("mousemove", move);
    const animate = () => {
      ringRef.current.x = (ringRef.current.x || 0) + ((ringRef.current.targetX || 0) - (ringRef.current.x || 0)) * 0.12;
      ringRef.current.y = (ringRef.current.y || 0) + ((ringRef.current.targetY || 0) - (ringRef.current.y || 0)) * 0.12;
      setRing({ x: ringRef.current.x, y: ringRef.current.y });
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(animRef.current); };
  }, []);

  return (
    <div className="page">
      <div className="cursor" style={{ left: cursor.x, top: cursor.y }} />
      <div className="cursor-ring" style={{ left: ring.x, top: ring.y }} />

      {/* NAV */}
      <nav className={scrolled ? "scrolled" : ""}>
        <div className="nav-logo">🪸 <span>The Reef</span> Aquarium</div>
        <ul className="nav-links">
          <li><a href="#services">Services</a></li>
          <li><a href="#shop">Shop</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact" className="nav-cta">Visit Us</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        {BUBBLES.map(b => (
          <div key={b.id} className="bubble" style={{
            width: b.size, height: b.size,
            left: `${b.left}%`,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }} />
        ))}
        <div className="hero-badge">📍 Indianapolis, Indiana</div>
        <h1>Where the Ocean<em>Comes Home</em></h1>
        <p className="hero-sub">
          Indianapolis's premier reef aquarium store. Live coral, exotic fish, custom installs, and expert care — all under one roof.
        </p>
        <div className="hero-actions">
          <button className="btn-primary">Explore Our Stock</button>
          <button className="btn-ghost">Book a Consultation</button>
        </div>
        <div className="wave-line" />
      </section>

      {/* STATS */}
      <div className="stats">
        {[
          { num: "500+", label: "Coral Species" },
          { num: "18yrs", label: "In Business" },
          { num: "1,200+", label: "Happy Tanks" },
          { num: "5★", label: "Google Rating" },
        ].map(s => (
          <div className="stat-item" key={s.label}>
            <div className="stat-num">{s.num}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* SERVICES */}
      <div className="services-shell">
        <div className="services">
          <div className="services-header" id="services">
            <div className="section-tag">What We Offer</div>
            <h2>Everything Your Reef Needs</h2>
            <p>From a single frag to a fully managed 500-gallon display, we have the livestock, gear, and expertise to make it happen.</p>
          </div>
          <div className="services-grid">
            {SERVICES.map(s => (
              <div className="service-card" key={s.title}>
                <div className="service-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURED SHOP */}
      <div className="featured-section" id="shop">
        <div className="featured-inner">
          <div className="featured-header">
            <div>
              <div className="section-tag">Fresh This Week</div>
              <h2>New Arrivals</h2>
            </div>
            <a href="#">View Full Inventory →</a>
          </div>
          <div className="products-grid">
            {PRODUCTS.map(p => (
              <div className="product-card" key={p.name}>
                <div className="product-img" style={{ background: p.bg }}>
                  <span style={{ fontSize: "3.5rem" }}>{p.emoji}</span>
                </div>
                <div className="product-info">
                  <h4>{p.name}</h4>
                  <div className="species">{p.species}</div>
                  <div className="product-bottom">
                    <span className="price">{p.price}</span>
                    <div className="add-btn">+</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WHY US */}
      <div id="about">
        <div className="why-section">
          <div className="why-grid">
            <div className="why-visual">
              <div className="tank-frame">
                <div className="tank-light" />
                <svg className="coral-svg" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="150" cy="200" rx="200" ry="30" fill="#051520"/>
                  <path d="M20 200 Q30 140 40 120 Q50 100 60 120 Q70 140 80 200" fill="#1a6040" opacity="0.8"/>
                  <path d="M60 200 Q70 150 80 130 Q90 110 100 130 Q110 150 120 200" fill="#0d4030" opacity="0.9"/>
                  <circle cx="50" cy="115" r="12" fill="#ff6b35" opacity="0.7"/>
                  <circle cx="90" cy="125" r="10" fill="#ff9f1c" opacity="0.7"/>
                  <path d="M180 200 Q190 160 195 140 Q200 120 205 140 Q210 160 220 200" fill="#2a8060" opacity="0.8"/>
                  <path d="M220 200 Q230 155 240 135 Q250 115 260 135 Q270 155 280 200" fill="#1a5040" opacity="0.9"/>
                  <circle cx="230" cy="130" r="14" fill="#00b4d8" opacity="0.5"/>
                  <circle cx="260" cy="130" r="10" fill="#48cae4" opacity="0.4"/>
                  <path d="M130 200 Q140 170 145 155 Q150 140 155 155 Q160 170 170 200" fill="#4a1060" opacity="0.9"/>
                  <circle cx="150" cy="140" r="8" fill="#c77dff" opacity="0.6"/>
                </svg>
                <div className="fish-1">🐠</div>
                <div className="fish-2">🐟</div>
                <div className="fish-3">🦈</div>
              </div>
              <div className="why-tag-float why-tag-1">
                <div className="tag-val">500+</div>
                <div className="tag-sub">Coral frags in stock</div>
              </div>
              <div className="why-tag-float why-tag-2">
                <div className="tag-val">7-day</div>
                <div className="tag-sub">Livestock guarantee</div>
              </div>
            </div>
            <div className="why-content">
              <div className="section-tag">Why Choose Us</div>
              <h2>Aquarium Keeping Is Our Passion, Not a Job</h2>
              <ul className="why-list">
                {[
                  "We offer a 7-day livestock guarantee — if it doesn't make it, we make it right.",
                  "Free water testing, always. No gimmicks, no upsells — just accurate results and honest advice.",
                  "Our staff are active aquarium keepers, not just retail employees. We are happy to share our hard-earned knowledge.",
                ].map((item, i) => (
                  <li key={i}>
                    <span className="check">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="testimonials">
        <div className="testimonials-inner">
          <div className="testimonials-header">
            <div className="section-tag">Happy Aquarists</div>
            <h2>What Indianapolis Is Saying</h2>
          </div>
          <div className="testimonials-grid">
            {TESTIMONIALS.map(t => (
              <div className="testimonial-card" key={t.author}>
                <div className="stars">★★★★★</div>
                <blockquote>"{t.text}"</blockquote>
                <div className="testimonial-author">
                  <div className="author-avatar">{t.initials}</div>
                  <div>
                    <div className="author-name">{t.author}</div>
                    <div className="author-since">{t.since}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-section" id="contact">
        <div className="section-tag">Come See Us</div>
        <h2>Your Reef Journey Starts Here</h2>
        <p>Stop in any day of the week. We'd love to talk corals, fish, and everything in between.</p>
        <button className="btn-primary cta-btn">
          Get Directions
        </button>
        <div className="cta-info">
          <div className="cta-info-item">
            <span>📍</span>
            <span>5280 N Keystone Ave, Indianapolis, IN 46220</span>
          </div>
          <div className="cta-info-item">
            <span>📞</span>
            <span>(317) 555-0192</span>
          </div>
          <div className="cta-info-item">
            <span>🕐</span>
            <span>Mon–Sat 10am–7pm · Sun 11am–5pm</span>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="nav-logo">🪸 <span>The Reef</span> Aquarium</div>
            <p>Indianapolis's home for reef aquarium livestock, supplies, and expertise since 2007. Passionate reefers serving passionate reefers.</p>
          </div>
          <div className="footer-col">
            <h5>Shop</h5>
            <ul>
              <li><a href="#">Live Coral</a></li>
              <li><a href="#">Marine Fish</a></li>
              <li><a href="#">Invertebrates</a></li>
              <li><a href="#">Equipment</a></li>
              <li><a href="#">Dry Goods</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Services</h5>
            <ul>
              <li><a href="#">Tank Setup</a></li>
              <li><a href="#">Maintenance</a></li>
              <li><a href="#">Water Testing</a></li>
              <li><a href="#">Consultation</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Company</h5>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 The Reef Aquarium, Indianapolis. All rights reserved.</span>
          <span>Built with 🪸 by reef keepers</span>
        </div>
      </footer>
    </div>
  );
}