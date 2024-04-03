import { useContext, useState } from "react";
// context
import TagsContext from "../context/TagsContext";
// redux
import { useSelector, useDispatch } from "react-redux";
import { setJobs } from "../reducers/jobsSlice";
// function to create the string
import { createSearchString } from "../utils/createSearchString";
// functions to fetch the data
import { getData } from "../utils/fetchData";

const Rezults = () => {
  // redux
  const dispatch = useDispatch();
  // context
  const { q, city, remote, county, country, company, fields, removeTag } =
    useContext(TagsContext);
  // jobs
  const jobs = useSelector((state) => state.jobs.jobs);
  const total = useSelector((state) => state.jobs.total);
  const loading = useSelector((state) => state.jobs.loading);
  //state
  const [page, setPage] = useState(1);
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
      {loading && <h3>{total}</h3>}
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
export default Rezults;
