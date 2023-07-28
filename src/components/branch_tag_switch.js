import React from 'react'
import { Select } from 'antd';
const { Option } = Select;
import { TiTick } from 'react-icons/ti'
const BranchOrTagSwitchComponent=({handleBranchSelection,isMasterBranch,selectedBranchName,key,branch,index,selectedTagName,tagSelected})=>{
return(
    <div key={index} onClick={()=>handleBranchSelection(branch) } className='branch-names'>
    <div>
      {(((isMasterBranch && !selectedBranchName) || branch === selectedBranchName) 
      ||(branch === selectedBranchName || branch===selectedTagName ||(branch==="master" && !selectedBranchName) ) 
      ||(branch === selectedBranchName && !tagSelected)) ? (
        <TiTick size={16} style={{ color: "white" }} />
      ) : (
        <div style={{ width: 16, height: 16 }}></div>
      )}
    </div>

    {branch}
    {(branch==="master") && <div className='default'>default</div>}
  </div>
)
}
export default BranchOrTagSwitchComponent