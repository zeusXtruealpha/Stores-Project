
import React from 'react';
import { Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="text-gray-900 text-xl font-bold">
              INDIAN<br />
              SCHOOL FOR<br />
              MODERN<br />
              LANGUAGES
              <div className="text-sm font-normal mt-2 text-gray-600">
                IYPAN Educational Centre Pvt Ltd
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p>8/3, Athreyapuram 2nd Street,</p>
              <p>Choolaimedu, Chennai - 600094</p>
              <p>7338881781 / 7338880780</p>
              <p>IYPAN Educational Centre Private Limited.</p>
            </div>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4 pt-4">
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                <Linkedin className="w-5 h-5 text-gray-600" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                <span className="text-lg font-bold text-gray-600">X</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                <span className="text-lg font-bold text-gray-600">IG</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                <Youtube className="w-5 h-5 text-gray-600" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Our Centres</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Elite Card</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-gray-900 text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Course Details</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Franchise</a></li>
            </ul>
          </div>

          {/* Languages */}
          <div>
            <h3 className="text-gray-900 text-lg font-semibold mb-4">Languages</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">French</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">German</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Japanese</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-gray-600">
          <p>© 2025 IYPAN Educational Centre Private Limited - All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
