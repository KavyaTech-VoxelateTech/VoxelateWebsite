"use client";
import { FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { FaViber } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";

import Container from "./Container";
import { useEffect, useState } from "react";
import qs from "qs";

import { usePathname } from "next/navigation";

import Link from "next/link";
import axios from "axios";
import getStrapiData from "@/utils/getStrapiData";
import { useCurrentRoute } from "@/store/useCurrentRoute";

const routes = [
  { title: "Nepal tours and trips", route: "/" },
  { title: "about us", route: "/about" },
  { title: "blog", route: "/blog" },
  { title: "contact us", route: "/contact" },
];

const GenerateBorder = (linkItem) => {
  const [isHover, setIsHover] = useState(false);
  const { currentRoute } = useCurrentRoute();
  const handleHover = () => {
    setIsHover(!isHover);
  };
  return (
    <li
      key={linkItem}
      className="cursor-pointer"
      onMouseLeave={handleHover}
      onMouseEnter={handleHover}
    >
      <Link className="mb-1" href={linkItem.route}>
        {isHover ? (
          <span
            style={{
              borderColor: currentRoute === linkItem.route && "#23231A",
            }}
            className={`uppercase  border-b-4  border-customGray`}
          >
            {linkItem.title.slice(0, 10)}
          </span>
        ) : (
          <span
            style={{
              borderColor: currentRoute === linkItem.route && "#23231A",
            }}
            className={`uppercase  border-b-4 border-transparent`}
          >
            {linkItem.title.slice(0, 10)}
          </span>
        )}
        <span className="uppercase">{linkItem.title.slice(10)}</span>
      </Link>
    </li>
  );
};

const Navbar = () => {
  const { setCurrentRoute, currentRoute } = useCurrentRoute();
  const [scrolled, setScrolled] = useState(false);
  const [data, setData] = useState(null);
  const pathName = usePathname();
  useEffect(() => {
    setCurrentRoute(pathName);
  }, [pathName]);
  const url =
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/navbar?populate[logo][populate]=true&populate[medialinks][populate][logo][populate]=true&populate[medialinks][populate][logo][fields][0]=url&populate[medialinks][populate][logo][fields][1]=name`;
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(url);
      const responseData = res.data;
      setData(responseData.data);
    };
    getData();
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      let offset = window.scrollY;
      if (offset > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <PcNavbar data={data} scrolled={scrolled} />
      <MobileNavbar data={data} scrolled={scrolled} />
    </>
  );
};
export default Navbar;

const PcNavbar = ({ scrolled, data }) => {
  const [dropDown, setDropDown] = useState(false);
  const [language, setLanguage] = useState("");

  useEffect(() => {
    setLanguage(localStorage.getItem("language"));
  }, []);
  const handleLanguageChange = (e) => {
    setLanguage((prevLan) => (prevLan === "English" ? "Nepali" : "English"));
    setDropDown(false);
    localStorage.setItem(
      "language",
      language === "English" ? "Nepali" : "English"
    );
  };
  return (
    <Container
      style={{ height: "20vh" }}
      className={`hidden lg:flex flex-col  justify-center bg-customPale py-2 space-y-4 ${
        scrolled ? "fixed" : "sticky"
      } top-0 left-0 right-0 z-50`}
    >
      {!scrolled && (
        <div className={" h-20 flex justify-between"}>
          <Link href={"/"} className="logoholder flex items-center  gap-2">
            <div className="w-14 h-14">
              <img
                className="w-full"
                src={data?.attributes?.logo?.data?.attributes?.url}
                alt="logo"
              />
            </div>
            <div className="select-none">
              <p className="font-semibold text-xl">HIMALAYAN </p>
              <p className="font-bold -mt-2 text-xl"> ENCHANTER</p>
            </div>
          </Link>

          <div className="contact_details hidden lg:flex items-center justify-between lg:w-2/3 2xl:w-1/2 gap-7">
            <div className="chat">
              <p className="text-xs text-customGray italic">
                Chat with us for support
              </p>
              <div className="flex gap-1">
                <FaWhatsapp />
                <FaViber />
                <p className="text-sm font-bold">
                  {data?.attributes?.contactNumber}
                </p>
              </div>
            </div>

            <div className="flex items-end gap-1">
              <FaEnvelope />
              <div className="flex flex-col">
                <p className="text-xs text-customGray italic">For Booking</p>
                <p className="text-sm font-bold">{data?.attributes?.email}</p>
              </div>
            </div>

            <div className="lang self-start flex flex-col items-center gap-3  w-1/6">
              <div className="flex items-center relative">
                <p className="underline">{language}</p>
                <div
                  onClick={() => setDropDown(!dropDown)}
                  className="cursor-pointer"
                >
                  {dropDown ? (
                    <IoMdArrowDropup size={20} />
                  ) : (
                    <IoMdArrowDropdown size={20} />
                  )}
                </div>
                {dropDown && (
                  <div className="absolute -bottom-8 bg-white hover:bg-gray-100 z-40 px-2 py-1 cursor-pointer">
                    <div onClick={handleLanguageChange}>
                      {language === "English" ? "Nepali" : "English"}
                    </div>
                  </div>
                )}
              </div>
              <div className="relative">
                <FaHeart size={20} />
                <div className="absolute -top-3 -right-3 w-5 h-5 rounded-full text-xs bg-customOrange border-2 border-white flex items-center justify-center text-white">
                  3
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <NavLinks
        logo={data?.attributes?.logo?.data?.attributes?.url}
        scrolled={scrolled}
      />
    </Container>
  );
};
const NavLinks = ({ scrolled, logo }) => {
  const [mediaLinks, setMediaLinks] = useState([]);
  const linkQuery = qs.stringify({
    populate: {
      links: {
        populate: {
          logo: { populate: true, fields: ["url"] },
        },
      },
    },
  });

  const { currentRoute } = useCurrentRoute();
  useEffect(() => {
    const getData = async () => {
      const { data } = await getStrapiData("/api/social-link", linkQuery);
      setMediaLinks(data?.attributes?.links);
    };
    getData();
  }, []);
  return (
    <div className="flex  justify-between items-center gap-4 font-semibold px-4 ">
      <div className="w-full lg:w-4/5 xl:w-3/5">
        <ul className="flex justify-between items-center pt-1">
          {scrolled && (
            <li key={"list"} className="h-12 w-12">
              <Link href={"/"}>
                <img
                  className="w-full h-full"
                  src={logo}
                  alt=""
                />
              </Link>
            </li>
          )}
          {routes.map((link, index) =>
            link.title.length <= 15 ? (
              <li
                style={{
                  borderColor: currentRoute === link.route && "#23231A",
                }}
                key={index}
                className="uppercase cursor-pointer border-b-4 border-transparent hover:border-customGray"
              >
                <Link href={link.route}>{link.title}</Link>
              </li>
            ) : (
              GenerateBorder(link)
            )
          )}
        </ul>
      </div>
      <div className="flex items-center gap-2 ">
        <p className="hidden xl:block">FOLLOW US ON: </p>
        <div className="flex gap-2">
          {mediaLinks?.map((link, index) => (
            <Link key={index} href={link.url} target="_blank" className="">
              <img
                className="w-10 h-10 bg-customOrange select-none p-2 rounded-full"
                src={link?.logo?.data?.attributes?.url}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const MobileNavbar = ({ scrolled, data }) => {
  const [showNavLinks, setShowNavLinks] = useState(false);
  return (
    <div
      className={`lg:hidden w-full ${
        scrolled ? "fixed" : "sticky"
      } top-0 right-0 z-50`}
    >
      <Container className="flex bg-customPale py-4 items-center justify-between ">
        <div className="logoholder flex items-center  gap-2">
          <Link href={"/"} className="h-10 w-10">
            <img
              className="w-full"
              src={data?.attributes?.logo?.data?.attributes?.url}
              alt="logo"
            />
          </Link>
          <div>
            <p className="font-semibold ">HIMALAYAN</p>
            <p className="font-bold -mt-2 "> ENCHANTER</p>
          </div>
        </div>
        <div onClick={() => setShowNavLinks((prev) => !prev)}>
          {showNavLinks ? (
            <RxCross2 size={30} />
          ) : (
            <RxHamburgerMenu size={30} />
          )}
        </div>
      </Container>
      {showNavLinks && <MobileNavLinks setShowNavLinks={setShowNavLinks} />}
    </div>
  );
};

const MobileNavLinks = ({ setShowNavLinks }) => {
  return (
    <ul className=" absolute top-full left-0 right-0 h-screen bg-customGray text-white px-6 py-6 flex flex-col gap-4 rounded-sm">
      {routes.map((route, index) => (
        <Link
          onClick={() => setShowNavLinks(false)}
          key={index}
          href={route.route}
        >
          <li className="text-xl uppercase select-none border-b-2 border-gray-100 border-opacity-30 pb-1">
            {route.title}
          </li>
        </Link>
      ))}
    </ul>
  );
};
