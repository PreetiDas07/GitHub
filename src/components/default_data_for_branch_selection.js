import React, { useContext } from 'react';
import BranchOrTagSwitchComponent from './branch_tag_switch';
import { GitContext } from '@/pages/context';
import { fetchBranchData } from '@/pages/api/api';
import { sortedBranches,handleSelectedBranch } from './branch_utilis';

const DefaultBranchesData = () => {
  const {
    branchData,branchSha,setBranchSha,searchQuery,branchSelected,selectedBranchName,selectedItem,
    setSelectedBranchName,setSelectedTagName,setSearchQuery,setButtonClicked,} = useContext(GitContext);

  const fullName = "urwid/urwid";
  const sortedBranchNames = sortedBranches(branchData); 
  const handleBranchSelection = (item) => {
    handleSelectedBranch(item, branchSelected, setBranchSha, setSelectedBranchName, branchData,setSelectedTagName,setSearchQuery,setButtonClicked); 
    fetchBranchData(fullName, selectedBranchName, branchSha);
  };

  return (
    <div>
      {selectedItem?.length <= 0 && !searchQuery && (
        <div>
          {sortedBranchNames?.map((branch, index) => {
            const isMasterBranch = branch === 'master';
            return (
              <BranchOrTagSwitchComponent
                key={index}
                handleBranchSelection={handleBranchSelection}
                branch={branch} 
                index={index}
                isMasterBranch={isMasterBranch}
                selectedBranchName={selectedBranchName}
                branchSelected={branchSelected}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DefaultBranchesData;
