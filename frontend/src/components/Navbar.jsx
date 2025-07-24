import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white border-gray-200 fixed top-0 w-full z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        
        {/* Logo */}
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="TraceMe Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-900">
            TraceMe
          </span>
        </a>

        {/* CTA + Hamburger */}
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
          >
            Get started
          </button>
          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-cta"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Main Nav Links */}
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-cta"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
            
            {/* Home */}
            <li>
              <a
                href="/"
                className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0"
                aria-current="page"
              >
                Home
              </a>
            </li>

            {/* Learn Dropdown */}
            <li className="relative group">
              <button
                id="dropdownNavbarLink"
                data-dropdown-toggle="dropdownNavbar"
                className="flex items-center justify-between py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto"
              >
                Learn
                <svg
                  className="w-2.5 h-2.5 ml-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1l4 4 4-4"
                  />
                </svg>
              </button>
              {/* Dropdown Content */}
              <div
                id="dropdownNavbar"
                className="absolute left-0 z-10 hidden group-hover:block font-normal bg-white border border-gray-100 rounded-lg shadow-sm w-56"
              >
                <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownNavbarLink">
                  <li>
                    <a href="/passwords" className="block px-4 py-2 hover:bg-gray-100">
                      Protect Your Accounts
                    </a>
                  </li>
                  <li>
                    <a href="/tracking" className="block px-4 py-2 hover:bg-gray-100">
                      How Cookies Track You
                    </a>
                  </li>
                  <li>
                    <a href="/fingerprinting" className="block px-4 py-2 hover:bg-gray-100">
                      What Is Fingerprinting?
                    </a>
                  </li>
                  <li>
                    <a href="/social" className="block px-4 py-2 hover:bg-gray-100">
                      Think Before You Post
                    </a>
                  </li>
                </ul>
              </div>

            </li>

            {/* Other Static Links */}
            <li>
              <a
                href="/resources"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:p-0 md:hover:text-blue-700"
              >
                Resources
              </a>
            </li>
            {/* <li>
              <a
                href="/tools"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:p-0 md:hover:text-blue-700"
              >
                Tools
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
