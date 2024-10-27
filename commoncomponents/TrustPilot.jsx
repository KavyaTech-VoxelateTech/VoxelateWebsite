"use client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import OrangeStar from "../../public/svgs/orangestar";
import { VscCalendar } from "react-icons/vsc";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { min } from "date-fns";
import axios from "axios";

const TrustPilot = ({ discount, startingPrice, title }) => {
  const [travellerCount, setTravellerCount] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [error, setError] = useState({});
  const tripCode = "XDW23";

  const setFieldError = (fieldName, errorMessage) => {
    setError((prevError) => ({
      ...prevError,
      [fieldName]: errorMessage,
    }));
  };

  const isValidName = (name) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone) => {
    return phone.trim() !== "";
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    if (!isValidName(name)) {
      setFieldError(
        "name",
        "Please enter a valid name containing only alphabets."
      );
      return;
    } else {
      setFieldError("name", ""); // Clear error if valid
    }

    if (!isValidEmail(email)) {
      setFieldError("email", "Please enter a valid email address.");
      return;
    } else {
      setFieldError("email", ""); // Clear error if valid
    }

    if (!isValidPhone(phone)) {
      setFieldError("phone", "Please enter a valid contact number.");
      return;
    } else {
      setFieldError("phone", ""); // Clear error if valid
    }

    const data = {
      name,
      email,
      phone,
      travellerCount,
      tripCode,
      selectedDate,
    };

    //Create an object with emailjs service_id, template_id, user_id
    const emailJSData = {
      service_id: process.env.NEXT_PUBLIC_SERVICE_ID,
      template_id: process.env.NEXT_PUBLIC_TEMPLATE_ID,
      user_id: process.env.NEXT_PUBLIC_PUBLIC_KEY,
      template_params: {
        from_name: name,
        to_name: "Admin",
        from_email: email,
        message: `
        Booking Details:
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Trip Code: ${tripCode}
        Traveller Count: ${travellerCount}
        Customized Date: ${selectedDate}
        `,
      },
    };

    //send the email using emailjs
    try {
      const res = await axios.post(
        "https://api.emailjs.com/api/v1.0/email/send",
        emailJSData
      );
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="w-full  sm:px-0 ">
        <div className="text-center py-4 px-4 sm:px-0">
          <img src="/svgs/green_star.svg" className="inline-block" />
          <p className="inline-block pl-2 font-semibold text-3xl align-middle tracking-tight">
            Trustpilot
          </p>
          <div className="mt-2 flex flex-row justify-between">
            <p className="">
              {[...Array(4)].map((_, index) => (
                <img
                  key={index}
                  src="/svgs/green_star.svg"
                  className="inline-block w-5 mr-2"
                />
              ))}
            </p>
            <p className="font-medium">Rated 4.6/5</p>
          </div>
        </div>
        <div className="mt-6 bg-customPale px-6 sm:px-4 py-4 relative rounded-xl">
          <form onSubmit={formSubmit}>
            {discount > 0 && (
              <div className="w-36 h-32 absolute overflow-clip top-0 right-0 ">
                <div className="bg-customOrange relative top-7 -right-2 rotate-45 text-sm font-light px-10 h-7 w-fit flex items-center justify-center text-nowrap text-white">
                  {discount}% Discount
                </div>
              </div>
            )}
            <div className="mt-4">
              <p className="font-semibold text-2xl sm:text-base">{title}</p>
              {/* <p className="sm:text-sm mb-3">Trip Code: XDW23</p> */}
              {/* <div className="">
                {[...Array(4)].map((_, index) => (
                  <span key={index} className="inline-block mr-2">
                    <OrangeStar className={`size-6 sm:size-4`} />
                  </span>
                ))}
                <span className="sm:text-xs">(4/5)</span>
              </div> */}
            </div>
            <div className="w-40  m-auto my-4  border-[#F7941D] pb-4">
              <p className="text-[#373737] text-xl sm:text-sm">Starts From</p>
              <p className="text-right font-bold text-4xl sm:text-3xl">
                $ {startingPrice}
              </p>
            </div>
            <hr className="bg-[#F7941D] h-1 opacity-20  w-full mx-auto" />
            {/* <div className="mt-6">
              <p className="text-[#373737]  sm:text-sm mb-3">
                Nearest Date Available
              </p>
              <div className="grid grid-cols-[1fr,4fr,4fr]">
                <div className="flex pb-1">
                  <VscCalendar className="size-8 sm:size-6  mt-auto" />
                </div>
                <div className="pl-1">
                  <p className="text-xs italic">Start Date</p>
                  <p className="tracking-tighter font-medium">June 12, 2024</p>
                </div>
                <div className="pl-3 ">
                  <p className="text-xs italic">End Date</p>
                  <p className="tracking-tighter  font-medium">June 12, 2024</p>
                </div>
              </div>
            </div> */}

            <div className="flex flex-col items-center bg-orange-100  space-y-4 rounded-md mt-6">
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Enter Your Name"
                className="w-full p-2 rounded-md"
              />
              {error.name && <p className="error">*{error.name}</p>}

              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Enter Your Email"
                className="w-full p-2 rounded-md"
              />
                {error.email && <p className="error">*{error.email}</p>}

              <input
                type="number"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                min={0}
                placeholder="Enter Your Contact Number"
                className="w-full p-2 rounded-md"
              />
                {error.phone && <p className="error">*{error.phone}</p>}
              <div className="flex flex-row items-center w-full bg-white rounded-md justify-center">
                <span className="text-gray-500 whitespace-nowrap flex-shrink-0 pl-2">
                  No. of Traveller |
                </span>
                <input
                  type="number"
                  onChange={(e) => setTravellerCount(parseInt(e.target.value))}
                  value={travellerCount}
                  min={1}
                  className="w-20 p-2 border-r text-center flex-1"
                />
                <button
                  className="bg-orange-500 rounded-r-md px-4 text-white p-2 flex-shrink-0"
                  onClick={(e) => setTravellerCount(travellerCount + 1)}
                >
                  +
                </button>
              </div>
              <div className="my-4 pt-2">
                <p className="text-[#373737] text-sm mb-2">
                  Need Customize Date?
                </p>

                <div className="flex items-center rounded-md overflow-hidden">
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    customInput={
                      <input
                        type="text"
                        className="p-2 pl-4 px-8 sm:px-0 w-full"
                        placeholder="Select your date"
                        readOnly
                      />
                    }
                  />
                  <button
                    onClick={() =>
                      document
                        .querySelector(
                          ".react-datepicker__input-container input"
                        )
                        .focus()
                    }
                    className="bg-orange-500 text-white p-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 4h10M5 11h14M5 15h14m-1 4H6a2 2 0 01-2-2V7a2 2 0 012-2h1m10 0h1a2 2 0 012 2v10a2 2 0 01-2 2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="bg-orange-500 text-white py-2 px-4 rounded-md w-full"
              >
                Book Now
              </button>
            </div>
          </form>

          <hr className="bg-[#F7941D] h-1 opacity-20  w-full mx-auto mt-6" />
          <div className="my-4">
            <p className="text-sm text-center font-medium text-[#373737]">
              SHARE THIS ON
            </p>
            <p className="flex gap-2 mt-2 justify-center">
              <FaFacebookF className="bg-customOrange text-white rounded-full p-1 w-8 h-8" />
              <FaInstagram className="bg-customOrange text-white rounded-full p-1 w-8 h-8" />
              <FaXTwitter className="bg-customOrange text-white rounded-full p-1 w-8 h-8" />
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrustPilot;
