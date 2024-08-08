import { atom,selector } from "recoil";


export interface User {
    email:string,
    password:string,
    userName:string,
}


export const userState = atom<boolean>({
    key: 'userState',
    default: false,
});



export const userStateSelector = selector({
    key: 'userStateSelector',
    get: ({}) => {
        const isUserLoggedIn = localStorage.getItem('isUserLoggedIn') === 'true';
        return isUserLoggedIn;
    },
});


export const authLoadingState = atom<boolean>({
    key:'authLoadingState',
    default:false
})
