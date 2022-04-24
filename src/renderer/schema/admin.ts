/*
 * @description: 
 * @author: 周金顺（云天河）
 */

export interface AdminDTO {
    id: number;
    isBan?: boolean;
    username?: string;
    nickname?: string;
    role?: number; // 1: 管理员 2: 讲师
}

export interface LoginResult {
    admin: AdminDTO;
    token: string;
}

export interface AdminListResult {
    list: AdminDTO[];
    total: number;
    page: number;
    pageSize: number;
}

export interface CreateUserDTO {
    username: string;
    role: number;
}
