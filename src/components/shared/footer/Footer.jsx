import { socialLinks } from "@/data/socialLinks";
import { FaRegHeart } from "react-icons/fa6";
import { GoMail } from "react-icons/go";

const Footer = () => {
  return (
    <footer>
      {/* footer parent div  */}
      <div className="flex lg:flex-row gap-8 mt-20 mb-12 lg:gap-0 justify-between items-center flex-col  ">
        {/* left box  */}
        <div className="flex lg:flex-1 gap-4 items-center">
          <div className="">
            <a
              href="#"
              className="flex hover:primary_yellow duration-300 ease-in gap-2 items-center cursor-pointer"
            >
              <GoMail />
              <p className="text-base black-secondary">Subscribe</p>
            </a>
          </div>
          <div>
            <a
              href="#"
              className="flex hover:primary_yellow duration-300 ease-in gap-2 items-center cursor-pointer"
            >
              <FaRegHeart />
              <p className="text-base black-secondary">Support</p>
            </a>
          </div>
        </div>
        {/* center box  */}
        <div className="flex  lg:flex-1 justify-center gap-4 items-center">
          {socialLinks.map((social, index) => {
            if (!social.secondary) {
              return (
                <a
                  key={index + social}
                  className="text-[24px] hover:primary_yellow duration-300 ease-in"
                  href={social.url}
                >
                  {" "}
                  {<social.name />}
                </a>
              );
            }
          })}
        </div>
        {/* right box  */}
        <div className=" flex-1 block">
          <p className="text-center lg:text-nowrap lg:text-start text-wrap">
            Copyright © 2024 Roushan Sheik. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
