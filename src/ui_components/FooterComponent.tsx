export default function FooterComponent() {
  return (
    <footer className="bg-[var(--bg)] border-t border-[var(--border)] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* School Branding with Athena Helmet Logo */}
          <div className="space-y-4">
            <div className="flex items-center">
              {/* Athena Helmet Logo */}
              <div className="relative flex-shrink-0">
                <svg className="w-16 h-16" viewBox="0 0 100 100">
                  {/* Helmet base */}
                  <path 
                    d="M50 15 L80 30 L80 65 L50 85 L20 65 L20 30 Z" 
                    fill="var(--primary)" 
                    stroke="var(--highlight)" 
                    strokeWidth="2"
                  />
                  
                  {/* Helmet crest */}
                  <path 
                    d="M50 15 L45 5 L55 5 Z" 
                    fill="var(--highlight)"
                  />
                  
                  {/* Eye holes */}
                  <circle cx="35" cy="45" r="5" fill="var(--bg-dark)" />
                  <circle cx="65" cy="45" r="5" fill="var(--bg-dark)" />
                  
                  {/* Nose guard */}
                  <path 
                    d="M45 55 L50 60 L55 55" 
                    fill="none" 
                    stroke="var(--highlight)" 
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="ml-5">
                <h1 className="text-xl font-bold text-[var(--primary)]">
                  Athena Learning Center
                </h1>
                <p className="text-[var(--text-muted)] text-sm">Wisdom • Courage • Excellence</p>
              </div>
            </div>
            <p className="text-[var(--text-muted)]">
              Providing wisdom-based education since 1998. Accredited by the National Education Board.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-[var(--border)] pb-2 text-[var(--text)]">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {['About Us', 'Academics', 'Admissions', 'News & Events', 'Student Life', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-[var(--text-muted)] hover:text-[var(--primary)] hover:underline transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-[var(--border)] pb-2 text-[var(--text)]">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-[var(--text-muted)] mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-[var(--text)]">123 Wisdom Avenue, Athens, AC 54321</span>
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-[var(--text-muted)] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-[var(--text)]">(555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-[var(--text-muted)] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-[var(--text)]">wisdom@athenalearning.edu</span>
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-[var(--text-muted)] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-[var(--text)]">Mon-Fri: 7:30 AM - 4:30 PM</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-[var(--border)] pb-2 text-[var(--text)]">
              Stay Updated
            </h3>
            <p className="text-[var(--text-muted)] mb-4">
              Subscribe for wisdom insights and school updates
            </p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded bg-[var(--bg-light)] border border-[var(--border)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
              <button
                type="submit"
                className="bg-[var(--primary)] hover:bg-[var(--highlight)] text-[var(--bg-light)] font-medium py-2 px-4 rounded transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
            <div className="mt-6">
              <h4 className="font-medium mb-2 text-[var(--text)]">Follow Our Wisdom</h4>
              <div className="flex space-x-4">
                {[
                  {name: 'facebook', icon: 'F'},
                  {name: 'twitter', icon: 'T'},
                  {name: 'instagram', icon: 'I'},
                  {name: 'youtube', icon: 'Y'}
                ].map((platform) => (
                  <a 
                    key={platform.name} 
                    href="#" 
                    className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
                    aria-label={`Follow on ${platform.name}`}
                  >
                    <div className="bg-[var(--bg-light)] border border-[var(--border)] h-10 w-10 rounded-full flex items-center justify-center hover:bg-[var(--highlight)] transition-colors">
                      <span className="font-bold">{platform.icon}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright and Bottom Links */}
        <div className="border-t border-[var(--border)] mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[var(--text-muted)] text-sm">
            © {new Date().getFullYear()} Athena Learning Center. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {['Privacy Policy', 'Terms of Service', 'Accessibility', 'Sitemap'].map((item) => (
              <a 
                key={item} 
                href="#"
                className="text-[var(--text-muted)] hover:text-[var(--primary)] text-sm transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}