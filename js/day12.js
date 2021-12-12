function mapCaves(lines) {
    const caves = new Map();
    lines.forEach(line => {
        const [from, to] = line.split("-");
        [[from, to], [to, from]].forEach(x => ((from, to) => {
            const cave = caves.get(from);
            if (cave !== undefined)
                cave.to.push(to);
            else {
                const size = from == from.toUpperCase() ? "big" : "small";
                const cave = { name: from, size: size, to: [to], visited: 0 };
                caves.set(from, cave);
            }
        })(...x));
    });
    const start = caves.get("start");
    const end = caves.get("end");
    if (start === undefined || end === undefined)
        throw Error("Cannot navigate this map!");
    return { caves, start, end };
}
function pathsToEnd(memory, current, caves, twice = false, path = []) {
    if (current.visited > 0 && current.size == "small")
        if (twice && current.name != "end" && current.name != "start")
            twice = false;
        else
            return 0;
    if (current.name == "end")
        return 1;
    const pathKey = path.sort().join('').concat(current.name);
    const knownPaths = memory.get(pathKey);
    if (knownPaths !== undefined)
        return knownPaths;
    current.visited++;
    const numPaths = current.to.reduce((sum, route) => {
        const next = caves.get(route);
        if (next === undefined)
            throw Error("Somehow this cave is not on my map...");
        return sum + pathsToEnd(memory, next, caves, twice, path.concat(current.name));
    }, 0);
    current.visited--;
    memory.set(pathKey, numPaths);
    return numPaths;
}
function solve_part1(input) {
    const lines = input.split("\n");
    const { caves, start, end } = mapCaves(lines);
    const memory = new Map();
    const result = pathsToEnd(memory, start, caves);
    return result.toString();
}
function solve_part2(input) {
    const lines = input.split("\n");
    const { caves, start, end } = mapCaves(lines);
    const memory = new Map();
    const result = pathsToEnd(memory, start, caves, true);
    return result.toString();
}
// EOC
export { solve_part1, solve_part2 };
//# sourceMappingURL=day12.js.map