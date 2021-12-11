function flashOctopi(lines, pred) {
    const octopi = lines.map(line => line.split('').map(x => parseInt(x)));
    const state = { it: 0, lastFlashes: 0, allFlashes: 0 };
    for (state.it = 0; !pred(state); state.it++) {
        let toUpdate = new Set();
        octopi.forEach((row, y) => row.forEach((_, x) => {
            if (++row[x] == 10)
                toUpdate.add([x, y]);
        }));
        state.lastFlashes = 0;
        while (toUpdate.size > 0) {
            let toUpdateNext = new Set();
            for (const p of toUpdate) {
                for (let y = Math.max(0, p[1] - 1); y < Math.min(octopi.length, p[1] + 2); y++) {
                    for (let x = Math.max(0, p[0] - 1); x < Math.min(octopi[y].length, p[0] + 2); x++) {
                        if (x == p[0] && y == p[1])
                            continue;
                        if (++octopi[y][x] == 10)
                            toUpdateNext.add([x, y]);
                    }
                }
            }
            toUpdate = toUpdateNext;
        }
        octopi.forEach((row, y) => row.forEach((_, x) => {
            if (row[x] >= 10) {
                row[x] = 0;
                state.lastFlashes++;
            }
        }));
        state.allFlashes += state.lastFlashes;
    }
    return state;
}
function solve_part1(input) {
    const lines = input.split('\n');
    const end = flashOctopi(lines, (state) => state.it == 100);
    return end.allFlashes.toString();
}
function solve_part2(input) {
    const lines = input.split('\n');
    const end = flashOctopi(lines, (state) => state.lastFlashes == 100);
    return end.it.toString();
}
// EOC
export { solve_part1, solve_part2 };
//# sourceMappingURL=day11.js.map