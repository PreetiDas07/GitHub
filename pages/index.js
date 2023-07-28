import Header from "@/src/components/header";
import React from "react";
import TopNav from "@/src/components/topNav";
import RepoProvider from "@/src/components/RepoContext";

export default function index() {
  return (
    <main>
      <RepoProvider>
        <Header />
      </RepoProvider>
    </main>
  );
}
