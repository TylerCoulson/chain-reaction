export function saveJson(date, obj) {
    console.log('save')
    // localStorage.setItem(date, JSON.stringify(obj));
};

export function loadJson(date) {
    console.log("load")
    let data = localStorage.getItem(date);

    return JSON.parse(data);
};