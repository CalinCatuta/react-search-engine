import { useEffect, useState, useContext } from "react";
import TagsContext from "../context/TagsContext";
// redux
import { useSelector, useDispatch } from "react-redux";
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
    city,
    remote,
    county,
    country,
    company,
    fields,
    handleCheckBoxChange,
    removeTag,
  } = useContext(TagsContext);
  // fields
  const [q, setQ] = useState([]);
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
      createSearchString(q, city, county, country, company, remote, 1)
    );
    dispatch(clearJobs());
    dispatch(setJobs(jobs));
    dispatch(setTotal(total));
  };
  // fetch more data changing the page value
  async function fetchMoreData() {
    const nextPage = page + 1;
    const { jobs } = await getData(
      createSearchString(q, city, county, country, company, remote, nextPage)
    );
    dispatch(setJobs(jobs));
    setPage(nextPage);
  }

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
      <h3>{total}</h3>
      {Object.keys(fields).map((key) => {
        const currentArray = fields[key];
        return (
          currentArray.length > 0 &&
          currentArray.map((item) => (
            <div key={item}>
              <h3>{item}</h3>
              {/* Call removeTag with the specific type and value */}
              <button onClick={() => removeTag(key, item)}>X</button>
            </div>
          ))
        );
      })}
      {jobs.map((job) => (
        <p key={job.id}>{job.job_title}</p>
      ))}
      {total <= 10 ||
        (jobs.length === total ? null : (
          <button onClick={fetchMoreData}>Mai multe</button>
        ))}
    </div>
  );
};
export default Fetch;
