import { socialLinks } from "@/data/socialLinks";
import { FaRss } from "react-icons/fa6";
import { GoMail } from "react-icons/go";

const Footer = () => {
  return (
    <footer>
      {/* footer parent div  */}
      <div className="flex flex-col gap-4 mt-20 mb-12 items-center justify-center">
        {/* top row: Subscribe & RSS */}
        <div className="flex gap-6 items-center">
          <a
            href="#"
            className="flex hover:text-gray-600 duration-300 ease-in gap-2 items-center cursor-pointer text-black"
          >
            <GoMail className="text-lg" />
            <p className="text-sm font-medium">Subscribe</p>
          </a>
          <a
            href="#"
            className="flex hover:text-gray-600 duration-300 ease-in gap-2 items-center cursor-pointer text-black"
          >
            <FaRss className="text-lg" />
            <p className="text-sm font-medium">RSS</p>
          </a>
        </div>
        {/* bottom row: Social Links */}
        <div className="flex justify-center gap-4 items-center">
          {socialLinks.map((social, index) => {
            if (!social.secondary) {
              return (
                <a
                  key={index + social.url}
                  className="text-[20px] text-black hover:text-gray-600 duration-300 ease-in"
                  href={social.url}
                >
                  <social.name />
                </a>
              );
            }
          })}
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-[30px] h-[20px] rounded-[3px]" viewBox="0 0 600 360">
              <rect width="600" height="460" fill="#006a4e" />
              <circle cx="270" cy="180" r="120" fill="#f42a41" />
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
