import React, { useContext, useRef, useEffect } from 'react';
import { RepoContext } from '../components/RepoContext';
import axios from 'axios';

export default function RepoSearch() {

    const { searchTerm, setSearchTerm, setRepositories } = useContext(RepoContext);
    const inputRef = useRef(null);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const handleSlashClick = () => {
        inputRef.current.focus();
    };

    const handleKeyDown = (e) => {
        if (e.key === '/') {
            e.preventDefault();
            inputRef.current.focus();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!searchTerm) {
            alert("Please enter a repositories")
            return;
        }
        try {
            const response = await axios.get(`https://api.github.com/search/repositories?q=${searchTerm}`);
            const repoData = response.data.items;
            const matchedRepository = repoData.find(repo => (repo.full_name === searchTerm.trim("")));

            if (!matchedRepository) {
                alert("Some repositories have names that do not match the search term.");
            } else {
                setRepositories(repoData);
            }
        } catch (error) {
            console.error("Error fetching repositories", error);
            alert("An error occurred while fetching repositories. Please try again later.");
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input className='repoSearchInput'
                    ref={inputRef}
                    type='text'
                    placeholder='Search or jump to…'
                    value={searchTerm}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
                <span className='slash' onClick={handleSlashClick}>/</span>
            </form>
        </div>
    );
}
