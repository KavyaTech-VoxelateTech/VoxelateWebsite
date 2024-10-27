"use client";
import { useState } from "react";
import Container from "./Container";
import { kaushan } from "@/utils/fonts";
const NewsLetter = () => {
  const [emailInput, setEmailInput] = useState(null);
  const handleInput = (e) => {
    setEmailInput(e.target.value);
  };
  return (
    <Container
      className={"bg-customOrange flex items-center justify-center py-16"}
    >
      <div className="space-y-8 md:w-2/3 xl:w-1/2">
        <div className="flex flex-col items-center gap-3 px-2">
          <h4
            className={`${kaushan.className} text-2xl lg:text-5xl text-white`}
          >
            Subscribe to NewsLetter
          </h4>
          <p className="text-center text-sm text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
            amet tenetur molestias! Perferendis.
          </p>
        </div>
        <form className="w-full" onSubmit={(e) => e.preventDefault()}>
          <div className="flex">
            <input
              onChange={handleInput}
              className="rounded-l-md py-2 md:py-3 px-3 md:px-6 grow outline-none placeholder:text-customGray placeholder:tracking-tighter bg-customPale text-sm"
              type="email"
              placeholder="Enter email address"
            />
            <button
              className="rounded-r-md text-white bg-customGray px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm"
              type="submit"
            >
              SUBSCRIBE
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default NewsLetter;
