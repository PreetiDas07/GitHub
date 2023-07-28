import React from 'react'
import BranchContents from '@/src/components/branch_contents.js';
import BranchHeader from './branchHeader';
const Branches=()=> {
  return (
    <div className='main-header'>
      <BranchHeader/>
      <BranchContents />
      
    </div>
  )
}

export default Branches
