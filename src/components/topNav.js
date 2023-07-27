import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function TopNav() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const activeRouteIndex = headNavContent.findIndex(
      (data) => data.href === router.pathname
    );
    setActiveIndex(activeRouteIndex);
  }, [router.pathname]);

  const handleUnderLine = (index) => {
    setActiveIndex(index);
  };

  return (
    <section className="topNavSection">
      <div className="topNav_section">
        {headNavContent.map((data, index) => {
          return (
            <div
              className="code"
              key={index}
              style={{
                borderBottom:
                  activeIndex === index ? "2px solid #F78166" : "none",
                borderRadius: "2px",
              }}
              onClick={() => handleUnderLine(index)}
            >
              <Link href={data.href} passHref className="headingCode">
                <Image src={data.image} width={16} height={16} alt={data.alt} />
                <span className="code_nav" style={{ width: data.width }}>
                  {data.navData}
                </span>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}

const headNavContent = [
  {
    navData: "Code",
    image: "/assets/Frame.svg",
    href: "/",
    alt: "Code Icon",
  },
  {
    navData: "Issue",
    image: "/assets/Issues.svg",
    href: "/issue",
    alt: "Issue Icon",
  },
  {
    navData: "Pull request",
    image: "/assets/Pull requests.svg",
    href: "/pull-request",
    alt: "pull-request Icon",
    width: "85px",
  },
  {
    navData: "Discussions",
    image: "/assets/discussion.svg",
    href: "/discussion",
    alt: "Discussions Icon",
  },
  {
    navData: "Actions",
    image: "/assets/Actions.svg",
    href: "/actions",
    alt: "Actions Icon",
  },
  {
    navData: "Projects",
    image: "/assets/Projects.svg",
    href: "/projects",
    alt: "Projects Icon",
  },
  {
    navData: "Security",
    image: "/assets/Security.svg",
    href: "/security",
    alt: "Security Icon",
  },
  {
    navData: "Insights",
    image: "/assets/Insights.svg",
    href: "/insights",
    alt: "Insights Icon",
  },
];
