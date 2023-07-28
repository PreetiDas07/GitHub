import axios from 'axios';


export const fetchLatestReleaseData = async () => {
    try {
        const response = await axios.get('https://api.github.com/repos/acheong08/EdgeGPT/releases');
        if (response.data.length > 0) {
            return {
                releaseCount: response.data.length,
                latestRelease: response.data[0],
            };
        } else {
            return {
                releaseCount: 0,
                latestRelease: null,
            };
        }
    } catch (error) {
        console.error('Error fetching repositories', error);
        return {
            releaseCount: -1,
            latestRelease: null,
        };
    }
};


export const fetchContributors = async () => {
    try {
        const response = await axios.get('https://api.github.com/repos/acheong08/EdgeGPT/contributors');
        return response.data;
    } catch (error) {
        console.error('Error fetching contributors:', error);
        return [];
    }
};


export const fetchProgressData = async () => {
    try {
        const response = await fetch('https://api.github.com/repos/acheong08/EdgeGPT/languages');
        const data = await response.json();
        const totalSize = Object.values(data).reduce((acc, val) => acc + val, 0);
        const progress = Object.keys(data).map((language, index) => ({
            language,
            percentage: (data[language] / totalSize) * 100,
            color: index === 0 ? '#3572A5' : index === 1 ? '#89E051' : '#FFC107',
        }));
        return progress;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};
