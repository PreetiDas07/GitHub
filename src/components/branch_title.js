import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { GitContext } from '@/pages/context';
// import { TiTick } from 'react-icons/ti';
// import Image from "next/image";

const BranchTitle = () => {
  const [branchHeaderData, setBranchHeaderData] = useState({
    firstCommitMessage: "",
    profileName: "",
    avatar: "",
    shaFirstFiveDigits: "",
    commitCount: 0  
  });
  const {selectedBranchName} = useContext(GitContext);

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const allCommits = [];
        let page = 1;
        const perPage = 100;

        while (true) {
          const response = await axios.get(
            `https://api.github.com/repos/urwid/urwid/commits`,
            {
              params: {
                sha: selectedBranchName,
                page,
                per_page: perPage,
              },
            }
          );

          const commitsData = response.data;
          if (commitsData.length === 0) {
            break;
          }

          allCommits.push(...commitsData);
          page++;
        }

        const commitCount = allCommits.length;
        setBranchHeaderData((prevData) => ({
          ...prevData,
          commitCount,
        }));
        
        if (allCommits.length > 0) {
          const firstCommitMessage = allCommits[0].commit.message;
          const authorName = allCommits[0].commit.author.name;
          const wordsArray = authorName.split(' ');
          const profileName = wordsArray[1];
          const avatar = allCommits[0].author.avatar_url;
          const sha = allCommits[0].sha;
          const shaFirstFiveDigits = sha.slice(0, 7);

          setBranchHeaderData((prevData) => ({
            ...prevData,
            firstCommitMessage,
            profileName,
            avatar,
            shaFirstFiveDigits,
          }));
        }
      } catch (error) {
        console.error("Error fetching directory data:", error);
      }
    };

    fetchCommits();
  }, [selectedBranchName]);

  return (
    <div className='branch-title'>
    <div className='profileCommmit'>

        {branchHeaderData.avatar && (
            <img
                src={branchHeaderData.avatar}
                alt="profile"
                width={24}
                height={24}
                className='profile'
            />
        )}
        <div className='profile-name'>{branchHeaderData.profileName}</div>
        <div className='commit-data'>{branchHeaderData.firstCommitMessage}</div>
        <div className='responsive-commit-data'>...</div>
    </div>
    <div className='shaNoCommit'>
        <div className='sha-no'>{branchHeaderData.shaFirstFiveDigits} </div>
        {/* <div><TiTick size={16} /></div> */}
        <img
            src="/assets/clock.png"
            alt="clock"
            width={16}
            height={16}
            className='clock'
        />
        <div className='commits-count'>
            <div>{branchHeaderData.commitCount}</div>
            <div className='commit'>commits</div> </div>
        <div></div>
    </div>

</div>
  );
};

export default BranchTitle;


