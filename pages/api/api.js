const fetchReadme = async (fullRepoName) => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${fullRepoName}/readme`
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
