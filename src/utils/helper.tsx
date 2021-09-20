import moment from "moment"

export const isLate = (dueDate?:string) => {
    return dueDate && moment(dueDate).isBefore(new Date());
}