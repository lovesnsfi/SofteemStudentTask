export default function formatDataTime(vlaue) {
    var d = new Date(vlaue);
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var date = d.getDate();

    var hour = d.getHours();
    var second = d.getSeconds();
    var minutes = d.getMinutes();
    return [year, month, date].join("-") + " " + [hour, second, minutes].join(":");
}