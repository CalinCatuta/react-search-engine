import { setJobs } from "../reducers/jobsSlice"; // Adjust the path as needed

export async function fetchData(dispatch, createQueryString) {
  const stringFromInput = createQueryString();
  const API_URL = "https://api.peviitor.ro/v3/search/";
  try {
    const response = await fetch(`${API_URL}?${stringFromInput}`);
    console.log(`${API_URL}?${stringFromInput}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.text(); // Get response as text

    // Check if response is not empty
    if (responseData.trim() !== "") {
      const parsedData = JSON.parse(responseData); // Parse JSON data
      if (parsedData && parsedData.response && parsedData.response.docs) {
        const docs = parsedData.response.docs; // Accessing the docs array
        dispatch(setJobs(docs)); // Dispatch setJobs action to update Redux state
      } else {
        console.log("Response data structure is unexpected");
      }
    } else {
      console.log("Empty response received");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
