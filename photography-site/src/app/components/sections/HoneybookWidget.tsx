"use client";

import { useEffect } from "react";

const HoneyBookContactForm = () => {
  useEffect(() => {
    // Initialize `window._HB_` if it doesn't already exist
    if (!window._HB_) {
      window._HB_ = { pid: "665c777a3ef58b00084e9ffa" }; // Add your PID
    }

    // Add the HoneyBook script dynamically
    const script = document.createElement("script");
    script.src =
      "https://widget.honeybook.com/assets_users_production/websiteplacements/placement-controller.min.js";
    script.async = true;
    script.setAttribute("data-hb-pid", "665c777a3ef58b00084e9ffa");
    document.body.appendChild(script);

    // Cleanup function to remove the script on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      {/* HoneyBook Widget Container */}
      <div className="hb-p-665c777a3ef58b00084e9ffa-1 border border-gray-500 w-5/6 md:w-1/2 mx-auto"></div>
    </div>
  );
};

export default HoneyBookContactForm;
