// index.js
import React from "react";
import RepoProvider from "@/src/components/RepoContext";
import RepoSearch from "@/src/screens/RepoSearch";


export default function Index() {
  return (
    <main className="main">
      <RepoProvider>
        <RepoSearch />
      </RepoProvider>
    </main>
  );
}
