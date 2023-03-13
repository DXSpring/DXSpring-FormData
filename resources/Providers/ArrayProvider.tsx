// Services
import { ArrayService } from '../Services/ArrayService';

// Providers
import { ObjectProvider } from './ObjectProvider';

// Interface
export interface IArrayProvider {
    data?: any;
    key?: string;
    customKey?: string;
}

// Array Provider
export const ArrayProvider = ({ data, key, customKey }: IArrayProvider): any => {
    const FinalData: any = {};

    // Looping On Array Data
    if (data && !!data.length) {
        for (let Index = 0; Index < data.length; Index++) {
            // Value Is Object
            if (data[Index] instanceof Object && !(data[Index] instanceof Array) && !!Object.keys(data[Index]).length) {
                const ObjectData = ObjectProvider({ data: data[Index], key: `${key ? key : ''}${customKey ? '[' + customKey + ']' : ''}[${Index}]` });

                if (ObjectData && Object.keys(ObjectData).length) {
                    for (let Index = 0; Index < Object.keys(ObjectData).length; Index++) {
                        FinalData[Object.keys(ObjectData)[Index]] = ObjectData[Object.keys(ObjectData)[Index]];
                    }
                }
            }

            // Value Is Array
            if (data[Index] instanceof Array && !!data[Index].length) {
                const ArrayData = ArrayService({ data: data[Index], key: `${key ? key : ''}${customKey ? '[' + customKey + ']' : ''}[${Index}]`, customKey: customKey ? customKey : 'array' });

                if (ArrayData && Object.keys(ArrayData).length) {
                    for (let Index = 0; Index < Object.keys(ArrayData).length; Index++) {
                        FinalData[Object.keys(ArrayData)[Index]] = ArrayData[Object.keys(ArrayData)[Index]];
                    }
                }
            }

            // Value Is File
            if (data[Index] instanceof FileList && data[Index]?.length === 1) {
                FinalData[`${key ? key : ''}${customKey ? '[' + customKey + ']' : ''}[${Index}]`] = data[Index][0];
            }

            // Value Is String, Number Or Boolean
            if (data[Index] && !(data[Index] instanceof Array) && !(data[Index] instanceof Object) && !(data[Index] instanceof FileList)) {
                FinalData[`${key ? key : ''}${customKey ? '[' + customKey + ']' : ''}[${Index}]`] = data[Index];
            }
        }
    }

    return FinalData;
};
