const fetchReadme = async (fullRepoName) => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${fullRepoName}/readme`
    );
    const data = await response.json();
    const decodedContent = atob(data.content);

    return decodedContent;
  } catch (error) {
    console.error("Error fetching README:", error);
    return null;
  }
};

export { fetchReadme };
