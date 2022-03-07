/*
 * @description: 
 * @author: 周金顺（云天河）
 */

export interface AnyParams {
    [key: string]: any;
}

export const delay = (timeout: number) => new Promise((resolve) => {
    setTimeout(() => {
        resolve(true);
    }, timeout);
});