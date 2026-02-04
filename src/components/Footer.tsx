import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[var(--ink)] text-[var(--paper)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-16">
        {/* Main paragraph */}
        <p className="text-[var(--mist)] max-w-2xl leading-relaxed text-base mb-12">
          A curated collection for serious manga readers. We believe in quality over quantity,
          offering only the finest titles that define the medium.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Links */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-[var(--stone)] mb-6">
              Navigation
            </h4>
            <ul className="space-y-4">
              {['Home', 'Shop', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-sm text-[var(--mist)] hover:text-[var(--paper)] transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-[var(--stone)] mb-6">
              Contact
            </h4>
            <ul className="space-y-4 text-sm text-[var(--mist)]">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+919109591879" className="hover:text-[var(--paper)] transition-colors">+91 91095 91879</a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:inkaimangastore@gmail.com" className="hover:text-[var(--paper)] transition-colors">inkai@gmail.com</a>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Raipur, Chhattisgarh<br />India</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-[var(--stone)] mb-6">
              Legal
            </h4>
            <ul className="space-y-4">
              {['Privacy', 'Terms', 'Shipping'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-[var(--mist)] hover:text-[var(--paper)] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-xs text-[var(--stone)]">
            &copy; {new Date().getFullYear()} Inkai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
