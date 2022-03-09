// declare module '*.less' {
//     const resource: {[key: string]: string};
//     export = resource;
// }

// declare module '*.css' {
//     const resource: {[key: string]: string};
//     export = resource;
// }

declare module '*.less';
declare module '*.css';

declare module '*.png' {
    const ref: string;
    export = ref;
}

declare module '*.jpeg' {
    const jpeg: string;
    export default jpeg;
}

declare module '*.jpg' {
    const ref: string;
    export default ref;
}

declare module '*.svg' {
    const ref: string;
    export default ref;
}

declare module '*.gif' {
    const ref: string;
    export default ref;
}


declare module '*.pdf' {
    const ref: string;
    export default ref;
}

declare module '*.mp4' {
    const ref: string;
    export default ref;
}
