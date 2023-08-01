import React, {  useContext } from 'react'
import { GitContext } from '@/pages/context';
import { useRouter } from "next/router";
import { MasterIcon } from './branch_utilis';

const SwitchBranches = () => {
    const { branchData } = useContext(GitContext)
    const router = useRouter();
    const handleSwitchBranch = () => {
        router.push("/branches_page")
    }
    return (
        <div className='switch-branches' onClick={handleSwitchBranch}>
            <MasterIcon/>
            <span className='branch-length'>
                {branchData.length}
            </span>
            <span className='branch-name'>
                branches
            </span>
        </div>
    )
}
export default SwitchBranches