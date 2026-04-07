import { GitBranch, Heart } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Branding */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">C</span>
              </div>
              <span className="font-bold text-lg text-gray-900">
                ContribHunt
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Built for developers, by developers
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-brand-500 transition-colors text-sm"
                >
                  <GitBranch size={16} />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-gray-600 hover:text-brand-500 transition-colors text-sm"
                >
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Connect</h3>
            <p className="text-sm text-gray-600">
              Help developers find their next open source contribution
            </p>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-200 pt-8 flex items-center justify-between flex-col sm:flex-row gap-4">
          <p className="text-sm text-gray-600">
            © {currentYear} ContribHunt. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-sm text-gray-600">
            Made with{" "}
            <Heart size={16} className="text-brand-500 fill-brand-500" /> for
            open source
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
