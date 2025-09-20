import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm();

  // Refs for each input field
  const inputRefs = {
    firstName: useRef(),
    lastName: useRef(),
    email: useRef(),
    phone: useRef(),
    company: useRef(),
    jobTitle: useRef(),
  };

  // State for country selector
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({
    code: "GB",
    dialCode: "+44",
    flag: "🇬🇧",
  });

  // Field order for navigation
  const fieldOrder = ["firstName", "lastName", "email", "phone", "company", "jobTitle"];

  // Function to navigate between fields
  const navigateFields = (direction ) => {
    let newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    // Validar que el índice no esté fuera de rango
    if (newIndex >= 0 && newIndex < inputsRef.current.length) {
      setCurrentIndex(newIndex);
      inputsRef.current[newIndex]?.focus();
    }
  };
  // Fetch countries from API
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        navigateFields("up");
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        navigateFields("down");
      }
    };
  
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const selectCountry = (country) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
    // Focus back on phone input after selecting country
    setFocus("phone");
  };

  const onSubmit = (data) => {
    // Include the selected country code with the phone number
    const formData = {
      ...data,
      phoneCountryCode: selectedCountry.dialCode,
    };
    console.log(formData);
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-lg p-6 max-h-96 overflow-y-auto relative"
      >
        <h2 className="text-xl font-bold mb-4">
          <span className="text-pink-600 mr-2">1 →</span> Contact Details*
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          (If you're an individual looking to learn, please visit Bigsei.com instead)
        </p>

        {/* First name */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700">First name <span className="text-red-500">*</span></label>
          <input
            id="firstName"
            {...register("firstName", { required: "Please fill this in" })}
            className="border-b border-gray-300 focus:border-pink-500 w-full p-2 text-pink-400 focus:outline-none"
            placeholder="Jane"
            ref={inputRefs.firstName}
          />
          {errors.firstName && (
            <div className="mt-2 bg-red-50 p-2 rounded flex items-center">
              <span className="text-red-500 mr-2">⚠</span>
              <span className="text-red-700 text-sm">{errors.firstName.message}</span>
            </div>
          )}
        </div>

        {/* Last name */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Last name <span className="text-red-500">*</span></label>
          <input
            id="lastName"
            {...register("lastName", { required: "Please fill this in" })}
            className="border-b border-gray-300 focus:border-pink-500 w-full p-2 text-pink-400 focus:outline-none"
            placeholder="Smith"
            ref={inputRefs.lastName}
          />
          {errors.lastName && (
            <div className="mt-2 bg-red-50 p-2 rounded flex items-center">
              <span className="text-red-500 mr-2">⚠</span>
              <span className="text-red-700 text-sm">{errors.lastName.message}</span>
            </div>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Please fill this in",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
            className="border-b border-gray-300 focus:border-pink-500 w-full p-2 text-pink-400 focus:outline-none"
            placeholder="jane@example.com"
            ref={inputRefs.email}
          />
          {errors.email && (
            <div className="mt-2 bg-red-50 p-2 rounded flex items-center">
              <span className="text-red-500 mr-2">⚠</span>
              <span className="text-red-700 text-sm">{errors.email.message}</span>
            </div>
          )}
        </div>

        {/* Phone Number with Country Selector */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Phone Number <span className="text-red-500">*</span></label>
          <div className="flex">
            <div className="relative">
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 border border-gray-300 bg-white text-sm leading-4 font-medium text-gray-700 focus:outline-none"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="mr-2">{selectedCountry.flag}</span>
                <svg
                  className="h-4 w-4 text-pink-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute z-10 mt-1 w-64 bg-white shadow-lg max-h-60 rounded-md overflow-auto">
                  <ul className="py-1">
                    {countries.map((country) => (
                      <li
                        key={country.code}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                        onClick={() => selectCountry(country)}
                      >
                        <span className="mr-2">{country.flag}</span>
                        <span>{country.name}</span>
                        <span className="ml-auto text-gray-500">
                          {country.dialCode}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <input
              id="phone"
              type="tel"
              {...register("phone", { required: "Please fill this in" })}
              className="border-b border-gray-300 focus:border-pink-500 w-full p-2 text-pink-400 focus:outline-none"
              placeholder="07400 123456"
              ref={inputRefs.phone}
            />
          </div>
          {errors.phone && (
            <div className="mt-2 bg-red-50 p-2 rounded flex items-center">
              <span className="text-red-500 mr-2">⚠</span>
              <span className="text-red-700 text-sm">{errors.phone.message}</span>
            </div>
          )}
        </div>

        {/* Company */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Company <span className="text-red-500">*</span></label>
          <input
            id="company"
            {...register("company", { required: "Please fill this in" })}
            className="border-b border-gray-300 focus:border-pink-500 w-full p-2 text-pink-400 focus:outline-none"
            placeholder="Future Learn Inc."
            ref={inputRefs.company}
          />
          {errors.company && (
            <div className="mt-2 bg-red-50 p-2 rounded flex items-center">
              <span className="text-red-500 mr-2">⚠</span>
              <span className="text-red-700 text-sm">{errors.company.message}</span>
            </div>
          )}
        </div>

        {/* Job Title */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Job Title <span className="text-red-500">*</span></label>
          <input
            id="jobTitle"
            {...register("jobTitle", { required: "Please fill this in" })}
            className="border-b border-gray-300 focus:border-pink-500 w-full p-2 text-pink-400 focus:outline-none"
            placeholder="Marketing Manager"
            ref={inputRefs.jobTitle}
          />
          {errors.jobTitle && (
            <div className="mt-2 bg-red-50 p-2 rounded flex items-center">
              <span className="text-red-500 mr-2">⚠</span>
              <span className="text-red-700 text-sm">{errors.jobTitle.message}</span>
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-end space-x-2 mt-6">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 w-10 h-10 bg-pink-500 text-white rounded hover:bg-pink-600"
            onClick={() => navigateFields("up")}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 15l7-7 7 7"
              ></path>
            </svg>
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 w-10 h-10 bg-pink-500 text-white rounded hover:bg-pink-600"
            onClick={() => navigateFields("down")}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="mt-4 bg-pink-500 text-white px-6 py-2 rounded w-full font-medium hover:bg-pink-600 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
}