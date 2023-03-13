// Providers
import { ObjectProvider } from './ObjectProvider';
import { ArrayProvider } from './ArrayProvider';

// Interface
export interface IMasterProvider {
    data?: any;
    key?: string;
    json?: boolean;
}

// Master Provider
export const MasterProvider = ({ data, key, json }: IMasterProvider): any => {
    const FinalJSONData: any = {};
    const FinalFormData: FormData = new FormData();

    // Check Data If Not Exists
    if (!data) {
        return json ? FinalJSONData : FinalFormData;
    }

    // If Data Is Object
    if (data instanceof Object && !(data instanceof Array) && !!Object.keys(data).length) {
        for (let Index = 0; Index < Object.keys(data).length; Index++) {
            // Value Is Object
            if (data[Object.keys(data)[Index]] instanceof Object && !(data[Object.keys(data)[Index]] instanceof Array) && !!Object.keys(data[Object.keys(data)[Index]]).length) {
                const ObjectData = ObjectProvider({ data: data[Object.keys(data)[Index]], key: Object.keys(data)[Index] });

                if (ObjectData && Object.keys(ObjectData).length) {
                    for (let Index = 0; Index < Object.keys(ObjectData).length; Index++) {
                        FinalJSONData[Object.keys(ObjectData)[Index]] = ObjectData[Object.keys(ObjectData)[Index]];
                        FinalFormData.append(Object.keys(ObjectData)[Index], ObjectData[Object.keys(ObjectData)[Index]]);
                    }
                }
            }

            // Value Is Array
            if (data[Object.keys(data)[Index]] instanceof Array && data[Object.keys(data)[Index]].length) {
                const ArrayData = ArrayProvider({ data: data[Object.keys(data)[Index]], key: Object.keys(data)[Index] });

                if (ArrayData && Object.keys(ArrayData).length) {
                    for (let Index = 0; Index < Object.keys(ArrayData).length; Index++) {
                        FinalJSONData[Object.keys(ArrayData)[Index]] = ArrayData[Object.keys(ArrayData)[Index]];
                        FinalFormData.append(Object.keys(ArrayData)[Index], ArrayData[Object.keys(ArrayData)[Index]]);
                    }
                }
            }

            // Value Is File
            if (data[Object.keys(data)[Index]] instanceof FileList && data[Object.keys(data)[Index]]?.length === 1) {
                FinalJSONData[Object.keys(data)[Index]] = data[Object.keys(data)[Index]][0];
                FinalFormData.append(Object.keys(data)[Index], data[Object.keys(data)[Index]][0]);
            }

            // Value Is String, Number Or Boolean
            if (
                data[Object.keys(data)[Index]] &&
                !(data[Object.keys(data)[Index]] instanceof Array) &&
                !(data[Object.keys(data)[Index]] instanceof Object) &&
                !(data[Object.keys(data)[Index]] instanceof FileList)
            ) {
                FinalJSONData[Object.keys(data)[Index]] = data[Object.keys(data)[Index]];
                FinalFormData.append(Object.keys(data)[Index], data[Object.keys(data)[Index]]);
            }
        }
    }

    // If Data Is Array
    if (data instanceof Array && !!data.length) {
        for (let Index = 0; Index < data.length; Index++) {
            // Value Is Object
            if (data[Index] instanceof Object && !(data[Index] instanceof Array) && !!Object.keys(data[Index]).length) {
                const ObjectData = ObjectProvider({ data: data[Index], key: `${key ? key : 'object'}[${Index}]` });

                if (ObjectData && Object.keys(ObjectData).length) {
                    for (let Index = 0; Index < Object.keys(ObjectData).length; Index++) {
                        FinalJSONData[Object.keys(ObjectData)[Index]] = ObjectData[Object.keys(ObjectData)[Index]];
                        FinalFormData.append(Object.keys(ObjectData)[Index], ObjectData[Object.keys(ObjectData)[Index]]);
                    }
                }
            }

            // Value Is Array
            if (data[Index] instanceof Array && !!data[Index].length) {
                const ArrayData = ArrayProvider({ data: data[Index], key: `${key ? key : 'array'}[${Index}]`, customKey: key ? key : 'array' });

                if (ArrayData && Object.keys(ArrayData).length) {
                    for (let Index = 0; Index < Object.keys(ArrayData).length; Index++) {
                        FinalJSONData[Object.keys(ArrayData)[Index]] = ArrayData[Object.keys(ArrayData)[Index]];
                        FinalFormData.append(Object.keys(ArrayData)[Index], ArrayData[Object.keys(ArrayData)[Index]]);
                    }
                }
            }

            // Value Is File
            if (data[Index] instanceof FileList && data[Index]?.length === 1) {
                FinalJSONData[`${key ? key : 'file'}[${Index}]`] = data[Index][0];
                FinalFormData.append(`${key ? key : 'file'}[${Index}]`, data[Index][0]);
            }

            // Value Is String, Number Or Boolean
            if (data[Index] && !(data[Index] instanceof Array) && !(data[Index] instanceof Object) && !(data[Index] instanceof FileList)) {
                FinalJSONData[`${key ? key : 'value'}[${Index}]`] = data[Index];
                FinalFormData.append(`${key ? key : 'value'}[${Index}]`, data[Index]);
            }
        }
    }

    // If Data Is File
    if (data instanceof FileList && data.length === 1) {
        FinalJSONData[key ? key : 'file'] = data[0];
        FinalFormData.append(key ? key : 'file', data[0]);
    }

    // If Data Is String, Number Or Boolean
    if (!(data instanceof Object) && !(data instanceof Array) && !(data instanceof FileList)) {
        FinalJSONData[key ? key : 'value'] = data;
        FinalFormData.append(key ? key : 'value', data);
    }

    // OutPut
    return json ? FinalJSONData : FinalFormData;
};
