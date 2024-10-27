import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import Container from "./Container";
import getStrapiData from "@/utils/getStrapiData";
import qs from "qs";
import Link from "next/link";

export default async function Footer() {
  const footerQuery = qs.stringify({
    populate: {
      footerLinks: {
        populate: {
          links: { populate: true },
        },
      },
    },
  });
  const linkQuery = qs.stringify({
    populate: {
      links: {
        populate: {
          logo: { populate: true, fields: ["url"] },
        },
      },
    },
  });
  const { data: mediaData } = await getStrapiData(
    "/api/social-link",
    linkQuery
  );
  const { data: footerData } = await getStrapiData("/api/footer", footerQuery);
  const footerLinks = footerData?.attributes?.footerLinks;
  const mediaLinks = mediaData?.attributes?.links;

  return (
    <>
      <Container className={"bg-customGray text-white"}>
        <div className="flex flex-row justify-between pt-20 pb-10 border-b border-gray-700">
          <div className="logo flex flex-row gap-2 items-center justify-center">
            <img src="/logo.svg" alt="" className="w-14 h-14" />
            <div className="font-medium">
              <p className="tracking-wide">HIMALAYAN</p>
              <p>ENCHANTER</p>
            </div>
          </div>
          <div>
            <p className="tracking-tight">FOLLOW US ON:</p>
            <p className="flex gap-2 mt-2 justify-center">
              {mediaLinks?.map((link) => (
                <a href={link.url} target="_blank" key={link.id} className="">
                  <img
                    className="w-10 h-10 bg-white p-2 rounded-full"
                    src={link?.logo?.data?.attributes?.url}
                  />
                </a>
              ))}
            </p>
          </div>
        </div>
        <div className="grid grid-rows-2 grid-cols-2 gap-4 sm:grid-rows-1 sm:grid-cols-4  my-4">
          {footerLinks?.map((item) => (
            <div key={item}>
              <h3 className="text-2xl">{item?.title}</h3>
              <ul className="">
                {item?.links?.map((link) => {
                  return (
                    <li key={link.id}>
                      <Link
                        className="text-xs hover:underline uppercase"
                        href={link.url}
                      >
                        {link?.listText}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <div className="py-4">
          <p className="text-center">© 2024, Heaven Himalaya Treks</p>
        </div>
      </Container>
    </>
  );
}
