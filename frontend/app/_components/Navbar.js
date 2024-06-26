import React from "react";
import "./Navbar.css";
function Navbar({ show }) {
  return (
    <nav>
      <div className="flex justify-center items-center text-xl font-bold">
      <img
          class="w-12 h-12 rounded-full mr-4"
          src={"./images/logo.png"}
          alt="Rounded avatar"
        />
        Optimus Pay{" "}
       
      </div>
      {show && (
        <div className="w-[20%] flex justify-between">
          <a href="/">Features</a>
          <a href="/">Team</a>
          <a href="/">Contact Us</a>
        </div>
      )}
    </nav>
  );
}
export default Navbar;
