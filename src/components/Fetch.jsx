import { useEffect } from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
import {
  setJobs,
  setTotal,
  setNumberOfJobs,
  setNumberOfCompany,
} from "../reducers/jobsSlice";
// utils fetch functions
import { createSearchString } from "../utils/createSearchString";
import {
  getData,
  getNumberOfJobs,
  getNumberOfCompany,
} from "../utils/fetchData";

const Fetch = () => {
  // redux state
  // string values
  const q = useSelector((state) => state.string.q);
  const city = useSelector((state) => state.string.city);
  const county = useSelector((state) => state.string.county);
  const country = useSelector((state) => state.string.country);
  const company = useSelector((state) => state.string.company);
  const remote = useSelector((state) => state.string.remote);
  const page = useSelector((state) => state.string.page);
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

  const handleFetchData = async () => {
    const { jobs, total } = await getData(
      createSearchString(q, city, county, country, company, remote, page)
    );
    dispatch(setJobs(jobs));
    dispatch(setTotal(total));
  };

  return (
    <div>
      <h3>
        Avem {totalJobs} de oportunități în România de la {totalCompany} firme
      </h3>
      <button onClick={handleFetchData}>Click</button>
      <h3>{total}</h3>
      {jobs.map((job) => (
        <p key={job.id}>{job.job_title}</p>
      ))}
    </div>
  );
};
export default Fetch;
