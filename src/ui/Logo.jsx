import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="flex h-12 items-center justify-center py-8">
      <Link to={"/"}>
        <span className="text-sm font-bold text-[#6439ff] dark:text-gray-50 md:text-2xl">
          BoOAsis
        </span>
        {/* <img src="/logo.png" alt="" className="w-14" /> */}
      </Link>
    </div>
  );
};

export default Logo;
