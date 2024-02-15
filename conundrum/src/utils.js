export function getSystemDate() {
    let currentDate = new Date();
    let currMonth = currentDate.getMonth()+1;
    let strDate = `${currentDate.getFullYear()}-${('0'+currMonth).slice(-2)}-${('0'+currentDate.getDate()).slice(-2)}`;
    return strDate
}