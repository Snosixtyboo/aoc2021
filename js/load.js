class DayData {
}
function loadDays(rd) {
    let days = new Array();
    for (let day = 1; day <= 25; day++) {
        let name = "Day " + day.toString();
        let filebase = "day" + '0'.repeat(2 - day.toString().length) + day.toString();
        let desc = "desc/" + filebase + ".txt";
        let input1 = "inputs/" + filebase + "_1.txt";
        let input2 = "inputs/" + filebase + "_2.txt";
        let src = "ts/" + filebase + ".ts";
        let promises = [rd(desc), rd(input1), rd(input2), rd(src), import("../js/" + filebase + ".js")];
        days.push(Promise.all(promises).then(function (contents) {
            let dayData = new DayData;
            dayData.name = name;
            dayData.desc = contents[0];
            dayData.input1 = contents[1];
            dayData.input2 = contents[2];
            dayData.source = contents[3].substr(0, contents[3].indexOf('// EOC'));
            dayData.solve1 = contents[4].solve_first;
            dayData.solve2 = contents[4].solve_second;
            return dayData;
        }));
    }
    return days;
}
export { loadDays, DayData };
//# sourceMappingURL=load.js.map