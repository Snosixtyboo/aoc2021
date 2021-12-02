function solve_first(input) {
    let journey = { forward: 0, up: 0, down: 0 };
    let lines = input.split('\n');
    lines.forEach((line) => { let [dir, amt] = line.split(' '); journey[dir] += parseInt(amt); });
    let result = journey.forward * (journey.down - journey.up);
    return result.toString();
}
function solve_second(input) {
    const submarine = {
        horizontal: 0, depth: 0, aim: 0,
        forward: function (x) { this.horizontal += x; this.depth += x * this.aim; },
        up: function (x) { this.aim -= x; }, down: function (x) { this.aim += x; }
    };
    let lines = input.split('\n');
    lines.forEach((line) => { let [dir, amt] = line.split(' '); submarine[dir](parseInt(amt)); });
    let result = submarine.depth * submarine.horizontal;
    return result.toString();
}
// EOC
export { solve_first, solve_second };
//# sourceMappingURL=day02.js.map