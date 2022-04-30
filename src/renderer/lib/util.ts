/*
 * @description: 
 * @author: 周金顺（云天河）
 */

export const getUnitWidth = () => {
    const div = document.createElement('div');
    div.style.width = '1rem';
    div.style.height = '1rem';
    div.style.boxSizing = '0';
    div.style.border = 'none';

    document.body.appendChild(div);
    const { width } = div.getBoundingClientRect();
    document.body.removeChild(div);
    return width;
};

export const getKeyFromKeyPath = (keyPath: string, split?: string) => {
    const keyArr = keyPath.split(split ?? '-');

    return keyArr[(keyArr.length - 1) || 0];
}
