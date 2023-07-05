import { createRes } from "./deepl";
export const translateByGas = async (target) => {
    let content = encodeURI(`text=${target}`);
    let url = process.env.GAS_API_URL + '?' + content;

    const res = await fetch(url).then((r) => r.text());;
    console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■")
    return createRes(res)
}