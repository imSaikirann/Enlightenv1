import { atom } from "recoil";

export interface Data {
    title: string;
    information: string;
    id: string;
    authorId: string;
    authorName:string
    createdAt:string;
}

export interface questionData {
    question:string;
    id: string;
    authorId: string;
    createdAt:string;
}

export interface Profile {
    title: string;
    information: string;
    id: string;
    authorId: string;
    
  
}

export interface selectedData {
    question:string;
}


export const questionAtom = atom< questionData[]>({
    key: " questionAtom ",
    default: []
});

export const selectedQuestion= atom< selectedData[]>({
    key: " selectedQuestion ",
    default: []
});

export const dataAtom = atom<Data[]>({
    key: "dataAtom",
    default: []
});

export const userProfile = atom<Profile[]>({
    key: "userProfile",
    default: []
});

