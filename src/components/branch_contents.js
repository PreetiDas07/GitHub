import React, { useEffect, useState, useContext } from 'react'
import { FileOutlined } from '@ant-design/icons';
import { GitContext } from '@/pages/context';
import BranchTitle from './branch_title';
import Link from 'next/link';
import { useRouter } from "next/dist/client/router";
import { FolderIcon,sortFilesAndFolders } from './branch_utilis';
const BranchContents = () => {
  const router = useRouter();
  const { selectedBranchName, setSelectedBranchName, branchContents, setBranchContents, folderSha, setFolderSha,subContentClicked,setSubContentClicked,buttonClicked} = useContext(GitContext)
  useEffect(() => {
    if (!selectedBranchName) {
      setSelectedBranchName("master");
    }
  }, []);

  useEffect(() => {
    if (selectedBranchName) {
      fetch(
        // `https://api.github.com/repos/RedMadRobot/input-mask-android/contents?ref=${selectedBranchName}`
        `https://api.github.com/repos/urwid/urwid/contents?ref=${selectedBranchName}`
        )
        .then((res) => res.json())
        .then((json) => {
          setBranchContents(json);
          setContentType(json.map((branch) => branch.type));
          setFolderSha(json.map((branch) => branch.sha));
        })
        .catch((error) => {
          console.error('Error fetching branch contents:', error);
        });
    }

  }, [selectedBranchName]);
  const handleSubContent = () => {
    setSubContentClicked(true)
  }
  console.log(branchContents)
 

  const sortedBranchContents = sortFilesAndFolders(branchContents);
  return (
    <div className={!buttonClicked?'contents-component':"component-button-clicked"}>
        <div className='commit-header'>
        {selectedBranchName !== "master" && <div className='commit-msg'>This branch is<Link href="" className='commit-link'>1 commit ahead,</Link> 
        <Link href="" className='commit-link2'> 179 commits behind</Link>  master.</div>}
      </div>
      <div className='title'><BranchTitle /></div>
    
      <div className='branchContents'>
        {branchContents  && !subContentClicked &&         
            sortedBranchContents.map((content, index) => (
              <div key={index} className='branch-item'>
                <div className='content-div'>
                  <div>{content.type === "file" ? <FileOutlined size={16} />:<FolderIcon/>}
                  </div>
                  <Link href="/subContent" className='content-name' onClick={handleSubContent}>{content.name}</Link>
                </div>
                <div className='commit-message'>commit message</div>
              </div>
            ))}
      </div>
    </div>
  )
}

export default BranchContents
