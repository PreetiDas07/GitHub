import React, { useContext } from 'react'
import BranchOrTagSwitchComponent from "./branch_tag_switch"
import Image from 'next/image';
import { GitContext } from '@/pages/context';
import { AiFillCaretDown } from 'react-icons/ai'
import { sortBranches,handleSelectedBranch } from './branch_utilis';
const DefaultBranchesData = () => {
    const {  selectedTagName, branchNames, tags,searchQuery,branchSelected ,tagSelected,selectedBranchName,selectedItem,setSelectedBranchName,setSelectedTagName,setSearchQuery,setButtonClicked} = useContext(GitContext)
   
      const sortedBranches = sortBranches(branchNames);
      const handleBranchSelection=(item)=>{
        handleSelectedBranch(item);
        // fetchBranchData(fullName,branchNames,branchSha);
      }
      const handleSelectedBranch = (item) => {
        if (branchSelected) {
          setSelectedBranchName(item);
          setButtonClicked(false)
          setSearchQuery("")
        }
        else if (tagSelected) {
          setButtonClicked(false)
          setSelectedTagName(item)
          setSearchQuery("")
        }
    
      };
    // const handleSelectBranch = (item) => handleSelectedBranch(item, branchSelected,tagSelected, setSelectedBranchName, setButtonClicked, setSearchQuery, setSelectedTagName);
    return (
        <div>
           {selectedItem.length <= 0 && !searchQuery && sortedBranches.map((branch, index) => {
                const isMasterBranch = branch === 'master';
                return (
                  <BranchOrTagSwitchComponent
                  key={index} 
                  handleBranchSelection={handleBranchSelection}
                  branch={branch}
                  index={index}
                  isMasterBranch={isMasterBranch}
                  selectedBranchName={selectedBranchName}
                />
                );
              })}
        </div>
    )
}
export default DefaultBranchesData;

