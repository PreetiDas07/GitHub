import axios from "axios";

export const fetchBranchesDetails = async (fullName) => {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${fullName}/branches`
    );
    console.log(response);
    return response.data; 
  } catch (error) {
    console.error("Error fetching directory data:", error);
    return []; 
  }
};