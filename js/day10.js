var Op;
(function (Op) {
    Op[Op["["] = 0] = "[";
    Op[Op["("] = 1] = "(";
    Op[Op["{"] = 2] = "{";
    Op[Op["<"] = 3] = "<";
})(Op || (Op = {}));
const isValidOp = (s) => typeof s == "string" && s in Op;
var Cls;
(function (Cls) {
    Cls[Cls["]"] = 0] = "]";
    Cls[Cls[")"] = 1] = ")";
    Cls[Cls["}"] = 2] = "}";
    Cls[Cls[">"] = 3] = ">";
})(Cls || (Cls = {}));
const isValidCls = (s) => typeof s == "string" && s in Cls;
const pairs = new Map([[Op["("], Cls[")"]], [Op["["], Cls["]"]], [Op["{"], Cls["}"]], [Op["<"], Cls[">"]]]);
var Problem;
(function (Problem) {
    Problem[Problem["INCOMPLETE_START"] = 0] = "INCOMPLETE_START";
    Problem[Problem["INCOMPLETE_END"] = 1] = "INCOMPLETE_END";
    Problem[Problem["CORRUPTED"] = 2] = "CORRUPTED";
})(Problem || (Problem = {}));
function parse(line) {
    const parseStack = new Array();
    for (const c of line) {
        if (isValidOp(c))
            parseStack.push(Op[c]);
        else if (isValidCls(c)) {
            const toMatch = parseStack.pop();
            if (toMatch == undefined)
                return { problem: Problem.INCOMPLETE_END, stack: parseStack, offender: c };
            else if (pairs.get(toMatch) != Cls[c])
                return { problem: Problem.CORRUPTED, stack: parseStack, offender: c };
        }
    }
    if (parseStack.length)
        return { problem: Problem.INCOMPLETE_START, stack: parseStack };
}
function solve_part1(input) {
    const lines = input.split('\n');
    const scoring = new Map([[Cls[')'], 3], [Cls[']'], 57], [Cls['}'], 1197], [Cls['>'], 25137]]);
    const result = lines.reduce((sum, line) => {
        const cmd = parse(line);
        if (cmd?.problem == Problem.CORRUPTED && isValidCls(cmd.offender)) {
            const score = scoring.get(Cls[cmd.offender]);
            if (score === undefined)
                throw Error("Scoring is not defined for " + cmd.offender);
            return sum + score;
        }
        return sum;
    }, 0);
    return result.toString();
}
function solve_part2(input) {
    const lines = input.split('\n');
    const scoring = new Map([[Cls[')'], 1], [Cls[']'], 2], [Cls['}'], 3], [Cls['>'], 4]]);
    const scores = lines.map(line => {
        let lineScore = 0;
        const cmd = parse(line);
        if (cmd?.problem == Problem.INCOMPLETE_START) {
            let opener;
            while ((opener = cmd.stack.pop()) !== undefined) {
                const closer = pairs.get(opener);
                if (closer === undefined)
                    throw Error("Closer not defined for Opener " + opener);
                const score = scoring.get(closer);
                if (score === undefined)
                    throw Error("Scoring not defined for " + closer);
                lineScore = 5 * lineScore + score;
            }
        }
        return lineScore;
    });
    const result = scores.filter(s => s != 0).sort((a, b) => a - b).find((_, i, a) => i == Math.floor(a.length / 2));
    if (result === undefined)
        throw Error("Not enough errors to find a middle one!");
    return result.toString();
}
// EOC
export { solve_part1, solve_part2 };
//# sourceMappingURL=day10.js.map