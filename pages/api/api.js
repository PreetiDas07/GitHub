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

const fetchDirectoryData = async (fullName, branchSha) => {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${fullName}/git/trees/${branchSha}`
    );

    const paths = response.data.tree.map((item) => ({
      name: item.path,
      type: item.type,
    }));

    return paths;
  } catch (error) {
    console.error("Error fetching directory data:", error);
    return [];
  }
};

const fetchBranchData = async (fullName, branchName, branchSha) => {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${fullName}/contents?ref=${branchName}`
    );

    const branches = await Promise.all(
      response.data.map(async (branch) => {
        const commitResponse = await axios.get(
          `https://api.github.com/repos/${fullName}/commits?path=${branch.path}&sha=${branchSha}`
        );
        return {
          name: branch.name,
          type: branch.type,
          message: commitResponse.data[0]?.commit.message || "No commit message",
          sha: branch.sha,
        };
      })
    );

    return branches;
  } catch (error) {
    console.error("Error fetching branches data:", error);
    return [];
  }
};

export { fetchDirectoryData, fetchBranchData };
