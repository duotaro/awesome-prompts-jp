const API_KEY = process.env.DEEPL_API_KEY ;
const API_URL = 'https://api-free.deepl.com/v2/translate';
import { translateByGas } from "./gas";

/**
 * 環境考慮
 * @param {*} target 
 * @returns 
 */
export const deeplTranslate = async (target) => {
    if(process.env.NODE_ENV !== 'production'){
        // 翻訳は本番環境だけ
        return createRes(target);
    }
    let content = encodeURI(`auth_key=${API_KEY}&text=${target}&source_lang=EN&target_lang=JA`);
    let url = API_URL + '?' + content;

    const res = await fetch(url);
    if (res.ok) {
        const jsonItem = res.json()
        return jsonItem;
    } 
    return await translateByGas(target);
};

/**
 * 強制的に翻訳
 * @param {*} target 
 * @returns 
 */
export const doDeeplTranslate = async (target) => {
    let content = encodeURI(`auth_key=${API_KEY}&text=${target}&source_lang=EN&target_lang=JA`);
    let url = API_URL + '?' + content;

    const res = await fetch(url);
    if (res.ok) {
        const jsonItem = res.json()
        
        return jsonItem;
    } 
    // google
    const result =  await translateByGas(target);
    return result
};

export const createRes = (target) => {

    return {
        translations: [
            {text: target}
        ]
    }
}