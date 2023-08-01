import React from 'react'
import BranchContents from '@/src/components/branch_contents.js';
import BranchSelection from '@/src/components/branch_selection';
import TagsHeader from '@/src/components/tags';
import SwitchBranches from '@/src/components/switch_branches';
const Branches=()=> {
  return (
    <div className='main-header'>
     <div className="branch-header">
            <BranchSelection/>
            <div className="sub-header">
            <SwitchBranches/>
            <TagsHeader/>
            </div>
        </div>
      <BranchContents />      
    </div>
  )
}
export default Branches
