export function saveJson(date, obj) {
    obj["date"] = date
    localStorage.setItem("association", JSON.stringify(obj));
};

export function loadJson(date) {
    let data = localStorage.getItem("association");
    data = JSON.parse(data);
    if (data === null || data["date"] != date) {
        return;
    }
    return data
};