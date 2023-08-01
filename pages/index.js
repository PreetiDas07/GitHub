import React from "react";
import GitHubReadme from "@/src/components/markDown";
import Branches from "./branches";

export default function index() {
  return (
    <main>
      <Branches />
      <GitHubReadme />
    </main>
  );
}
