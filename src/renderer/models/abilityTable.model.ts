/*
 * @description: 
 * @author: 周金顺（云天河）
 */

import { Ability } from '@renderer/constanst';
import { makeModal } from '@renderer/store';

interface AbilityData {
    name: string;
    code: string;
    id: number;
    children?: Array<AbilityData>;
}

export interface AbilityTable {
    abilityTree: Array<AbilityData>;
    currentSelectMenu: number;
}

const AbilityTableModel = makeModal<AbilityTable>({
    name: 'abilityTable',
    initialState: {
        abilityTree: [],
        currentSelectMenu: 0,
    },
    effects: {
        *reqAbility(_, ctx) {
            // yield ctx.delay(1000);
            yield ctx.put({
                type: 'setAbility',
                payload: Ability.sort((a, b) => a.sort - b.sort),
            });
            yield ctx.put({
                type: 'selectMenu',
                payload: Ability[0].id,
            });
        }
    },
    reducers: {
        selectMenu: (state, { payload }) => {
            return {
                ...state,
                currentSelectMenu: payload,
            };
        },
        setAbility: (state, { payload }) => {
            return {
                ...state,
                abilityTree: payload,
            };
        },
    }
});

export default AbilityTableModel;
