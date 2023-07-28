import TopNav from "@/src/components/topNav";
import React from "react";
import Header from "@/src/components/header";
import RepoProvider from "@/src/components/RepoContext";

export default function Discussion() {
  return (
    <RepoProvider>
      <Header />
      <TopNav />
      <div className="discussion">Coming Soon</div>
    </RepoProvider>
  );
}
