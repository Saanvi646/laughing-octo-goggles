
export interface Letter {
    id: number;
    created_at: string;
    title: string;
    content: string;
    era: 'midnights' | 'red' | 'folklore' | 'lover' | string;
    cover_image: string | null;
    author: string;
}

export interface Song {
    id: number;
    added_at: string;
    title: string;
    artist: string;
    cover_url: string | null;
    preview_url: string | null;
    embed_code?: string;
}

export interface PromiseItem {
    id: number;
    created_at: string;
    title: string;
    description: string;
    is_fulfilled: boolean;
}
