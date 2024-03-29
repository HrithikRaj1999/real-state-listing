// About.tsx
import React from "react";
import { Link } from "react-router-dom";
// Include other necessary imports

const About: React.FC = () => {
  return (
    <div className="bg-gray-100">
      <div className="py-16 overflow-hidden lg:py-24">
        <div className="relative max-w-xl h-screen mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
          <svg
            className="hidden lg:block absolute left-full transform -translate-x-1/2 -translate-y-1/4"
            width={404}
            height={784}
            fill="none"
            viewBox="0 0 404 784"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="b1f8e1a2-1f4e-4d7e-a45e-6a2d2acbcf70"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={784}
              fill="url(#b1f8e1a2-1f4e-4d7e-a45e-6a2d2acbcf70)"
            />
          </svg>

          <div className="relative">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
              About PropertyHub
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              PropertyHub is a premier online destination for individuals
              looking to find their perfect home, whether for rent or purchase.
              We bridge the gap between homeowners and potential buyers or
              tenants, making the journey from searching to signing a lease or
              ownership as smooth as possible.
            </p>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-x-16 sm:gap-y-24 lg:grid-cols-3 lg:gap-x-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Our Mission
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  To empower property seekers with comprehensive, up-to-date
                  information and homeowners with a straightforward, efficient
                  platform to list their properties.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  What We Offer
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  From cozy studios to expansive homes, our diverse listings are
                  updated regularly to reflect the latest market offerings,
                  ensuring you find a place that feels like home.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Get in Touch
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  Have questions? Our dedicated support team is just a click
                  away. Reach out today and take the first step towards your new
                  home.
                </p>
                <Link
                  to="/contactUs"
                  className="mt-3 text-base font-medium text-blue-600 hover:text-blue-500"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
