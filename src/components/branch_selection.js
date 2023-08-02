import React, { useEffect, useState, useContext } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { GitContext } from "@/pages/context";
import Search from "./search";
import FilteredItems from "./filtered_items";
import DefaultBranchesData from "./default_data_for_branch_selection";
import SelectedItemData from "./selected_item_data";
import { accessToken } from "./branch_utilis";
import {
  fetchBranchData,
  fetchBranchesDetails,
  fetchTagsData,
} from "@/pages/api/api";

const BranchSelection = () => {
  const {
    branchSha,
    setBranchSha,
    setBranchContents,
    selectedBranchName,
    branchSelected,
    viewAll,
    selectedTagName,
    branchData,
    setBranchData,
    tags,
    setTags,
    searchQuery,
    setSearchQuery,
    buttonClicked,
    setButtonClicked,
    setBranchSelected,
    setTagSelected,
    setSelectedItem,
    setViewAll,
    tagSelected,
    subContentClicked,
    searchTerm,
    repositories,
    setSelectedBranchName,
  } = useContext(GitContext);
  const [itemSelected, setItemSelected] = useState(false);
  const [validName, setValidName] = useState(false);
  // let searchTerm = "freifunk-berlin/firmware";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const branchDetails = await fetchBranchesDetails(
          searchTerm,
          accessToken
        );
        if (searchTerm !== "") {
          setValidName(true);
        }
        if (Array.isArray(branchDetails)) {
          setBranchData(branchDetails);
          setSelectedBranchName(
            branchDetails.find((branch) => branch.name === "master")
              ? "master"
              : "main"
          );
          const masterBranchDetails = branchData.find(
            (branch) => branch.name === "master" || "main"
          );
          const masterBranchSha = masterBranchDetails
            ? masterBranchDetails.commit.sha
            : "";
          setBranchSha(masterBranchSha);
        } else {
          console.error("Unexpected API response:", branchDetails);
        }
      } catch (error) {
        console.error("Error fetching branch data:", error);
      }
    };
    fetchData();
  }, [branchSha, repositories]);

  useEffect(() => {
    fetchTagsData(searchTerm, accessToken)
      .then((tags) => {
        setTags(tags?.map((tag) => tag.name)) || setTags("no tags");
      })
      .catch((error) => {
        console.error("Error fetching tags:", error);
        return [];
      });
  }, [repositories]);

  useEffect(() => {
    const fetchBranchDataa = async () => {
      // let searchTerm = "freifunk-berlin/firmware";
      const branches = await fetchBranchData(
        searchTerm,
        selectedBranchName,
        branchSha,
        accessToken
      );
      console.log({ branches });
      setBranchContents([...branches]);
    };
    fetchBranchDataa();
  }, [branchSha, selectedBranchName, repositories]);

  const handleSelection = () => {
    setButtonClicked(!buttonClicked);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCloseSelection = () => {
    setButtonClicked(false);
    setViewAll(false);
  };

  return (
    <div className="branch-selection-main-div">
      {!itemSelected && searchTerm && (
        <div>
          <Search
            buttonClicked={buttonClicked}
            handleSelection={handleSelection}
            branchSelected={branchSelected}
            selectedBranchName={selectedBranchName}
            selectedTagName={selectedTagName}
          />
          <div className="select-options-out-div">
            {buttonClicked && !subContentClicked && (
              <div className="select-options">
                <div className="select-header">
                  <div className="switch-branches-tags">
                    Switch branches/tags
                  </div>
                  <div className="close-icon" onClick={handleCloseSelection}>
                    <CloseOutlined size={12} color="black" />
                  </div>
                </div>
                <div className="filter-div">
                  {" "}
                  <input
                    className={searchQuery ? "input-clicked" : "filter-input"}
                    type="search"
                    placeholder={
                      tagSelected ? "Find a tag" : "Filter branches/tags"
                    }
                    onChange={handleSearch}
                  />
                </div>

                <div className="branch-tags-div">
                  <div
                    className={!tagSelected ? "branches" : "branch-selected"}
                    onClick={() => {
                      setSelectedItem(branchData);
                      setBranchSelected(true);
                      setTagSelected(false);
                    }}
                  >
                    Branches
                  </div>
                  <div
                    className={!tagSelected ? "tags" : "tag-selected"}
                    onClick={() => {
                      setSelectedItem(tags);
                      setBranchSelected(false);
                      setTagSelected(true);
                    }}
                  >
                    Tags
                  </div>
                </div>
                <FilteredItems />
                <DefaultBranchesData />
                <SelectedItemData />
                {!viewAll && (
                  <div className="view-more">
                    {branchSelected
                      ? "view all branches"
                      : tags !== "no tags"
                      ? "view all tags"
                      : ""}
                  </div>
                )}
                {viewAll && <div>coming soon</div>}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default BranchSelection;
