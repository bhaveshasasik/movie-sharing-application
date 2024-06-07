'use client';

import React, {useState} from 'react';

type MenuOption = {
  name: string,
  href: string
}

export default function NavbarPopupMenu(params: {options : MenuOption[]}) {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative flex">
      {/* Menu button */}
      <button
        onClick={toggleMenu}
        className="md:hidden text-black p-2 rounded focus:outline-none"
      >
        &#9776;
      </button>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 filter z-50">
          <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-4 transform translate-x-0 space-y-2">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-800 p-2 focus:outline-none"
            >
              &#9776;
            </button>

            <ul className="pl-4 space-y-2">
              {params.options.map((e, i) =>
                <li key={i}>
                  <a href={e.href} className="text-black-500 hover:underline">{e.name}</a>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}