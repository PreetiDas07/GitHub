import TopNav from "@/src/components/topNav";
import React from "react";
import Header from "@/src/components/header";
import RepoProvider from "@/src/components/RepoContext";

export default function Insights() {
  return (
    <RepoProvider>
      <Header />
      <TopNav />
      <div className="insights">Coming Soon</div>
    </RepoProvider>
  );
}
