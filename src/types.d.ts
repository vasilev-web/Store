type Modify<T, R> = Pick<T, Exclude<keyof T, keyof R>> & R;

declare module '*.png';
declare module '*.jpg';
declare module '*.gif';
declare module '*.svg';
declare module '*.scss';
