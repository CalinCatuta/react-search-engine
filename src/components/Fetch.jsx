// redux
import { useSelector, useDispatch } from "react-redux";
import { setJobs, setTotal } from "../reducers/jobsSlice";
// utils fetch functions
import { createSearchString } from "../utils/createSearchString";
import { getData } from "../utils/fetchData";

const Fetch = () => {
  // redux state
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

  // dispatch
  const dispatch = useDispatch();

  const handleFetchData = async () => {
    const { jobs, total } = await getData(
      createSearchString(q, city, county, country, company, remote, page)
    );
    dispatch(setJobs(jobs));
    dispatch(setTotal(total));
  };

  return (
    <div>
      <button onClick={handleFetchData}>Click</button>
      <h2>{total}</h2>
      {jobs.map((job) => (
        <p key={job.id}>{job.job_title}</p>
      ))}
    </div>
  );
};
export default Fetch;
