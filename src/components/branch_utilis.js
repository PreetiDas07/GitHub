const handleSelectedBranch = (
  item,
  branchSelected,
  setBranchSha,
  setSelectedBranchName,
  branchData,
  setSelectedTagName,
  setSearchQuery,
  setButtonClicked
) => {
  if (branchSelected) {
    setSelectedBranchName(item);
    const selectedBranchDetails = branchData?.find(
      (branch) => branch?.name === item
    );
    const selectedBranchSha = selectedBranchDetails
      ? selectedBranchDetails?.commit.sha
      : "";
    if (!selectedBranchSha && item === "master") {
      setBranchSha();
    } else {
      selectedBranchSha;
    }
    setButtonClicked(false);
    setSearchQuery("");
  }
};

const sortedBranches = (branchData) => {
  return (branchData ?? []).sort((a, b) => {
    if (a.name === "master" || a.name === "main") return -1;
    if (a.name === "master" || a.name === "main") return 1;
    return a.name.localeCompare(b.name);
  });
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
      src="/assets/Frame.png"
      alt="master-icon"
      width={width}
      height={height}
    />
  );
};

const sortFilesAndFolders = (contents) => {
  return contents.sort((a, b) => {
    const aIsFile = a.type === "file";
    const bIsFile = b.type === "file";
    if (aIsFile && !bIsFile) return 1;
    if (!aIsFile && bIsFile) return -1;
    return 0;
  });
};

const accessToken = "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";

export {
  sortedBranches,
  handleSelectedBranch,
  FolderIcon,
  MasterIcon,
  sortFilesAndFolders,
  accessToken,
};
