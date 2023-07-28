import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GitContext } from '@/pages/context';
import { TiTick } from 'react-icons/ti';
import Image from 'next/image';
import { FileOutlined } from '@ant-design/icons';
import { sortBranches,FolderIcon } from './branch_utilis';
import Link from 'next/link';
const SubContent = () => {
    const [subContent, setSubContent] = useState({
        content: [],
        contentType: [],
    });

    useEffect(() => {
        console.log('im in');
        fetch(`https://api.github.com/repos/RedMadRobot/input-mask-android/git/trees/341f86841b4e25d547e7a9e2dfad134c76305f4d`)
            .then((res) => res.json())
            .then((json) => {
                const content = json.tree.map((item) => item.path);
                const contentType = json.tree.map((item) => item.type);
                setSubContent({ content, contentType });
            });
    }, []);

    return (
        <div className='sub-content-main-div'>
            <div className='sub-content-header'>
                <div>Name</div>
                <div>Last Commit Message</div>
            </div>
            <div className='sub-contents-div'>
                <div className='sub-contents'>
                <div ><FolderIcon width={16} height={16} />
                <Link href="/branches" className='folder-name'>...</Link> </div>
                <div>coming soon</div>
                </div>
                <div className='sub-contents-div'>
                    {subContent.content.map((item, index) => (
                        <div key={index} className='sub-contents'>
                            <div >
                                {subContent.contentType[index] === "blob" ? <FileOutlined size={16} /> :
                                  <span className="sub-content-folder-icon"> <FolderIcon width={16} height={16} /></span>}
                               <span className='folder-name'>{item}</span> 
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
