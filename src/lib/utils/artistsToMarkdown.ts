import { Artist, PartialArtist } from '../structures';

/**
 * Converts an array of artists to markdown
 * @param artists - An array of partial artists to convert to markdown
 * @param max - How many artists to show before showing the remaining count
 * @returns Markdown string
 */
export function aristsToMarkdown(artists: (PartialArtist | Artist)[], max?: number) {
    const arr = artists.map((artist) => `[${escapeMarkdown(artist.name)}](<https://open.spotify.com/artist/${artist.id}>)`);

    if (max && arr.length > max) {
        const shownArists = arr.slice(0, max).join(', ');
        const remainingCount = Math.max(0, arr.length - max);

        return `${shownArists} & ${remainingCount} more`;
    }

    return arr.join(', ');
}

/**
 * Escapes some common markdown characters in a string
 * @param input - The input string
 * @returns Markdown escaped string
 */
export function escapeMarkdown(input: string): string {
    const markdownCharacters = /\\|`|\*|_|{|}|\[|\]|\(|\)|#|\+|-|\.|!/g;
    const escapedInput = input.replace(markdownCharacters, '\\$&');
    return escapedInput;
}