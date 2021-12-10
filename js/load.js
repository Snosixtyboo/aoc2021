class DayData {
    constructor() {
        this.name = "";
        this.desc = "";
        this.input = "";
        this.source = "";
        this.solve1 = () => "";
        this.solve2 = () => "";
    }
}
function loadDays(rd) {
    let days = new Array();
    for (let day = 1; day <= 25; day++) {
        let name = "Day " + day.toString();
        let filebase = "day" + '0'.repeat(2 - day.toString().length) + day.toString();
        let desc = "desc/" + filebase + ".tex";
        let input = "inputs/" + filebase + ".txt";
        let src = "ts/" + filebase + ".ts";
        let promises = [rd(desc), rd(input), rd(src), import("../js/" + filebase + ".js")];
        days.push(Promise.all(promises).then(function (contents) {
            let dayData = new DayData;
            dayData.name = name;
            dayData.desc = contents[0];
            dayData.input = contents[1];
            dayData.source = contents[2].substr(0, contents[2].indexOf('// EOC'));
            dayData.solve1 = contents[3].solve_part1;
            dayData.solve2 = contents[3].solve_part2;
            return dayData;
        }));
    }
    return days;
}
export { loadDays, DayData };
//# sourceMappingURL=load.js.map