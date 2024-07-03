import { navData } from "@/constants/nav";
import Link from "next/link";
const Header = () => {
  return (
    <div className="flex  items-center justify-between lg:justify-start space-x-8 py-6 ">
      <div>
        <Link href="/">
          <h3 className="cursor-pointer font-bold   text-[18px]">
            ROUSHAN<span className="text-blue-400">S</span>HEIK
          </h3>
        </Link>
      </div>
      <div className={"flex lg:space-x-4 space-x-4 lg:text-base text-[12px] "}>
        {navData.map((nav) => (
          <Link href={nav.path} key={nav.id}>
            <p>{nav.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Header;
