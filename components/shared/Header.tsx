import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header>
      <div className="site-brand">
        <Link href="/" className="text-5xl font-semibold">
          Short URL
        </Link>
      </div>
    </header>
  );
};

export default Header;
