import * as fs from 'fs';

function loadDays(readFunc) {
    let days = new Array();
    for (let day = 1; day <= 25; day++) {
        let name = "Day " + day.toString();
        let file = "day" + '0'.repeat(2 - day.toString().length) + day.toString();
        let descFile = "desc/" + file + ".txt";
        let { success: descSuccess, content: desc } = readFunc(descFile);
        if (!descSuccess) {
            console.log("No day " + day.toString() + " yet!");
            continue;
        }
        let input1File = "inputs/" + file + "_1.txt";
        let { success: input1Success, content: input1 } = readFunc(input1File);
        if (!input1Success)
            throw Error("Unable to locate input file '" + input1File + "'");
        let input2File = "inputs/" + file + "_1.txt";
        let { success: input2Success, content: input2 } = readFunc(input1File);
        if (!input2Success)
            throw Error("Unable to locate input file '" + input2File + "'");
        let srcFile = "ts/" + file + ".ts";
        let { success: srcSuccess, content: src } = readFunc(srcFile);
        if (!srcSuccess)
            if (!srcSuccess)
                throw Error("Unable to locate source file '" + srcFile + "'");
        let solve1, solve2;
        import("../js/" + file + ".js").then(module => { solve1 = module.solve_first, solve2 = module.solve_first; });
        days.push({ name: name, desc: desc, input1: input1, input2: input2, source: src, solve1: solve1, solve2: solve2 });
    }
    return days;
}

const readFileNode = function (file) {
    let content;
    try {
        content = fs.readFileSync(file, 'utf8');
    }
    catch (error) {
        return { success: false, content: "" };
    }
    return { success: true, content: content };
};
loadDays(readFileNode);
console.log("Node.js AOC Test");
