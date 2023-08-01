import React from "react";
import RepoProvider from "@/src/components/RepoContext";
import RepoSearch from "@/src/screens/RepoSearch";
import GitHubReadme from "@/src/components/markDown";
import Branches from "./branches";

export default function Index() {
  return (
    <main className="main">
      <RepoProvider>
        <RepoSearch />
    <Branches />
      <GitHubReadme />
      </RepoProvider>
    </main>
  );
}
