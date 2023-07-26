import React from 'react';
import { Avatar, Badge, Tag } from 'antd';
import Image from 'next/image';
import { UserOutlined, GithubOutlined, ForkOutlined, StarOutlined } from '@ant-design/icons';

const forkAndStars = [
    {
        url: '/assets/fork.svg',
        alt: 'Fork',
        name: 'Fork',
        count: '355',
        symbol: '▼',
    },
    {
        url: '/assets/star.svg',
        alt: 'Star',
        name: 'Star',
        count: '3.5k',
        symbol: '▼',
    }
]

const Header = () => {
    return (
        <div>

            <div className='header'>

                <div className='icon_input_div'>
                    <GithubOutlined className='githuboutlined' />
                    <input
                        className='search_input'
                        placeholder="Search or jump to…" />
                </div>

                <div className='avatar_div' >
                    <Badge dot color='blue' size="default">
                        <Avatar
                            className='avatar'
                            icon={<UserOutlined className='userOutlined' />}
                        />
                    </Badge>
                    <p className='pTag' >-</p>
                </div>

            </div>

            <div className='repoName_div'>

                <div className='repoName'>
                    <Image src='/assets/save.png' alt='save' width={16} height={16} />
                    <p className='fullName'>FullName</p>
                    <p className='public'>Public</p>
                </div>

                <div className='star_and_fork'>
                    {forkAndStars.map((forkAndStar, index) => {
                        return (
                            <div className='fork' key={index}>

                                <div className='fork_div'>
                                    <Image src={forkAndStar.url} alt={forkAndStar.alt} width={16} height={16} />
                                    <p>{forkAndStar.name}</p>
                                    <p className='count'>{forkAndStar.count}</p>
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