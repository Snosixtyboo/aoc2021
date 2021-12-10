class Vector {
    constructor(x, y) { this.x = x, this.y = y; }
    is(b) { return this.x == b.x && this.y == b.y; }
}
class Segment {
    constructor(arr) {
        this.p0 = new Vector(arr[0], arr[1]);
        this.p1 = new Vector(arr[2], arr[3]);
    }
}
function countIntersections(lines, filterFunc) {
    const lineToSegment = (line) => new Segment(line.split(/ -> |,/).map(x => parseInt(x)));
    const segments = lines.map(line => lineToSegment(line)).filter(filterFunc);
    const dim = segments.reduce((prev, segment) => new Vector(Math.max(prev.x, segment.p0.x + 1, segment.p1.x + 1), Math.max(prev.y, segment.p0.y + 1, segment.p1.y + 1)), new Vector(0, 0));
    let intersections = 0;
    const field = Array.from(Array(dim.y), () => new Array(dim.x).fill(0));
    for (const segment of segments) {
        const dir = new Vector(Math.sign(segment.p1.x - segment.p0.x), Math.sign(segment.p1.y - segment.p0.y));
        for (let curr = segment.p0; !curr.is(segment.p1); curr.x += dir.x, curr.y += dir.y)
            if (++field[curr.y][curr.x] == 2)
                intersections++;
        if (++field[segment.p1.y][segment.p1.x] == 2)
            intersections++;
    }
    return intersections;
}
function solve_part1(input) {
    const lines = input.split('\n');
    const result = countIntersections(lines, s => s.p1.y == s.p0.y || s.p1.x == s.p0.x);
    return result.toString();
}
function solve_part2(input) {
    const lines = input.split('\n');
    const result = countIntersections(lines, () => true);
    return result.toString();
}
// EOC
export { solve_part1, solve_part2 };
//# sourceMappingURL=day05.js.map