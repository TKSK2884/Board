export interface UserInfo {
    user_id: string;
    nickname: string;
    email: string;
}

export interface Post {
    id: number;
    title: string;
    written_time: string;
    writer_id: number;
    writer_name: string;
    content: string;
    category: string;
    writer?: string;
}

export interface Content {
    title: string;
    time: string;

    name: string;
    content: string;
}
