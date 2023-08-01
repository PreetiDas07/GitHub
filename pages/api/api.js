const fetchReadme = async (fullRepoName, accessToken) => {
  try {
    const headers = {
      Authorization: `token ${accessToken}`,
    };
    const response = await fetch(
      `https://api.github.com/repos/${fullRepoName}/readme`,
      {
        headers,
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to fetch README: ${errorMessage}`);
    }

    const data = await response.json();
    if (!data.content) {
      throw new Error("README content not found");
    }

    const decodedContent = decodeBase64(data.content);

    return decodedContent;
  } catch (error) {
    console.error("Error fetching README:", error);
    return null;
  }
};

const decodeBase64 = (input) => {
  try {
    const decoded = atob(input);
    return decoded;
  } catch (error) {
    console.error("Base64 decoding error:", error);
    return null;
  }
};
export { fetchReadme };

import axios from "axios";

export const fetchBranchesDetails = async (fullName, accessToken) => {
  try {
    const headers = {
      Authorization: `token ${accessToken}`,
    };
    const response = await axios.get(
      `https://api.github.com/repos/${fullName}/branches`,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching directory data:", error);
    return [];
  }
};

export const fetchTagsData = async (fullName, accessToken) => {
  try {
    const headers = {
      Authorization: `token ${accessToken}`,
    };
    const response = await axios.get(
      `https://api.github.com/repos/${fullName}/tags`,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching directory data:", error);
    return [];
  }
};

export const fetchCommits = async (
  fullName,
  selectedBranchName,
  accessToken,
  perPage = 100
) => {
  try {
    const headers = {
      Authorization: `token ${accessToken}`,
    };
    const allCommits = [];
    let page = 1;

    while (true) {
      const response = await axios.get(
        `https://api.github.com/repos/${fullName}/commits`,
        {
          params: {
            sha: selectedBranchName,
            page,
            per_page: perPage,
          },
          headers,
        }
      );

      const commitsData = response.data;
      if (commitsData.length === 0) {
        break;
      }

      allCommits.push(...commitsData);
      page++;
    }

    return allCommits;
  } catch (error) {
    console.error("Error fetching directory data:", error);
    return [];
  }
};

const fetchDirectoryData = async (fullName, directorySha, accessToken) => {
  try {
    const headers = {
      Authorization: `token ${accessToken}`,
    };
    const response = await axios.get(
      `https://api.github.com/repos/${fullName}/git/trees/${directorySha}`,
      {
        headers,
      }
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

const fetchBranchData = async (
  fullName,
  selectedBranchName,
  branchSha,
  accessToken
) => {
  try {
    const headers = {
      Authorization: `token ${accessToken}`,
    };
    const response = await axios.get(
      `https://api.github.com/repos/${fullName}/contents?ref=${selectedBranchName}`,
      {
        headers,
      }
    );

    const branches = await Promise.all(
      response.data.map(async (branch) => {
        const commitResponse = await axios.get(
          `https://api.github.com/repos/${fullName}/commits?path=${branch.path}&sha=${branchSha}`,
          {
            headers,
          }
        );
        const commitMessage =
          commitResponse.data[0]?.commit.message || "No commit message";
        const truncatedMessage = truncateMessage(commitMessage, 100);
        return {
          name: branch.name,
          type: branch.type,
          message: truncatedMessage,
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

const truncateMessage = (message, maxLength) => {
  return message.length > maxLength ? message.substring(0, maxLength) : message;
};

export { fetchDirectoryData, fetchBranchData };
