/*
 * @description: 
 * @author: 周金顺（云天河）
 */

import { getAllSecondTrainingItems } from '@renderer/constanst/training';
import { makeModal } from '@renderer/store';

const CourseModel = makeModal({
    name: 'course',
    initialState: {
        category: getAllSecondTrainingItems(),
    },
});

export default CourseModel;
