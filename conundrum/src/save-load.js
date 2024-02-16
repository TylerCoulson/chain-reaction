export function saveJson(date, obj) {
    obj["date"] = date
    localStorage.setItem("conundrum", JSON.stringify(obj));
};

export function loadJson(date) {
    let data = localStorage.getItem("conundrum");
    data = JSON.parse(data);
    if (data === null || data["date"] != date) {
        return;
    }
    return data
};