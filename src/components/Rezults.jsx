import { useContext, useState } from "react";
// components
import Job from "./Job";
import FaraRezultate from "./FaraRezultate";
// icons
import scrollUp from "../assets/images/scroll-up.png";
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
    <div className="rezults-container">
      {loading && (
        <h3 className="total-rezultate">
          {total} {total !== 0 ? "de" : ""} rezultate
        </h3>
      )}
      <div className="taguri-container">
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
      </div>
      {jobs.length > 0 ? (
        <div className="cards-containter">
          {jobs.map(
            (
              { city, company, country, county, job_link, job_title, remote },
              idx
            ) => (
              <Job
                key={idx}
                city={city}
                company={company}
                country={country}
                county={county}
                job_link={job_link}
                job_title={job_title}
                remote={remote}
              />
            )
          )}
        </div>
      ) : (
        <FaraRezultate />
      )}
      {total <= 10 ||
        (jobs.length === total ? null : (
          <button className="load-more" onClick={fetchMoreData}>
            Incarca mai multe
          </button>
        ))}
      <button className="scrol-up">
        <img src={scrollUp} alt="scroll-up" />
      </button>
    </div>
  );
};
export default Rezults;
