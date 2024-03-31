import { useState } from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../fetch/fetchData";

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

  // dispatch
  const dispatch = useDispatch();

  function createString(arr) {
    return arr
      .map((item) => (Array.isArray(item) ? item.join("+") : item))
      .join(",");
  }
  function createQueryString() {
    const queryParams = [];

    // Check and include q if not empty
    if (Array.isArray(q) && q.filter(Boolean).length > 0) {
      queryParams.push(`q=${createString(q).replace(/,/g, "+")}`);
    }

    // Check and include city if not empty
    if (Array.isArray(city) && city.filter(Boolean).length > 0) {
      queryParams.push(`city=${createString(city).replace(/,/g, "+")}`);
    }

    // Check and include county if not empty
    if (Array.isArray(county) && county.filter(Boolean).length > 0) {
      queryParams.push(`county=${createString(county).replace(/,/g, "+")}`);
    }
    // Check and include company if not empty
    if (Array.isArray(company) && company.filter(Boolean).length > 0) {
      queryParams.push(`company=${createString(company).replace(/,/g, "+")}`);
    }

    // Include country
    queryParams.push(`country=${country}`);

    // Check and include remote if not empty
    if (Array.isArray(remote) && remote.filter(Boolean).length > 0) {
      queryParams.push(`remote=${createString(remote).replace(/,/g, "+")}`);
    }

    // Always include page
    queryParams.push(`page=${page}`);

    return queryParams.join("&");
  }

  const handleFetchData = () => {
    fetchData(dispatch, createQueryString); // Call fetchData function with dispatch and createQueryString
  };

  return (
    <div>
      <button onClick={handleFetchData}>Click</button>
      {jobs.map((job) => (
        <p key={job.id}>{job.job_title}</p>
      ))}
    </div>
  );
};
export default Fetch;
