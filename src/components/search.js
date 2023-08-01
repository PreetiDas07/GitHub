import React from 'react'
import { AiFillCaretDown } from 'react-icons/ai'
import { MasterIcon } from './branch_utilis';
const Search = ({handleSelection,branchSelected,selectedBranchName,selectedTagName,buttonClicked}) => {
    console.log(branchSelected+"branch-selected")
    console.log("selected-branhc"+selectedBranchName)
    return (
        <div onClick={handleSelection} className={!buttonClicked?"branch-select":"branch-button-clicked"}>
       <MasterIcon/>
       <span>{branchSelected ? selectedBranchName : selectedTagName || "master"}</span>
        <span> <AiFillCaretDown className='select-option-icon' /></span></div>
    )
}
export default Search;

