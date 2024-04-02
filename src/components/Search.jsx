import { useEffect, useState, useContext } from "react";
import TagsContext from "../context/TagsContext";
// redux
import { useDispatch } from "react-redux";
// functions to update the jobSlice state.
import {
  setJobs,
  clearJobs,
  setTotal,
  setNumberOfJobs,
  setNumberOfCompany,
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
  const {
    q,
    city,
    remote,
    county,
    country,
    company,
    fields,
    handleCheckBoxChange,
    removeTag,
    contextSetQ,
  } = useContext(TagsContext);
  // fields
  const [text, setText] = useState("");

  // dispatch
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

  // fetch data on click
  const handleFetchData = async () => {
    contextSetQ(text);
    // send in props the values from state to create the String for fetch.
    const { jobs, total } = await getData(
      createSearchString(q, city, county, country, company, remote, 1)
    );
    dispatch(clearJobs());
    dispatch(setJobs(jobs));
    dispatch(setTotal(total));
  };
  // fetch on remove tags
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
      const fetchDataOnTags = async () => {
        const { jobs, total } = await getData(
          createSearchString(q, city, county, country, company, remote, 1)
        );
        dispatch(clearJobs());
        dispatch(setJobs(jobs));
        dispatch(setTotal(total));
      };
      fetchDataOnTags();
    }
  }, [removeTag, dispatch, q, city, remote, company, country, county]);
  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText([e.target.value])}
        placeholder="Title"
      />
      <input
        type="checkbox"
        id="Bucuresti"
        name="orase"
        value="Bucuresti"
        className="mr-2"
        checked={fields.orase.includes("Bucuresti")}
        onChange={(e) => handleCheckBoxChange(e, "orase")}
      />
      <label htmlFor="Bucuresti">Bucuresti</label>
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
      <br />
      <button onClick={handleFetchData}>Click</button>
    </div>
  );
};
export default Fetch;
