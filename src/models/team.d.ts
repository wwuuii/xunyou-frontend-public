import {User} from "./user.d.ts";

export enum TeamStatusEnum {
    PUBLIC = 0,
    PRIVATE = 1,
    PASSWORD = 2,
}

/**
 * 队伍类别
 */
export type TeamType = {
    id: number;
    name: string;
    description: string;
    userId:number;
    expireTime: Date;//表示可有可无
    maxNum: number;
    password?: string,
    status: TeamStatusEnum;
    createTime: Date;
    updateTime: Date;
    createUser?: User;
    hasJoinNum?: number;
    userIds?:number[];
};