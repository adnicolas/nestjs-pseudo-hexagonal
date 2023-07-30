export const isLocal: boolean = process.env.NODE_ENV === 'local';
export const envFilePath = `.${process.env.NODE_ENV}.env`;
