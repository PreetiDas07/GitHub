import React, { useEffect, useContext, useState } from 'react';
import { GitContext } from '@/pages/context';
import { FileOutlined } from '@ant-design/icons';
import { FolderIcon } from './branch_utilis';
import Link from 'next/link';
import { fetchDirectoryData } from '@/pages/api/api';

const SubContent = () => {
    const { directoryData, setDirectoryData, directorySha, branchSha,setSubContentClicked } = useContext(GitContext);
    let fullName = "urwid/urwid";
    let accessToken = "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";
    const [selectedBranchContents, setSelectedBranchContents] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const paths = await fetchDirectoryData(fullName, directorySha, accessToken);
            setDirectoryData(paths);
            const storedData = localStorage.getItem("selectedBranchContents");
            if (storedData) {
                const branchContentsData = JSON.parse(storedData);
                setSelectedBranchContents(branchContentsData);
            }
        };
        fetchData();
    }, [branchSha]);
    const handleBack=()=>{
        setSubContentClicked(false);
    }
    return (
        <div className='sub-content-main-div'>
            <div className='sub-content-header'>
                <div>Name</div>
                <div>Last Commit Message</div>
            </div>
            <div className='sub-contents-div' onClick={handleBack}>
                <Link href="/branches" className='sub-contents'>
                    <div className='folder-data'>
                        <FolderIcon width={16} height={16} />
                        <div  className='folder-name' >...</div>
                    </div>
                </Link>
                <div className='sub-contents-div'>
                    {directoryData.map((item, index) => (
                        <div key={index} className='sub-contents'>
                            <div>
                                {item.type === "blob" ? <FileOutlined size={16} /> :
                                    <span className="sub-content-folder-icon"> <FolderIcon width={16} height={16} /></span>}
                                <span className='folder-name'>{item.name}</span>
                            </div>
                            <div>coming soon</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SubContent;

