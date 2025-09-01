

import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Turmeric", href: "/turmeric" },
  { name: "Kumkum", href: "/kumkum" },
  { name: "Pooja Products", href: "/pooja-products" },
  { name: "Spices", href: "/spices" },
  { name: "Our Products", href: "/our-products" },
  { name: "Contact Us", href: "/contact" },
];

const banners = [
  { image: "/file.svg", title: "TURMERIC", color: "#FFC107", btn: "Shop Now" },
  { image: "/globe.svg", title: "KUMKUM", color: "#E53935", btn: "Shop Now" },
  { image: "/window.svg", title: "POOJA PRODUCTS", color: "#8D4925", btn: "Shop Now" },
];



export default function Home() {
  return (
    <div style={{ background: '#fff', minHeight: '100vh', fontFamily: 'inherit' }}>
      {/* Navigation Bar */}
      <nav style={{ display: 'flex', alignItems: 'center', padding: '12px 32px', borderBottom: '1px solid #eee', background: '#fff', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Image src="/file.svg" alt="Logo" width={48} height={48} />
          <Image src="/globe.svg" alt="Logo2" width={48} height={48} />
        </div>
        <ul style={{ display: 'flex', gap: 24, marginLeft: 32, flex: 1 }}>
          {navLinks.map(link => (
            <li key={link.name} style={{ listStyle: 'none' }}>
              <Link href={link.href} legacyBehavior>
                <a style={{
                  color: link.href === "/" ? '#fff' : '#E65100',
                  background: link.href === "/" ? '#E65100' : 'transparent',
                  padding: '8px 20px',
                  borderRadius: 6,
                  fontWeight: 600,
                  textDecoration: 'none',
                  fontSize: 16
                }}>{link.name}</a>
              </Link>
            </li>
          ))}
        </ul>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <span style={{ fontSize: 22, color: '#333', cursor: 'pointer' }}>🔍</span>
          <span style={{ fontSize: 22, color: '#333', cursor: 'pointer' }}>👤</span>
          <span style={{ fontSize: 22, color: '#333', cursor: 'pointer' }}>🛒<span style={{ color: '#E53935', fontWeight: 700, fontSize: 14, marginLeft: 2 }}>0</span></span>
          <span style={{ fontSize: 22, color: '#333', cursor: 'pointer' }}>🤍</span>
        </div>
      </nav>

      {/* Hero Banners */}
      <div style={{ display: 'flex', gap: 24, margin: '32px auto', maxWidth: 1200 }}>
        {banners.map((banner, idx) => (
          <div key={idx} style={{ flex: 1, background: banner.color, borderRadius: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, minHeight: 180, position: 'relative' }}>
            <Image src={banner.image} alt={banner.title} width={120} height={120} />
            <div style={{ fontWeight: 800, fontSize: 28, color: '#222', margin: '16px 0 8px' }}>{banner.title}</div>
            <button style={{ background: '#fff', color: '#E65100', border: 'none', borderRadius: 20, padding: '8px 24px', fontWeight: 700, fontSize: 16, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>SHOP NOW</button>
          </div>
        ))}
      </div>

      {/* ...existing code... */}
    </div>
  );
}
