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
  });
  // string values
  const [q, setQ] = useState([""]);
  const [city, setCity] = useState([""]);
  const [county, setCounty] = useState([""]);
  const [country, setCountry] = useState("România");
  const [company, setCompany] = useState([""]);
  const [remote, setRemote] = useState([""]);
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
  }, []);

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
  const handleCheckBoxChange = (e) => {
    const { value, checked } = e.target;
    //clone the ucrrent arr
    const updatedOrase = [...fields.orase];
    if (checked) {
      // Add value to arr
      updatedOrase.push(value);
    } else {
      //Remove value from arr
      const index = updatedOrase.indexOf(value);

      if (index !== -1) {
        updatedOrase.splice(index, 1);
      }
    }
    // Update state with updated arr
    setFields((prevFields) => ({
      ...prevFields,
      orase: updatedOrase,
    }));
    setCity(updatedOrase);
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
        onChange={handleCheckBoxChange}
      />
      <label htmlFor="Bucuresti">Bucuresti</label>
      <input
        type="checkbox"
        id="Iasi"
        name="orase"
        value="Iasi"
        className="mr-2"
        checked={fields.orase.includes("Iasi")}
        onChange={handleCheckBoxChange}
      />
      <label htmlFor="Iasi">Iasi</label>
      <input
        type="checkbox"
        id="Timisoara"
        name="orase"
        value="Timisoara"
        className="mr-2"
        checked={fields.orase.includes("Timisoara")}
        onChange={handleCheckBoxChange}
      />
      <label htmlFor="Timisoara">Timisoara</label>
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
