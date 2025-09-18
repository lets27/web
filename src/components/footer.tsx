const Footer = () => (
  <footer className="bg-gray-800 text-white py-12">
    <div className="container mx-auto text-center space-y-6">
      <div>
        <h4 className="text-xl font-semibold">ASOS</h4>
        <p className="text-sm">Your go-to fashion destination</p>
      </div>

      <div className="flex justify-center gap-6">
        <a href="/about" className="text-sm hover:underline">
          About Us
        </a>
        <a href="/contact" className="text-sm hover:underline">
          Contact
        </a>
        <a href="/careers" className="text-sm hover:underline">
          Careers
        </a>
      </div>

      <div className="flex justify-center gap-6">
        <a href="https://facebook.com/asos" className="text-sm hover:underline">
          Facebook
        </a>
        <a
          href="https://instagram.com/asos"
          className="text-sm hover:underline"
        >
          Instagram
        </a>
        <a href="https://twitter.com/asos" className="text-sm hover:underline">
          Twitter
        </a>
      </div>

      <div className="text-sm">
        <p>&copy; 2025 ASOS. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
