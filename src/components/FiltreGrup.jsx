import React, { useContext, useState } from "react";

import TagsContext from "../context/TagsContext";
import sageata from "../assets/svg/arrow_bottom.svg";
// scss
import "../scss/filtre.scss";

const FiltreGrup = () => {
  // Destructuring fields and handleCheckBoxChange from the context
  const { fields, handleCheckBoxChange } = useContext(TagsContext);

  // State for dropdown visibility
  const [dropDown, setDropDown] = useState([false, false, false]);

  // Function to handle dropdown toggle
  function handleDropDown(index) {
    // Toggling the visibility of dropdown at specified index
    const updatedDropDown = dropDown.map((item, i) =>
      i === index ? !item : item
    );
    setDropDown(updatedDropDown);
  }

  // Rendering the component
  return (
    <div className="drop-down-parent">
      {/* Mapping through each dropdown */}
      {dropDown.map((isOpen, index) => (
        <div key={index}>
          {/* Button for toggling the dropdown */}
          <button className="drop-down" onClick={() => handleDropDown(index)}>
            {/* Dynamically set button label based on index */}
            {index === 0
              ? "Oras"
              : index === 1
              ? "Companie"
              : "Mod de lucru"}{" "}
            {/* Arrow icon for indicating dropdown state */}
            <img
              src={sageata}
              className={`arrow-bottom ${isOpen ? "up" : ""}`}
              alt="drop-down"
            />
          </button>
          {/* Dropdown container */}
          <div className={`drop-down-container ${isOpen ? "open" : ""}`}>
            {/* Dynamically rendering checkbox based on index */}
            {index === 0 && (
              <React.Fragment>
                <input
                  type="checkbox"
                  id="București"
                  name="orase"
                  value="București"
                  className="mr-2"
                  checked={fields.orase.includes("București")}
                  onChange={(e) => handleCheckBoxChange(e, "orase")}
                />
                <label htmlFor="București">București</label>
              </React.Fragment>
            )}
            {index === 1 && (
              <React.Fragment>
                <input
                  type="checkbox"
                  id="AxonSoft"
                  name="company"
                  value="AxonSoft"
                  className="mr-2"
                  checked={fields.company.includes("AxonSoft")}
                  onChange={(e) => handleCheckBoxChange(e, "company")}
                />
                <label htmlFor="AxonSoft">AxonSoft</label>
              </React.Fragment>
            )}
            {index === 2 && (
              <React.Fragment>
                <input
                  type="checkbox"
                  id="Remote"
                  name="remote"
                  value="Remote"
                  className="mr-2"
                  checked={fields.remote.includes("Remote")}
                  onChange={(e) => handleCheckBoxChange(e, "remote")}
                />
                <label htmlFor="Remote">Remote</label>
              </React.Fragment>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FiltreGrup;
