import dayjs from "dayjs";
import numeral from "numeral";

/**
 * 
 * @param stringDate iso 8601
 */
export function formatDate (stringDate: string) {
    return dayjs(stringDate).format("MMM, DD YYYY");
}

export function formatMoney (money: number) {
    return numeral(money).format("0,0")
}