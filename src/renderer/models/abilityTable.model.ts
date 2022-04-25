/*
 * @description: 
 * @author: 周金顺（云天河）
 */
import { ResponseTuple } from '@renderer/lib/request';
import { getAbilityTable } from '@renderer/service/course';
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
            const [isOk, ability = []] = (yield ctx.call(getAbilityTable)) as unknown as ResponseTuple<Array<any>>;
            if (isOk) {
                yield ctx.put({
                    type: 'setAbility',
                    payload: ability.sort((a, b) => a.sort - b.sort),
                });
                yield ctx.put({
                    type: 'selectMenu',
                    payload: (ability[0] || {}).id,
                });
            }
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
