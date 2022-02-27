/*
 * @description: 
 * @author: 周金顺（云天河）
 */

import { EffectFunction } from './interface';

interface ModelConfig {
    reducer: (state: any, action: any) => any;
    reducersMap: any;
}

export const EffectsSet = new Map<string, EffectFunction>();

export const Models = new Map<string, ModelConfig>();
