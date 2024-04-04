import { useContext } from "react";

import TagsContext from "../context/TagsContext";

const DropDown = () => {
  const { fields, handleCheckBoxChange } = useContext(TagsContext);
  return (
    <div>
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
      <input
        type="checkbox"
        id="Iasi"
        name="orase"
        value="Iasi"
        className="mr-2"
        checked={fields.orase.includes("Iasi")}
        onChange={(e) => handleCheckBoxChange(e, "orase")}
      />
      <label htmlFor="Iasi">Iasi</label>
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
    </div>
  );
};
export default DropDown;
