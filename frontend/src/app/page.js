"use client"
import React from "react";
import { FaUserCheck, FaCogs, FaCheckCircle, FaFileAlt, FaHandsHelping, FaChartLine } from "react-icons/fa";
import { AiFillFacebook, AiFillTwitterCircle, AiFillLinkedin } from "react-icons/ai";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="bg-gray-50">
      <div className="bg-white p-4">
        <p>Header</p>
      </div>
      
      {/* Banner Section */}
      <div
        className="bg-cover bg-center relative"
        style={{
          backgroundImage: "url('https://via.placeholder.com/1600x400')",
          height: "500px",
        }}
      >
        <div className="absolute inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl font-extrabold mb-4">
              Navigating Medical Appeals Made Simple
            </h1>
            <p className="text-lg mb-6">
              Expert guidance to help you achieve the support you deserve.
            </p>
            <Link 
               className="bg-teal-500 hover:bg-teal-600 text-white py-3 px-6 rounded-lg"
               href={"/login"}
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <FaUserCheck className="text-teal-500 text-5xl mx-auto mb-4" />
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                Personalized Guidance
              </h3>
              <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
              </p>
            </div>
            <div>
              <FaCogs className="text-teal-500 text-5xl mx-auto mb-4" />
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                Streamlined Processes
              </h3>
              <p className="text-gray-600">
                Our team ensures smooth and efficient case handling.
              </p>
            </div>
            <div>
              <FaCheckCircle className="text-teal-500 text-5xl mx-auto mb-4" />
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                Trusted Results
              </h3>
              <p className="text-gray-600">
                Proven success rates in resolving medical appeals.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="bg-gray-100 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <FaFileAlt className="text-teal-500 text-5xl mx-auto mb-4" />
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                Share Your Case
              </h3>
              <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitationLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
              </p>
            </div>
            <div>
              <FaHandsHelping className="text-teal-500 text-5xl mx-auto mb-4" />
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                Collaborate with Experts
              </h3>
              <p className="text-gray-600">
                Our team will manage communications and guide you step-by-step.
              </p>
            </div>
            <div>
              <FaChartLine className="text-teal-500 text-5xl mx-auto mb-4" />
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                Receive Your Outcome
              </h3>
              <p className="text-gray-600">
                Stay informed throughout the process and achieve resolution.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Let Us Help You Today</h2>
          <p className="text-gray-300 mb-6">
            Take the first step towards a smoother medical appeal process.
          </p>
          <button className="bg-teal-500 hover:bg-teal-600 text-white py-3 px-6 rounded-lg">
            Contact Us
          </button>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-gray-400 py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-center md:text-left mb-4 md:mb-0">
            &copy; 2025 Medical Appeals Assistance. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white">
              <AiFillFacebook className="text-2xl" />
            </a>
            <a href="#" className="hover:text-white">
              <AiFillTwitterCircle className="text-2xl" />
            </a>
            <a href="#" className="hover:text-white">
              <AiFillLinkedin className="text-2xl" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
