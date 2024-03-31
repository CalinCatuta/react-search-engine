const API_URL = "https://api.peviitor.ro/v3/search/";

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
