import React, { useContext } from 'react'
import BranchOrTagSwitchComponent from "./branch_tag_switch"
import { GitContext } from '@/pages/context';
import { sortedBranches,handleSelectedBranch } from './branch_utilis';
import { fetchBranchData } from '@/pages/api/api';
const FilteredItems = () => {
  const { branchSha, setBranchSha, selectedTagName, branchData, tags, searchQuery, branchSelected,selectedBranchName
    , setSelectedBranchName, setSelectedTagName, setSearchQuery, setButtonClicked, } = useContext(GitContext)
  let fullName = "urwid/urwid";
  const sortedBranchNames = sortedBranches(branchData); 

  const handleBranchSelection =async (item) => {
    handleSelectedBranch(item, branchSelected, setBranchSha, setSelectedBranchName, branchData,setSelectedTagName,setSearchQuery,setButtonClicked); 
    fetchBranchData(fullName, selectedBranchName, branchSha,"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");
  };

  const filteredItems = branchSelected
    ? sortedBranches(branchData).filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : tags.filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase()));
  
  return (
    <div>
      {filteredItems && searchQuery && (
        <div>
          {filteredItems?.map((item, index) => (
            <BranchOrTagSwitchComponent
              key={index}
              handleBranchSelection={handleBranchSelection}
              branch={item}
              index={index}
              selectedBranchName={selectedBranchName}
              selectedTagName={selectedTagName}
              branchSelected={branchSelected}
            />
          ))}
          {searchQuery && filteredItems?.length === 0 && <div className='no-data'>Nothing to show</div>}
        </div>
      )}
    </div>
  );

}
export default FilteredItems;

