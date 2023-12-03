import { error } from '@sveltejs/kit';

export async function load({url}){
    try {
        const downloadRawResponse = await fetch(`https://gdplayer.to/download/?${url.searchParams.get('id')}`);

        if(!downloadRawResponse.ok){
            throw error(500, 'download page error');
        }

        const downloadRaw = await downloadRawResponse.text();
        const kakenMatch = downloadRaw.match(/kaken = "(.*?)"/);

        if(!kakenMatch) {
            throw error(500, 'kaken ID not found');
        }
        
        const kaken = kakenMatch[1];

        const currentTimestamp = Math.round(new Date().getTime());

        const sourceEndpoint = `https://rafo3.filemoon.xyz/api/?${kaken}&_=${currentTimestamp}`;

        const response = await fetch(sourceEndpoint);

        if(!response.ok){
            throw error(500, 'Cannot fetch source');
        }
        const video = await response.json()

        return {
            title: video.title,
            sources: video.sources,
            poster: video.poster,
        }
    } catch (error) {
        console.log(error)
        throw error(500, 'Error', error);
    }
}