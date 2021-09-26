import moment from "moment"

export const isLate = (dueDate?:(string | null)) => {
    return dueDate && moment(dueDate).isBefore(new Date());
}