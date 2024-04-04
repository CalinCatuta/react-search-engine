import { useEffect, useState, useContext } from "react";

import TagsContext from "../context/TagsContext";
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate and useLocation
// components
import DropDown from "./DropDown";
// redux
import { useDispatch } from "react-redux";
// functions to update the jobSlice state.
import {
  setJobs,
  clearJobs,
  setTotal,
  setNumberOfJobs,
  setNumberOfCompany,
  setLoading,
} from "../reducers/jobsSlice";
// utils fetch functions
import { createSearchString } from "../utils/createSearchString";
// functions to fetch the data
import {
  getData,
  getNumberOfJobs,
  getNumberOfCompany,
} from "../utils/fetchData";

const Fetch = () => {
  const { q, city, remote, county, country, company, removeTag, contextSetQ } =
    useContext(TagsContext);
  // fields
  const [text, setText] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // State to manage button disabled status

  // dispatch
  const navigate = useNavigate(); // Get the navigate function
  const location = useLocation(); // Get the current location
  const dispatch = useDispatch();

  // useEffect for localStorage
  useEffect(() => {
    localStorage.setItem("q", JSON.stringify(q));
    localStorage.setItem("city", JSON.stringify(city));
    localStorage.setItem("remote", JSON.stringify(remote));
    localStorage.setItem("company", JSON.stringify(company));
  }, [q, city, remote, company]);

  // useEffect to load the number of company and jobs
  useEffect(() => {
    const numbersInfo = async () => {
      const jobsNumber = await getNumberOfJobs();
      const companyNumber = await getNumberOfCompany();
      dispatch(setNumberOfJobs(jobsNumber));
      dispatch(setNumberOfCompany(companyNumber));
    };
    numbersInfo();
  }, [dispatch]);
  // Enable or disable button based on the input text
  useEffect(() => {
    setIsButtonDisabled(String(text).trim() === "");
  }, [text]);

  // Send text from input into state q.
  const handleUpdateQ = async () => {
    await contextSetQ(text);
    if (location.pathname !== "/rezultate") {
      navigate("/rezultate"); // Use navigate to redirect to "/rezult"
    }
  };
  // fetch data when states changes values
  // this make the fetch automated when checkboxes are checked or unchec
  useEffect(() => {
    if (
      q.length === 0 &&
      city.length === 0 &&
      remote.length === 0 &&
      company.length === 0
    ) {
      dispatch(clearJobs());
      dispatch(setTotal(0));
    } else {
      // fetch the data when the stats isn't empty.
      const handleFetchData = async () => {
        // send in props the values from state to create the String for fetch.
        const { jobs, total } = await getData(
          createSearchString(q, city, county, country, company, remote, 1)
        );
        dispatch(clearJobs());
        dispatch(setJobs(jobs));
        dispatch(setTotal(total));
      };
      handleFetchData();
      dispatch(setLoading());
    }
  }, [removeTag, dispatch, q, city, remote, company, country, county]);
  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText([e.target.value])}
        placeholder="Titlu jobului"
      />
      {location.pathname === "/rezultate" && ( // Conditionally render the checkboxes
        <>
          <DropDown />
        </>
      )}
      <br />
      <button onClick={handleUpdateQ} disabled={isButtonDisabled}>
        Click
      </button>
    </div>
  );
};
export default Fetch;
