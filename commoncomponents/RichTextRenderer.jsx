"use client";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { format } from "date-fns";
import Link from "next/link";
const RichTextRenderer = ({ content }) => {
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        paragraph: ({ children }) => (
          <p className=" text-customGray text-base mb-4 ">{children}</p>
        ),
        heading: ({ children, level }) => {
          switch (level) {
            case 1:
              return (
                <h1 className=" text-3xl lg:text-4xl font-bold text-customOrange">
                  {children}
                </h1>
              );
            case 2:
              return (
                <h2 className="text-2xl :text-3xl font-bold mb-2 text-customOrange">
                  {children}
                </h2>
              );
            case 3:
              return (
                <h3 className="text-xl lg:text-2xl font-bold mb-2 text-customOrange">
                  {children}
                </h3>
              );
            case 4:
              return (
                <h4 className=" text-xl font-bold mb-2 text-customOrange">
                  {children}
                </h4>
              );
            case 5:
              return (
                <h5 className=" text-xl font-bold mb-2 text-customOrange ">
                  {children}
                </h5>
              );
            case 6:
              return (
                <h6 className=" text-xl font-bold mb-2 text-customOrange">
                  {children}
                </h6>
              );
            default:
              return (
                <h1 className=" text-xl font-bold text-customOrange">
                  {children}
                </h1>
              );
          }
        },
        link: ({ children, url }) => <Link className="underline text-gray-900 font-semibold" href={url}>{children}</Link>,
        image: ({ image }) => (
          <img className="w-full mb-4" src={image.url} alt={image.alternativeText} />
        ),
        list: ({children, format}) => {
          switch(format){
            case "ordered":
              return <ol className="list-decimal px-5 flex flex-col gap-1">{children}</ol>
            case "unordered": 
              return <ul className="list-disc px-5 flex flex-col gap-1">{children}</ul>
          }
        }
      }}
      modifiers={{
        bold: ({ children }) => (
          <span className="mt-2 font-semibold">{children}</span>
        ),
        italic: ({ children }) => <span className=" italic">{children}</span>,
      }}
    />
  );
};

export default RichTextRenderer;
