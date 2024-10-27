import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <header style={{ backgroundColor: '#000000' }}>
      <div className="max-w-4xl mx-auto flex items-center justify-between p-4">
        <Link href="/">
          <Image 
            src="/logo-voxelate.png" // Path to your logo image in the public folder
            alt="Logo"
            width={200} // Adjust as needed
            height={200} // Adjust as needed
            className="cursor-pointer"
          />
        </Link>
        <nav>
          <ul className="flex space-x-4 text-gray-400 ">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about-us">About Us</Link>
            </li>
            <li>
              <Link href="/services">Services</Link>
            </li>
            <li>
              <Link href="/portfolio">Porfolio</Link>
            </li>
            <li>
              <Link href="/">Contact Us</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;