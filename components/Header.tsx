import Link from 'next/link';
import Image from 'next/image';
import NavLink from './NavLink';

const Header = () => {
  return (
    <header 
      style={{ backgroundColor: '#000000', borderColor: '#90ee90' }}  // Light green border color
      className="rounded-full w-full max-w-7xl mx-auto my-4 px-8 py-4 shadow-lg border border-2"
    >
      <div className="flex items-center justify-between w-full">
        {/* Logo on the left */}
        <Link href="/" className="flex-shrink-0">
          <Image 
            src="/logo-voxelate.png" // Path to your logo image in the public folder
            alt="Logo"
            width={150} // Adjust as needed
            height={150} // Adjust as needed
            className="cursor-pointer"
          />
        </Link>
        
        {/* Menu items on the right */}
        <nav className="flex-grow text-right">
          <ul className="flex justify-end space-x-6 text-gray-100">
            <li>
              <Link className="opacity-60 hover:opacity-100" href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="opacity-60 hover:opacity-100" href="/about-us">
                About Us
              </Link>
            </li>
            <li>
              <Link className="opacity-60 hover:opacity-100" href="/services">
                Services
              </Link>
            </li>
            <li>
              <Link className="opacity-60 hover:opacity-100" href="/portfolio">
                Portfolio
              </Link>
            </li>
            <li>
              <Link className="opacity-60 hover:opacity-100" href="/contact">
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
