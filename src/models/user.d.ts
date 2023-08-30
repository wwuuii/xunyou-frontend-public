export type User = {
    id: number;
    userName: string;
    userAccount: string;
    userAvatar?: string;
    gender: number;
    phone: string;
    email: string;
    userStatus: number;
    userRole: number;
    userProfile: string;
    planetCode:string;
    tags:string[];
    createTime: Date;
    unReadNumSum: number;
};