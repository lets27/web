const Footer = () => (
  <footer className="bg-gray-900 text-white py-12">
    <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Brand / About */}
      <div className="text-center md:text-left space-y-2">
        <h4 className="text-2xl font-bold">letsStore</h4>
        <p className="text-sm text-gray-300">
          Elevating your style with premium fashion collections.
        </p>
      </div>

      {/* Quick Links */}
      <div className="text-center space-y-2">
        <h5 className="font-semibold text-lg">Quick Links</h5>
        <div className="flex flex-col gap-1">
          <a
            href="/about"
            className="text-gray-300 hover:text-white transition-colors"
          >
            About Us
          </a>
          <a
            href="/contact"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Contact
          </a>
          <a
            href="/careers"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Careers
          </a>
        </div>
      </div>

      {/* Social Links */}
      <div className="text-center md:text-right space-y-2">
        <h5 className="font-semibold text-lg">Follow Us</h5>
        <div className="flex justify-center md:justify-end gap-4">
          <a
            href="https://facebook.com"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Facebook
          </a>
          <a
            href="https://instagram.com"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Instagram
          </a>
          <a
            href="https://twitter.com"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Twitter
          </a>
        </div>
      </div>
    </div>

    {/* Copyright */}
    <div className="mt-10 border-t border-gray-700 pt-4 text-center text-gray-400 text-sm">
      &copy; 2025 YourBrand. All rights reserved.
    </div>
  </footer>
);

export default Footer;
