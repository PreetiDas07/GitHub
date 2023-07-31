import React, { useContext } from 'react';
import { Avatar, Badge, Tag } from 'antd';
import Image from 'next/image';
import { UserOutlined, GithubOutlined, CaretDownOutlined } from '@ant-design/icons';
import RepoSearch from '../screens/RepoSearch';
import { RepoContext } from './RepoContext';



const Header = () => {
    const { repoSearchData } = useContext(RepoContext);

    const imageLoader = ({ src }) => src;

    const forkAndStars = [
        {
            url: '/assets/fork.svg',
            alt: 'Fork',
            name: 'Fork',
            count: repoSearchData?.stargazers_count,
            symbol: <CaretDownOutlined style={{ fontSize: '16px' }} />,
        },
        {
            url: '/assets/star.svg',
            alt: 'Star',
            name: 'Star',
            count: repoSearchData?.forks_count,
            symbol: <CaretDownOutlined style={{ fontSize: '16px' }} />,
        }
    ]
    return (
        <div>

            <div className='header'>

                <div className='icon_input_div'>
                    <GithubOutlined className='githuboutlined' />
                    <RepoSearch />
                </div>

                <div className='avatar_div' >
                    <Badge dot color='blue' size="default">
                        <Avatar
                            className='avatar'
                            icon={<UserOutlined className='userOutlined' />}
                        />
                    </Badge>
                </div>

            </div>

            <div className='repoName_div'>

                <div className='repoName'>
                    <Image className='avatar_img' loader={imageLoader}
                        src={repoSearchData ? repoSearchData?.owner?.avatar_url : '/assets/save.png'}
                        alt='avatar' width={24} height={24}
                    />
                    <p className='fullName'>{
                        repoSearchData ? (
                            <div>
                                <span>{repoSearchData?.owner?.login} </span>
                                <span style={{ color: '#8B949E' }}>/</span>
                                <span> {repoSearchData?.name}</span>
                            </div>
                        ) : (<span>user/repo</span>)
                    }</p>
                    <p className='public'>Public</p>
                </div>

                <div className='star_and_fork'>
                    {forkAndStars.map((forkAndStar, index) => {
                        return (
                            <div className='fork' key={index}>

                                <div className='fork_div'>
                                    <Image src={forkAndStar.url} alt={forkAndStar.alt} width={16} height={16} />
                                    <p>{forkAndStar.name}</p>
                                    <p className='count'>{forkAndStar.count ? forkAndStar.count : '0'}</p>
                                </div>

                                <div className='symbol'>
                                    <p>{forkAndStar.symbol}</p>
                                </div>

                            </div>
                        )
                    })}
                </div>

            </div>

        </div>
    )
}

export default Header;