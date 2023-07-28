import React, { useContext } from 'react'
import BranchOrTagSwitchComponent from "./branch_tag_switch"
import Image from 'next/image';
import { GitContext } from '@/pages/context';
import { AiFillCaretDown } from 'react-icons/ai'
import { sortBranches,handleSelectedBranch } from './branch_utilis';
// import { handleSelectedBranch } from './branch_utilis';
const SelectedItemData = () => {
    // const {  selectedTagName, branchNames, tags,searchQuery,branchSelected ,selectedBranchName,tagSelected,selectedItem,setSelectedBranchName,setSelectedTagName,setSearchQuery,setButtonClicked,viewAll} = useContext(GitContext)
    const { selectedTagName, branchNames, tags, searchQuery, branchSelected, tagSelected, selectedBranchName, setSelectedBranchName, setSelectedTagName, setSearchQuery, setButtonClicked ,viewAll,selectedItem} = useContext(GitContext);

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
      let displayedItems = viewAll ? selectedItem : selectedItem.slice(0, 10);
    return (
        <div>
             {!searchQuery && Array.isArray(selectedItem) && !viewAll && displayedItems.map((item, index) => {
                return (
                  <BranchOrTagSwitchComponent
                    key={index} 
                    handleBranchSelection={handleBranchSelection}
                    branch={item}
                    index={index}
                    selectedBranchName={selectedBranchName}
                    selectedTagName={selectedTagName}
                    tagSelected={tagSelected}
                  />
                );
              })}
        </div>
    )
}
export default SelectedItemData;

