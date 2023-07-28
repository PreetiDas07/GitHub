import React, { createContext, useState } from "react";
export const GitContext = createContext({})
const Context=({children})=>{
    const [branchNames,setBranchNames]=useState([]);
    const [selectedBranchName,setSelectedBranchName]=useState("");
    const [selectedTagName,setSelectedTagName]=useState("");
    const [branchSha,setBranchSha]=useState("");
    const [branchContents,setBranchContents]=useState([]);
    const [tags, setTags] = useState([]);
    const [switchBranchClicked,setSwitchBranchClicked]=useState(false);
    const [folderSha, setFolderSha] = useState("");
    const [subContentClicked, setSubContentClicked] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [buttonClicked, setButtonClicked] = useState(false);
    const [branchSelected, setBranchSelected] = useState(true);
    const [tagSelected, setTagSelected] = useState(false);
    const [selectedItem, setSelectedItem] = useState(branchNames)
    const [viewAll, setViewAll] = useState(false);

    // const [branchData,setBranchData]=useState([{
    //     branchNames:[],
    //     selectedBranch:"",
    //     branchSha:""
    // }]);
  
    const contextValue = {
        selectedBranchName, setSelectedBranchName,
        // branchData,setBranchData,
        branchSha,setBranchSha,
        branchNames,setBranchNames,
        selectedTagName,setSelectedTagName,
        tags,setTags,
        switchBranchClicked,setSwitchBranchClicked,
        branchContents,setBranchContents,
        folderSha,setFolderSha,
        subContentClicked,setSubContentClicked,
        searchQuery,setSearchQuery,
        buttonClicked,setButtonClicked,
        branchSelected,setBranchSelected,
        tagSelected,setTagSelected,
        selectedItem,setSelectedItem,
        viewAll,setViewAll
    }
    return (
        <div>
          <GitContext.Provider value={contextValue}>
           {children}
          </GitContext.Provider>
        </div>
      );
}
export default Context;

