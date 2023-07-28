import React, { useContext } from 'react'
import BranchOrTagSwitchComponent from "./branch_tag_switch"
import Image from 'next/image';
import { GitContext } from '@/pages/context';
import { AiFillCaretDown } from 'react-icons/ai'
import { sortBranches,handleSelectedBranch } from './branch_utilis';
const FilteredItems = () => {
    const {branchSha,  selectedTagName, branchNames, tags,searchQuery,branchSelected ,selectedBranchName,setSelectedBranchName,setSelectedTagName,setSearchQuery,setButtonClicked,tagSelected} = useContext(GitContext)
    let fullName="urwid/urwid";
      const sortedBranches = sortBranches(branchNames);

      const filteredItems = branchSelected ?
        sortedBranches.filter((item) =>
          item.toLowerCase().includes(searchQuery.toLowerCase())
        ) :
        tags.filter((item) =>
          item.toLowerCase().includes(searchQuery.toLowerCase())
        );
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
            {filteredItems && searchQuery && (
                <div>
                  {filteredItems.map((item, index) =>{ 
                    return(
                    <BranchOrTagSwitchComponent
                    key={index} 
                    handleBranchSelection={handleBranchSelection}
                    branch={item}
                    index={index}
                    selectedBranchName={selectedBranchName}
                    selectedTagName={selectedTagName}
                  />
                  )})}
                   {searchQuery && filteredItems.length === 0 && <div className='no-data'>Nothing to show</div>}
                </div>
              )}
        </div>
    )
}
export default FilteredItems;

