import React from "react";
import TopNav from "@/src/components/topNav";
import Header from "@/src/components/header";
import RepoProvider from "@/src/components/RepoContext";

export default function Projects() {
  return (
    <RepoProvider>
      <Header />
      <TopNav />
      <div className="projects">Coming Soon</div>
    </RepoProvider>
  );
}
