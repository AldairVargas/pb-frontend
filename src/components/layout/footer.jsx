import React from "react";
import { Warehouse } from "lucide-react";
import "../../index.css";

export default function footer() {
  return (
    <div className="w-full">
      <footer className=" text-black w-full">
        <div className="max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a
              href="#"
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <Warehouse className="w-8 h-8 text-black" />
              <span className="self-center text-2xl whitespace-nowrap ">
                BodegaSegura
              </span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-600 sm:mb-0">
              <li>
                <a
                  href="#"
                  className="hover:underline me-4 md:me-6 hover:text-blue-600"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:underline me-4 md:me-6 hover:text-blue-600"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:underline me-4 md:me-6 hover:text-blue-600"
                >
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline hover:text-blue-600">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-600 sm:mx-auto lg:my-8" />
          <span className="block text-sm text-gray-600 text-center">
            © 2023{" "}
            <a href="#" className="hover:underline hover:text-blue-600">
              BodegaSegura™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
