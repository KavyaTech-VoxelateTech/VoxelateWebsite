import Image from 'next/image';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-between bg-black text-white px-8">
      {/* Left Side - Customer Info */}
      <div className="flex items-center ml-20"> {/* Adjust margin-left to shift the section right */}
        <div className="flex flex-col items-center"> {/* Stack images and text vertically */}
          <div className="flex -space-x-4 mb-2"> {/* Space between user images */}
            <Image 
              src="/user1.jpg" 
              alt="User 1" 
              width={100} // Increased width
              height={100} // Increased height
              className="rounded-full border-2 border-black" 
            />
            <Image 
              src="/user1.jpg" // Using the same image for User 2
              alt="User 2" 
              width={100} // Increased width
              height={100} // Increased height
              className="rounded-full border-2 border-black" 
            />
            <Image 
              src="/user1.jpg" // Using the same image for User 3
              alt="User 3" 
              width={100} // Increased width
              height={100} // Increased height
              className="rounded-full border-2 border-black" 
            />
          </div>
          {/* Moved Text Below the Images */}
          <div className="flex flex-col items-center"> {/* Center the text */}
            <p className="text-3xl font-semibold">100K+</p> {/* Increased font size */}
            <p className="text-gray-400 text-lg">Happy Customers</p> {/* Increased font size */}
          </div>
        </div>

        {/* Person Image to the Right */}
        <div className="ml-8 h-full"> {/* Set height to full */}
          <Image 
            src="/person.png" 
            alt="Person Image" 
            width={500} // Further increased width
            height={800} // Further increased height
            className="object-cover h-full" // Make the image cover the height
          />
        </div>
      </div>

      {/* Right Side - Join Now Button */}
      <div className="mr-80"> {/* Adjust margin-right to move the button to the left */}
        <Link href="/contact-us">
          <button className="bg-lime-400 text-black font-semibold px-6 py-3 rounded-full hover:bg-lime-500 transition">
            Contact Us
          </button>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
