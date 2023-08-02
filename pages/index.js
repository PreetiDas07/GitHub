import React from "react";
import RepoProvider from "@/src/components/RepoContext";
import RepoSearch from "@/src/screens/RepoSearch";
import GitHubReadme from "@/src/components/markDown";
import Branches from "./branches";
import About from "@/src/components/About";
import BranchHeader from "./branchHeader";
import BranchContents from "@/src/components/branch_contents";

export default function Index() {
  // return (
  //   <div style={{ marginLeft: 150, marginRight: 150 }}>
  //     <BranchHeader />
  //     <div style={{ display: "flex" }}>
  //       <BranchContents />
  //       <div>
  //         <RepoProvider>
  //           <About />
  //         </RepoProvider>
  //       </div>
  //     </div>
  //     <GitHubReadme />

  //     {/* <div className="subMain">

  // </div> */}
  //   </div>
  // );
  return (
    <div className="main">
      <div style={{ display: "flex" }}>
        <div className="inner-code">
          <BranchHeader />
          <BranchContents />
          <GitHubReadme />
        </div>
        <div className="about">
          <RepoProvider>
            <About />
          </RepoProvider>
        </div>
      </div>
    </div>
  );
}
