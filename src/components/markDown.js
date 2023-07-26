import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { fetchReadme } from "@/pages/api/api";
import rehypeRaw from "rehype-raw";

const GitHubReadme = () => {
  const [readmeContent, setReadmeContent] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const readmeData = await fetchReadme(fullRepoName);
      setReadmeContent(readmeData);
    };

    fetch();
  }, []);

  return (
    <section className="readMeSection">

      {readmeContent && (
        <div>
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
          ></ReactMarkdown>
        </div>
      )}
    </section>
  );
};

export default GitHubReadme;
