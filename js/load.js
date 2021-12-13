class DayData {
    constructor() {
        this.name = "";
        this.desc = "";
        this.input = "";
        this.source = "";
        this.init = () => { };
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
        let srcTs = "ts/" + filebase + ".ts";
        let srcRs = "rs/" + filebase + "/" + filebase + ".rs";
        let src = Promise.allSettled([rd(srcTs), rd(srcRs)]).then(content => {
            if (content[0].status == "fulfilled")
                return content[0].value;
            if (content[1].status == "fulfilled")
                return content[1].value;
            throw Error("404, no code");
        });
        let promises = [rd(desc), rd(input), src, import("../js/" + filebase + ".js")];
        days.push(Promise.all(promises).then(function (contents) {
            let dayData = new DayData;
            dayData.name = name;
            dayData.desc = contents[0];
            dayData.input = contents[1];
            dayData.source = contents[2].substr(0, contents[2].indexOf('// EOC'));
            dayData.init = contents[3].default;
            dayData.solve1 = contents[3].solve_part1;
            dayData.solve2 = contents[3].solve_part2;
            return dayData;
        }));
    }
    return days;
}
export { loadDays, DayData };
//# sourceMappingURL=load.js.map