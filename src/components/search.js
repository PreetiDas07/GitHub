import React from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { MasterIcon } from "./branch_utilis";

const Search = ({
  handleSelection,
  branchSelected,
  selectedBranchName,
  selectedTagName,
  buttonClicked,
}) => {
  const defaultSearchText = branchSelected
    ? selectedBranchName
    : selectedTagName || "master" || "main";

  const searchText =
    defaultSearchText === "master" ? "main" : defaultSearchText;

  return (
    <div
      onClick={handleSelection}
      className={!buttonClicked ? "branch-select" : "branch-button-clicked"}
    >
      <MasterIcon />
      <span>{searchText}</span>
      <span>
        {" "}
        <AiFillCaretDown className="select-option-icon" />
      </span>
    </div>
  );
};

export default Search;
