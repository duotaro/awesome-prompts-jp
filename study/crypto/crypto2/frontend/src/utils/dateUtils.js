import moment from "moment";
moment.locale('ja')
const DEFAULT_DATE_FORMAT = '';
export const YYYY_MM_DD_FORMAT = 'YYYY-MM-DD';
export const YYYY_MM_DD_HH_MM_SS_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const YYYY_MM_DD_HH_FORMAT = 'YYYY-MM-DD HH';
/**
 * 今日を取得します
 */
export function getMomentDate(date) {
    if(!date) return moment();
    return moment(date);
}

/**
 * 日付を指定したフォーマットに変換します
 * @param {*} date 
 * @param {*} format 
 */
export function formatDate(date, format) {
    if (!date) date =  moment();
    if (!format) format = DEFAULT_DATE_FORMAT;
    return moment(date).format(format);
}

/**
 * unix時間を取得します
 */
export function getUnixTime(date) {
    if(!date) return moment().unix();
    return moment(date).unix();
}

/**
 * unix時間から日付を取得します
 */
 export function getDateFromUnixTime(unixtime, doFormat, format) {
    let date = moment.unix();
    if(unixtime) {
        date = moment.unix(unixtime);
    }
    if(doFormat){
        let f = format ? format : YYYY_MM_DD_HH_MM_SS_FORMAT
        return formatDate(date, f)
    }
    return date
}


export function beforeDate(before, format) {
    return addDate(getMomentDate(), -1*before, format)
}

const addMoment = (date, add, slug, format) =>  {
    if(!add) return date;

    if (!date) date = moment();
    if (!slug) slug = 'd';
    if (!format) format = DEFAULT_DATE_FORMAT;
    return moment(date).add(add, slug).format(format);
}

/**
 * 年の加算を実施
 * @param {*} date 
 * @param {*} add 
 * @param {*} format 
 */
export function addYear(date, add, format) {
    return addMoment(date, add, 'y', format);
}

/**
 * 月の加算を実施
 * @param {*} date 
 * @param {*} add 
 * @param {*} format 
 */
export function addWeek(date, add, format) {
    return addMoment(date, add, 'w', format);
}

/**
 * 日の加算を実施
 * @param {*} date 
 * @param {*} add 
 * @param {*} format 
 */
export function addDate(date, add, format) {
    return addMoment(date, add, 'd', format);
}

/**
 * 時間の加算を実施
 * @param {*} date 
 * @param {*} add 
 * @param {*} format 
 */
export function addHour(date, add, format) {
    return addMoment(date, add, 'h', format);
}

/**
 * 曜日を取得します
 */
export function getMonth(date) {
    if(!date) {
        date = new Date()
    }
    return moment(date).format('MMM')
}

/**
 * 曜日を取得します
 */
export function getYoubi(date, format) {
    if(!date) {
        date = new Date()
    }
    if(!format){
        format = 'dddd'
    }
    return moment(date).format(format)
}

/**
 * 指定日付間の差分を取得します
 * @param {*} to 
 * @param {*} from 
 * @param {*} type 
 */
export function getDiff(to, from, type) {
    if(!to || !from){
        return 0
    }
    const dateTo = moment(to)
    const dateFrom = moment(from)
    if(!type){
        type = 'hour'
    }
    return dateTo.diff(dateFrom, type) 
}

/**
 * 第一引数の日付が第二引数の日付以前かどうか
 * @param {*} to 
 * @param {*} from 
 */
export function isBefore(to, from) {
    if(!to || !from){
        return false
    }
    if(!moment(to).isValid() || !moment(from).isValid()){
        return false
    }
    const dateTo = moment(to)
    const dateFrom = moment(from)
    let result = dateTo.isBefore(dateFrom)
    return result
}

/**
 * 指定範囲の日付リストを取得します
 * @param {*} to 
 * @param {*} from 
 * @returns 
 */
export function getRangeDateList(from, to) {
    if(!from){
        from = beforeDate(7, YYYY_MM_DD_FORMAT)
    }
    if(!to){
        to = formatDate(new Date(), YYYY_MM_DD_FORMAT)
    }
    let dateList = [];
    // 最初の日付を追加
    dateList.push(from)
    let index = 1
    let next = from
    while (next < to) {
        // 翌日取得
        next = addDate(from, index, YYYY_MM_DD_FORMAT)
        // リストに追加
        dateList.push(next)
        index++
    }

    return dateList;
}
/**
 * 指定範囲の日付リストを取得します
 * @param {*} to 
 * @param {*} from 
 * @returns 
 */
export function getRangeDateTimeList(from, to, format) {
    let resultList = []

    if(!format) format = YYYY_MM_DD_HH_FORMAT

    let dateList = getRangeDateList(from, to);
    for(const date of dateList){
        resultList.push(formatDate(date, format))
        for(let i = 1; i< 24; i++){
            let next = addHour(date, i, format)
            // リストに追加
            resultList.push(next)
        }
    }
    return resultList;
}