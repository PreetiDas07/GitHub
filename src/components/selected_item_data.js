import React, { useContext } from "react";
import BranchOrTagSwitchComponent from "./branch_tag_switch";
import { GitContext } from "@/pages/context";
import { fetchBranchData } from "@/pages/api/api";
import { handleSelectedBranch } from "./branch_utilis";
const SelectedItemData = () => {
  const {
    selectedTagName,
    setBranchSha,
    branchNames,
    branchSha,
    searchQuery,
    branchSelected,
    tagSelected,
    selectedBranchName,
    setSelectedBranchName,
    setSelectedTagName,
    setSearchQuery,
    setButtonClicked,
    viewAll,
    selectedItem,
  } = useContext(GitContext);
  let fullName = "freifunk-berlin/firmware";

  const handleBranchSelection = async (item) => {
    handleSelectedBranch(
      item,
      branchSelected,
      setBranchSha,
      setSelectedBranchName,
      branchNames,
      setSelectedTagName,
      setSearchQuery,
      setButtonClicked
    );
    fetchBranchData(
      fullName,
      selectedBranchName,
      branchSha,
      "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"
    );
  };
  let displayedItems = viewAll ? selectedItem : selectedItem.slice(0, 10);
  return (
    <div>
      {!searchQuery &&
        Array.isArray(selectedItem) &&
        !viewAll &&
        displayedItems?.map((item, index) => {
          return (
            <BranchOrTagSwitchComponent
              key={index}
              handleBranchSelection={handleBranchSelection}
              branch={item}
              index={index}
              selectedBranchName={selectedBranchName}
              selectedTagName={selectedTagName}
              tagSelected={tagSelected}
              branchSelected={branchSelected}
            />
          );
        })}
    </div>
  );
};
export default SelectedItemData;
