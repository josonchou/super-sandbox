/*
 * @description: 
 * @author: 周金顺（云天河）
 */

export interface DispatchAction {
    type?: string;
    payload: {
        [key: string|number]: any;
    }
}
