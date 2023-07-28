
 const sortBranches = (branchNames) => {
  return branchNames.sort((a, b) => {
    if (a === 'master') return -1;
    if (b === 'master') return 1;
    return a.localeCompare(b);
  });
};
 const handleSelectedBranch = (item, branchSelected,tagSelected, setSelectedBranchName, setButtonClicked, setSearchQuery, setSelectedTagName) => {
  if (branchSelected) {
    setSelectedBranchName(item);
    setButtonClicked(false);
    setSearchQuery("");
  } else if(tagSelected){
    setSelectedTagName(item);
    setButtonClicked(false);
    setSearchQuery("");
  }
};
 const FolderIcon = ({ width = 16, height = 16 }) => {
  return (
    <img
      src="/assets/folder-icon.png"
      alt="folder-icon"
      width={width}
      height={height}
    />
  );
};
 const MasterIcon = ({ width = 16, height = 16 }) => {
  return (
    <img
      src='/assets/Frame.png'
      alt="master-icon"
      width={width}
      height={height}
    />
  );
};

 const sortFilesAndFolders=(contents)=> {
  return contents.sort((a, b) => {
    const aIsFile = a.type === "file";
    const bIsFile = b.type === "file";
    if (aIsFile && !bIsFile) return 1;
    if (!aIsFile && bIsFile) return -1;
    return 0;
  });
}
export {sortBranches,handleSelectedBranch,FolderIcon,MasterIcon,sortFilesAndFolders}

