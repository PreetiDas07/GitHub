import React from "react";
import TopNav from "@/src/components/topNav";
import Header from "@/src/components/header";
import RepoProvider from "@/src/components/RepoContext";

export default function Issues() {
  return (
    <RepoProvider>
      <Header />
      <TopNav />
      <div className="issue">Coming Soon</div>
    </RepoProvider>
  );
}
