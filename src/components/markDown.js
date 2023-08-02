import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { fetchReadme } from "@/pages/api/api";
import rehypeRaw from "rehype-raw";
import { accessToken } from "./branch_utilis";

const GitHubReadme = () => {
  const [readmeContent, setReadmeContent] = useState("");

  useEffect(() => {
    const fullRepoName = "freifunk-berlin/firmware";

    const fetch = async () => {
      const readmeData = await fetchReadme(fullRepoName, accessToken);
      setReadmeContent(readmeData);
    };

    fetch();
  }, []);

  return (
    <section className="readMeSection">
      {readmeContent && (
        <div style={{ width: "100%" }}>
          <div className="readMeHead">
            <div className="innerReadMD">
              <Image src="/assets/List.svg" width={16} height={16} alt="List" />
              <div className="readMeHeading">README.md </div>
            </div>
          </div>

          <ReactMarkdown
            children={readmeContent}
            className="readmeContent"
            rehypePlugins={[rehypeRaw]}
            style={{ width: "100%" }}
          ></ReactMarkdown>
        </div>
      )}
    </section>
  );
};

export default GitHubReadme;
