import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="p-4 text-purple border-2 bottom-1">
      <div className="flex items-center  justify-between">
        <div className="flex items-center">
          <NavLink to="" className="mr-4 text-xl font-extrabold">
            Dashboard
          </NavLink>
        </div>
        <div className="flex items-center font-medium">
          <NavLink to="addProduct" className="mr-2">
            Add Product
          </NavLink>
          <NavLink to="addUtils" className="">
            Add Utils
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
