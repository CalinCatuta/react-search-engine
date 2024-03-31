const API_URL = "https://api.peviitor.ro/v3/search/";

// Fetch the jobs using the string created by user inputs/checkbox.
export const getData = async (createQueryString) => {
  try {
    const response = await fetch(`${API_URL}?${createQueryString}`);
    const data = await response.json();
    return {
      jobs: data.response.docs,
      total: data.response.numFound,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error to propagate it to the caller
  }
};
// get the number of jobs in Romania.
export const getNumberOfJobs = async () => {
  try {
    const response = await fetch(`${API_URL}?country=România`);
    const data = await response.json();
    return data.response.numFound;
  } catch (error) {
    console.log(error);
  }
};

// get the number of Company we have in our DB
export const getNumberOfCompany = () => {
  return fetch(`https://api.peviitor.ro/v3/logo/`)
    .then((response) => response.json())
    .then((data) => {
      return data.companies.length;
    });
};
