// Providers
import { ObjectProvider } from '../Providers/ObjectProvider';
import { ArrayProvider } from '../Providers/ArrayProvider';

// Interface
export interface IObjectService {
    data?: any;
    key?: string;
}

// Object Service
export const ObjectService = ({ data, key }: IObjectService): any => {
    const FinalData: any = {};

    // Looping On Object Data
    if (data && !!Object.keys(data).length) {
        for (let Index = 0; Index < Object.keys(data).length; Index++) {
            // Value Is Object
            if (data[Object.keys(data)[Index]] instanceof Object && !(data[Object.keys(data)[Index]] instanceof Array) && !!Object.keys(data[Object.keys(data)[Index]]).length) {
                const ObjectData = ObjectProvider({ data: data[Object.keys(data)[Index]], key: `${key ? key + '[' : ''}${Object.keys(data)[Index]}${key ? ']' : ''}` });

                if (ObjectData && Object.keys(ObjectData).length) {
                    for (let Index = 0; Index < Object.keys(ObjectData).length; Index++) {
                        FinalData[Object.keys(ObjectData)[Index]] = ObjectData[Object.keys(ObjectData)[Index]];
                    }
                }
            }

            // Value Is Array
            if (data[Object.keys(data)[Index]] instanceof Array && data[Object.keys(data)[Index]].length) {
                const ArrayData = ArrayProvider({ data: data[Object.keys(data)[Index]], key: `${key ? key + '[' : ''}${Object.keys(data)[Index]}${key ? ']' : ''}` });

                if (ArrayData && Object.keys(ArrayData).length) {
                    for (let Index = 0; Index < Object.keys(ArrayData).length; Index++) {
                        FinalData[Object.keys(ArrayData)[Index]] = ArrayData[Object.keys(ArrayData)[Index]];
                    }
                }
            }

            // Value Is File
            if (data[Object.keys(data)[Index]] instanceof FileList && data[Object.keys(data)[Index]]?.length === 1) {
                FinalData[`${key ? key + '[' : ''}${Object.keys(data)[Index]}${key ? ']' : ''}`] = data[Object.keys(data)[Index]][0];
            }

            // Value Is String, Number Or Boolean
            if (
                data[Object.keys(data)[Index]] &&
                !(data[Object.keys(data)[Index]] instanceof Array) &&
                !(data[Object.keys(data)[Index]] instanceof Object) &&
                !(data[Object.keys(data)[Index]] instanceof FileList)
            ) {
                FinalData[`${key ? key + '[' : ''}${Object.keys(data)[Index]}${key ? ']' : ''}`] = data[Object.keys(data)[Index]];
            }
        }
    }

    return FinalData;
};
