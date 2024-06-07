import React from 'react';
import NavbarPopupMenu from "@/components/NavbarPopupMenu";
import Link from 'next/link';

export default function Navbar() {
  const options = [{
    name: "Home",
    href: "/" 
  }, {
    name: "About",
    href: "/about"
  }, {
    name: "My Playlist",
    href: "/myplaylists"
  }];

  return (
    <div className="bg-black p-4 sticky top-0 w-full">
      <div className="flex justify-between items-center">
        <div className="md:hidden">
          <NavbarPopupMenu options={options}/>
        </div>

        <div className="hidden md:flex space-x-4">
          {options.map((e, i) =>
            <Link
              key = {i}
              href = {e.href}
              >
              <button className="text-red-500 hover:text-white font-semibold md:border-0 antialiased rounded md:bg-transparent">{e.name}</button>
            </Link>
          )}
        </div>
        <Link href="/login">
            <button className="text-red-500 hover:text-white font-semibold md:border-0 antialiased rounded md:bg-transparent">Login</button>
        </Link>
      </div>
    </div>
  );
}