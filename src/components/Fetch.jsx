import { useEffect, useState } from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
// functions to update the jobSlice state.
import {
  setJobs,
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
  // fields
  const [fields, setFields] = useState({
    orase: [],
    remote: [],
    companie: [],
    experienta: [],
  });
  // string values
  const [q, setQ] = useState([""]);
  const [city, setCity] = useState([""]);
  const [remote, setRemote] = useState([""]);
  const [county] = useState([""]);
  const [country] = useState("România");
  const [company, setCompany] = useState([""]);
  const [page, setPage] = useState(1);
  // jobs
  const jobs = useSelector((state) => state.jobs.jobs);
  const total = useSelector((state) => state.jobs.total);
  const totalJobs = useSelector((state) => state.jobs.totalJobs);
  const totalCompany = useSelector((state) => state.jobs.totalCompany);

  // dispatch
  const dispatch = useDispatch();

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
    // send in props the values from state to create the String for fetch.
    const { jobs, total } = await getData(
      createSearchString(q, city, county, country, company, remote, page)
    );
    dispatch(setJobs(jobs));
    dispatch(setTotal(total));
  };
  // take data from checkbox
  const handleCheckBoxChange = (e, type) => {
    const { value, checked } = e.target;

    // Clone the current array
    const updatedArray = [...fields[type]];

    if (checked) {
      // Add value to array
      updatedArray.push(value);
    } else {
      // Remove value from array
      const index = updatedArray.indexOf(value);
      if (index !== -1) {
        updatedArray.splice(index, 1);
      }
    }
    // Update state with updated array
    setFields((prevFields) => ({
      ...prevFields,
      [type]: updatedArray,
    }));
    // Update the state for string creation.
    if (type === "orase") {
      setCity(updatedArray);
    } else if (type === "remote") {
      setRemote(updatedArray);
    } else if (type === "companie") {
      setCompany(updatedArray);
    }
  };

  return (
    <div>
      <h3>
        Avem {totalJobs} de oportunități în România de la {totalCompany} firme
      </h3>
      <input
        type="text"
        value={q}
        onChange={(e) => setQ([e.target.value])}
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
        name="companie"
        value="AxonSoft"
        className="mr-2"
        checked={fields.companie.includes("AxonSoft")}
        onChange={(e) => handleCheckBoxChange(e, "companie")}
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
      <h3>{total}</h3>
      {jobs.map((job) => (
        <p key={job.id}>{job.job_title}</p>
      ))}
    </div>
  );
};
export default Fetch;
