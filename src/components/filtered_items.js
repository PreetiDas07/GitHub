import React, { useContext } from "react";
import BranchOrTagSwitchComponent from "./branch_tag_switch";
import { GitContext } from "@/pages/context";
import { sortedBranches, handleSelectedBranch } from "./branch_utilis";
import { fetchBranchData } from "@/pages/api/api";
import { accessToken } from "./branch_utilis";

const FilteredItems = () => {
  const {
    branchSha,
    setBranchSha,
    selectedTagName,
    branchData,
    tags,
    searchQuery,
    branchSelected,
    selectedBranchName,
    setSelectedBranchName,
    setSelectedTagName,
    setSearchQuery,
    setButtonClicked,
    searchTerm,
  } = useContext(GitContext);
  // let searchTerm = "urwid/urwid";
  const sortedBranchNames = sortedBranches(branchData);

  const handleBranchSelection = async (item) => {
    handleSelectedBranch(
      item,
      branchSelected,
      setBranchSha,
      setSelectedBranchName,
      branchData,
      setSelectedTagName,
      setSearchQuery,
      setButtonClicked
    );
    fetchBranchData(searchTerm, selectedBranchName, branchSha, accessToken);
  };

  const filteredItems = branchSelected
    ? sortedBranches(branchData).filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : Array.isArray(tags)
    ? tags.filter((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div>
      {filteredItems && searchQuery && (
        <div>
          {filteredItems ? (
            filteredItems?.map((item, index) => (
              <BranchOrTagSwitchComponent
                key={index}
                handleBranchSelection={handleBranchSelection}
                branch={item}
                index={index}
                selectedBranchName={selectedBranchName}
                selectedTagName={selectedTagName}
                branchSelected={branchSelected}
              />
            ))
          ) : (
            <div>no tags available</div>
          )}
          {searchQuery && filteredItems?.length === 0 && (
            <div className="no-data">Nothing to show</div>
          )}
          {!filteredItems && <div>no tags available</div>}
        </div>
      )}
    </div>
  );
};
export default FilteredItems;
