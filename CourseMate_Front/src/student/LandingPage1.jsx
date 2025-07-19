import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/courses");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-indigo-600">
                  ABC Institute of Technology
                </h1>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a
                  href="#about"
                  className="text-gray-800 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  About
                </a>
                <a
                  href="#programs"
                  className="text-gray-800 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Programs
                </a>
                <a
                  href="#placements"
                  className="text-gray-800 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Placements
                </a>
                <a
                  href="#contact"
                  className="text-gray-800 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Contact
                </a>
                <button
                  onClick={handleLoginClick}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
                >
                  Student Portal
                </button>
                <button
                  onClick={() => navigate("/admin")}
                  className="bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
                >
                  Admin Portal
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1607237138185-eedd9c632b0b')`,
          }}
        ></div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Welcome to ABC Institute of Technology
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Your future begins here — learn, build, and succeed with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleLoginClick}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Access Student Portal
            </button>
            <button
              onClick={() => navigate("/admin")}
              className="bg-gray-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Admin Portal
            </button>
            <a
              href="#programs"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors"
            >
              Explore Programs
            </a>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              🎖️ Our Achievements
            </h2>
            <p className="text-xl text-gray-600">
              Excellence in education and innovation
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-indigo-600 mb-2">
                NAAC A+
              </div>
              <div className="text-gray-700">Accredited Institution</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-indigo-600 mb-2">95%</div>
              <div className="text-gray-700">Placement Rate</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-indigo-600 mb-2">50+</div>
              <div className="text-gray-700">Research Publications in 2024</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-indigo-600 mb-2">10+</div>
              <div className="text-gray-700">International MoUs</div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              🎓 Offered Programs
            </h2>
            <p className="text-xl text-gray-600">
              Choose from our comprehensive range of programs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  B.Tech - Computer Science
                </h3>
                <p className="text-gray-600 mb-4">
                  4-year undergraduate program in computer science and
                  engineering
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-indigo-600 font-semibold">4 Years</span>
                  <span className="text-gray-500">120 Credits</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-r from-green-500 to-teal-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  B.Tech - Electronics & Communication
                </h3>
                <p className="text-gray-600 mb-4">
                  4-year undergraduate program in electronics and communication
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-indigo-600 font-semibold">4 Years</span>
                  <span className="text-gray-500">120 Credits</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-r from-orange-500 to-red-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  BBA - Business Administration
                </h3>
                <p className="text-gray-600 mb-4">
                  3-year undergraduate program in business administration
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-indigo-600 font-semibold">3 Years</span>
                  <span className="text-gray-500">90 Credits</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-r from-purple-500 to-pink-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  MBA - Master of Business Administration
                </h3>
                <p className="text-gray-600 mb-4">
                  2-year postgraduate program in business administration
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-indigo-600 font-semibold">2 Years</span>
                  <span className="text-gray-500">60 Credits</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-r from-indigo-500 to-blue-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  M.Tech - Data Science
                </h3>
                <p className="text-gray-600 mb-4">
                  2-year postgraduate program in data science and analytics
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-indigo-600 font-semibold">2 Years</span>
                  <span className="text-gray-500">60 Credits</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Placement Highlights */}
      <section id="placements" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              💼 Placement Highlights
            </h2>
            <p className="text-xl text-gray-600">
              Our students are recruited by top companies worldwide
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">
                      Company
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">
                      Students Placed
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">
                      Average Package
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">
                      Highest Package
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 hover:bg-white transition-colors">
                    <td className="py-4 px-6 font-medium text-gray-900">
                      Google
                    </td>
                    <td className="py-4 px-6 text-gray-700">5</td>
                    <td className="py-4 px-6 text-gray-700">₹25 LPA</td>
                    <td className="py-4 px-6 text-green-600 font-semibold">
                      ₹45 LPA
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-white transition-colors">
                    <td className="py-4 px-6 font-medium text-gray-900">
                      Amazon
                    </td>
                    <td className="py-4 px-6 text-gray-700">10</td>
                    <td className="py-4 px-6 text-gray-700">₹22 LPA</td>
                    <td className="py-4 px-6 text-green-600 font-semibold">
                      ₹38 LPA
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-white transition-colors">
                    <td className="py-4 px-6 font-medium text-gray-900">
                      Infosys
                    </td>
                    <td className="py-4 px-6 text-gray-700">25</td>
                    <td className="py-4 px-6 text-gray-700">₹8 LPA</td>
                    <td className="py-4 px-6 text-green-600 font-semibold">
                      ₹15 LPA
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-white transition-colors">
                    <td className="py-4 px-6 font-medium text-gray-900">TCS</td>
                    <td className="py-4 px-6 text-gray-700">30</td>
                    <td className="py-4 px-6 text-gray-700">₹7 LPA</td>
                    <td className="py-4 px-6 text-green-600 font-semibold">
                      ₹12 LPA
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">
                ABC Institute of Technology
              </h3>
              <p className="text-gray-400">
                Excellence in education and innovation since 1990
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#about"
                    className="hover:text-white transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#programs"
                    className="hover:text-white transition-colors"
                  >
                    Programs
                  </a>
                </li>
                <li>
                  <a
                    href="#placements"
                    className="hover:text-white transition-colors"
                  >
                    Placements
                  </a>
                </li>
                <li>
                  <button
                    onClick={handleLoginClick}
                    className="hover:text-white transition-colors"
                  >
                    Student Portal
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📧 info@abcit.edu</li>
                <li>📞 +91-12345-67890</li>
                <li>📍 123 Education Street, Tech City</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Facebook
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ABC Institute of Technology. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
