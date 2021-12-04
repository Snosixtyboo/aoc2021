function solve_part1(input) {
    const journey = { forward: 0, up: 0, down: 0 };
    const lines = input.split('\n');
    lines.forEach(line => { (v => journey[v[0]] += parseInt(v[1]))(line.split(' ')); });
    const result = journey.forward * (journey.down - journey.up);
    return result.toString();
}
function solve_part2(input) {
    const submarine = {
        horizontal: 0, depth: 0, aim: 0,
        forward: function (x) { this.horizontal += x; this.depth += x * this.aim; },
        up: function (x) { this.aim -= x; }, down: function (x) { this.aim += x; }
    };
    const lines = input.split('\n');
    lines.forEach(line => { (v => submarine[v[0]](parseInt(v[1])))(line.split(' ')); });
    const result = submarine.depth * submarine.horizontal;
    return result.toString();
}
// EOC
export { solve_part1, solve_part2 };
//# sourceMappingURL=day02.js.map