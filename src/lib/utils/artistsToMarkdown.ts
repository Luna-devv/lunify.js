import { PartialArtist } from '../structures';

export const aristsToMarkdown = (artists: PartialArtist[], max?: number) => {
    const arr = artists.map((artist) => `[${artist.name}](<https://open.spotify.com/artist/${artist.id}>)`);

    if (max && arr.length > max) {
        const shownArists = arr.slice(0, max).join(', ');
        const remainingCount = Math.max(0, arr.length - max);

        return `${shownArists} & ${remainingCount} more`;
    }

    return arr.join(', ');
};