import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <nav className="bg-gray-800 text-white p-4 flex justify-end">
      <ul className="flex gap-4 items-center">
        <li>
          <Link to="product" className="hover:text-gray-300 text-black">Products</Link>
        </li>
        <li>
          <Link to="cart" className="hover:text-gray-300 text-black">Cart</Link>
        </li>
        <li>
          <Link to="order" className="hover:text-gray-300 text-black">Order</Link>
        </li>
      </ul>
    </nav>
    <Outlet />
    </div>
  );
};

export default Navbar;
