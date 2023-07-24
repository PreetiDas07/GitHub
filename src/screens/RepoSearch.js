// RepoSearch.js
import React, { useContext} from 'react';
import { RepoContext } from '../components/RepoContext';
import axios from 'axios';


export default function RepoSearch() {
   
    const {searchTerm, setSearchTerm,  setRepositories } = useContext(RepoContext);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`https://api.github.com/search/repositories?q=${searchTerm}`);
            setRepositories(response.data.items);
        } catch (error) {
            console.error("Error fetching repositories", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input className='repoSearchInput'
                    type='text'
                    placeholder='Search or jump to…'
                    value={searchTerm}
                    onChange={handleChange}

                />

            </form>
        </div>
    );
}
