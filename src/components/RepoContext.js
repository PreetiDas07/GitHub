import React, { createContext, useState } from "react";

export const RepoContext = createContext();

const RepoProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [repositories, setRepositories] = useState([]);
  const repoSearchData = repositories[0];;

  return (
    <RepoContext.Provider value={{ searchTerm, setSearchTerm, repositories, setRepositories, repoSearchData }}>
      {children}
    </RepoContext.Provider>
  );
};

export default RepoProvider;