import React, { useEffect, useState, useContext } from 'react'
import { CloseOutlined } from '@ant-design/icons';
import { GitContext } from '@/pages/context';
import Search from './search';
import FilteredItems from './filtered_items';
import DefaultBranchesData from './default_data_for_branch_selection';
import SelectedItemData from './selected_item_data';
import { fetchBranchesDetails } from '@/pages/api/api';
const BranchSelection = () => {
  const {branchSha, setBranchSha, selectedBranchName, selectedTagName, branchNames, setBranchNames, tags, setTags,searchQuery,setSearchQuery,buttonClicked,setButtonClicked ,setSelectedBranchName,setSelectedTagName,branchSelected,setBranchSelected,tagSelected,selectedItem,setSelectedItem,setTagSelected,viewAll,setViewAll} = useContext(GitContext)
  const [itemSelected, setItemSelected] = useState(false);
  const[validName,setValidName]=useState(false);
  let fullName="urwid/urwid";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const branchDetails = await fetchBranchesDetails(fullName);
        if(fullName!==""){
          setValidName(true);
        }
        if (Array.isArray(branchDetails)) {
          const branchNames = branchDetails.map((branch) => branch.name);
          const branchSha = branchDetails.map((branch) => branch.commit.sha);
          setBranchNames(branchNames);
          setBranchSha(branchSha);
        } else {
          console.error("Unexpected API response:", branchDetails);
        }
      } catch (error) {
        console.error("Error fetching branch data:", error);
      }
    };

    fetchData();
  }, []);

  
  
  useEffect(() => {
    fetch(
      // `https://api.github.com/repos/RedMadRobot/input-mask-android/tags`
      `https://api.github.com/repos/urwid/urwid/tags`
      )
      .then((res) => res.json())
      .then((json) => {
        setTags(json.map((branch) => branch.name));
      })
  }, [])

  const handleSelection = () => {
    setButtonClicked(!buttonClicked);
  }

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleCloseSelection = () => {
    setButtonClicked(!buttonClicked);
    setViewAll(false)
  }
  const handleViewMore = () => {
    setViewAll(true);
  };
  
  return (
    <div className='branch-selection-main-div'>
      {!itemSelected && fullName &&
        <div>
          <Search buttonClicked={buttonClicked} handleSelection={handleSelection} branchSelected={branchSelected} selectedBranchName={selectedBranchName} selectedTagName={selectedTagName}/>
         <div className='select-options-out-div'>
          {buttonClicked &&
            <div className='select-options'>
              <div className='select-header'>
                <div className='switch-branches-tags'>Switch branches/tags</div>
                <div onClick={handleCloseSelection}><CloseOutlined size={16} /></div>
              </div>
              <div className='filter-div'> <input className={searchQuery ? "input-clicked" : 'filter-input'} type="search" placeholder={tagSelected ? "Find a tag" : 'Filter branches/tags'} onChange={handleSearch} /></div>

              <div className='branch-tags-div'>
                <div className={!tagSelected ? "branches" : "branch-selected"} onClick={() => { setSelectedItem(branchNames), setBranchSelected(true), setTagSelected(false) }}>Branches</div>
                <div className={!tagSelected ? "tags" : "tag-selected"} onClick={() => { setSelectedItem(tags), setBranchSelected(false), setTagSelected(true) }}>Tags</div>
              </div>
              <FilteredItems/>
              <DefaultBranchesData/>
              <SelectedItemData/>
              {!viewAll && (
                <div onClick={handleViewMore} className='view-more'>{branchSelected ? "view all branches" : "view all tags"}</div>
              )}
              {viewAll && <div>coming soon</div>}
            </div>
          }
          </div>
        </div>
      }
    </div>
  );
}
export default BranchSelection