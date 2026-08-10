import { navData } from "@/constants/nav";
import Link from "next/link";
const Header = () => {
  return (
    <div className="flex flex-row items-center justify-between sm:justify-start sm:space-x-8 py-6 sticky top-0 z-50 bg-white">
      <div>
        <Link href="/">
          <h3 className="cursor-pointer font-bold text-black text-[18px] tracking-widest hover:text-brand-hover transition-colors duration-200">
            ROUSHAN<span className="hidden sm:inline">SHEIK</span>
          </h3>
        </Link>
      </div>
      <div className={"flex space-x-4 sm:space-x-6 text-[11px] sm:text-[13px] text-gray-500 font-medium"}>
        {navData.map((nav) => (
          <Link href={nav.path} key={nav.id}>
            <p className={"uppercase hover:text-brand-hover/70 transition-colors duration-200"}>{nav.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Header;
