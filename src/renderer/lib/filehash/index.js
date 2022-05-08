/*
 * @description: 
 * @author: 周金顺（云天河）
 */
const worker = new Worker(new URL('./worker.js', import.meta.url));
console.log(worker, 'debug filehash worker');
export const filehash = (file) => {
    return new Promise((resolve, reject) => {
        const sg = `${Date.now()}@${Math.random()}`;

        const handleOk = ({ data = {} } = {}) => {
            if (data.invoke === 'hash' && sg === data.sg) {
                worker.removeEventListener('message', handleOk);
                resolve(data.hash || '');
            }
        };

        const handleError = (e) => {
            worker.removeEventListener('error', e);
            reject(e);
        }
        worker.addEventListener('message', handleOk);
        worker.addEventListener('error', handleError);
        worker.postMessage({
            invoke: 'hash',
            sg,
            file: file,
        });
    });
}