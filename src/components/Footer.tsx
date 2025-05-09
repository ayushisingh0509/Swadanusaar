
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="inline-flex items-center space-x-2 text-cuisine-green mb-4">
              <div className="h-6 w-6">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 6C8.68629 6 6 8.68629 6 12H18C18 8.68629 15.3137 6 12 6Z" fill="currentColor"/>
                  <path d="M8 15H16V17C16 18.1046 15.1046 19 14 19H10C8.89543 19 8 18.1046 8 17V15Z" fill="currentColor"/>
                  <path d="M10.5 11C10.5 11.8284 9.82843 12.5 9 12.5C8.17157 12.5 7.5 11.8284 7.5 11C7.5 10.1716 8.17157 9.5 9 9.5C9.82843 9.5 10.5 10.1716 10.5 11Z" fill="currentColor"/>
                  <path d="M16.5 11C16.5 11.8284 15.8284 12.5 15 12.5C14.1716 12.5 13.5 11.8284 13.5 11C13.5 10.1716 14.1716 9.5 15 9.5C15.8284 9.5 16.5 10.1716 16.5 11Z" fill="currentColor"/>
                </svg>
              </div>
              <span className="font-display font-bold text-lg">CuisineConnect</span>
            </Link>
            <p className="text-gray-600 text-sm">
              Bridging the gap between cooks and customers for healthier meals and less food waste.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-4">Features</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li><Link to="/select-dish" className="hover:text-cuisine-green">Select Dishes</Link></li>
              <li><Link to="/pantry" className="hover:text-cuisine-green">Pantry Management</Link></li>
              <li><Link to="/suggestions" className="hover:text-cuisine-green">Recipe Suggestions</Link></li>
              <li><Link to="#" className="hover:text-cuisine-green">Notifications</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li><Link to="#" className="hover:text-cuisine-green">Blog</Link></li>
              <li><Link to="#" className="hover:text-cuisine-green">Help Center</Link></li>
              <li><Link to="#" className="hover:text-cuisine-green">Community</Link></li>
              <li><Link to="#" className="hover:text-cuisine-green">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-4">Newsletter</h3>
            <p className="text-gray-600 text-sm mb-4">
              Subscribe to our newsletter for the latest updates and recipes.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 rounded-l-md border border-gray-300 py-2 px-3 text-sm"
              />
              <button
                type="submit"
                className="rounded-r-md bg-cuisine-green px-4 py-2 font-medium text-white hover:bg-cuisine-green/90 text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-8">
          <div className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} CuisineConnect. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
