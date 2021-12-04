const NEVER = Number.MAX_VALUE;
class Board {
    constructor(input, drawnWhen) {
        this.win = { value: 0, when: NEVER };
        this.score = 0;
        this.field = Array.from(Array(5), () => new Array());
        for (let row = 0; row < 5; row++) {
            const line = input[row].trim().split(/\s+/).map(x => parseInt(x));
            for (let col = 0; col < 5; col++) {
                const value = line[col];
                const when = drawnWhen.has(value) ? drawnWhen.get(value) : NEVER;
                this.field[row][col] = { value, when };
            }
        }
        for (let y = 0; y < 5; y++) {
            let [winRow, winCol] = Array.from(Array(2), () => ({ value: 0, when: 0 }));
            for (let x = 0; x < 5; x++) {
                if (this.field[y][x].when > winRow.when)
                    winRow = this.field[y][x];
                if (this.field[x][y].when > winCol.when)
                    winCol = this.field[x][y];
            }
            [winRow, winCol].forEach(f => { if (f.when < this.win.when)
                this.win = f; });
        }
        const sum = this.field.flat().reduce((s, f) => s + (f.when > this.win.when ? f.value : 0), 0);
        this.score = sum * this.win.value;
    }
}
function solve_part1(input) {
    const lines = input.split('\n');
    const draws = lines[0].split(',').map(x => parseInt(x));
    const drawnWhen = new Map(draws.map((x, i) => [x, i]));
    let winnerBoard;
    for (let l = 2; l < lines.length; l += 6) {
        const board = new Board(lines.slice(l, l + 5), drawnWhen);
        if (!winnerBoard || board.win.when < winnerBoard.win.when)
            winnerBoard = board;
    }
    return winnerBoard.score.toString();
}
function solve_part2(input) {
    const lines = input.split('\n');
    const draws = lines[0].split(',').map(x => parseInt(x));
    const drawnWhen = new Map(draws.map((x, i) => [x, i]));
    let loserBoard;
    for (let l = 2; l < lines.length; l += 6) {
        const board = new Board(lines.slice(l, l + 5), drawnWhen);
        if (!loserBoard || board.win.when > loserBoard.win.when)
            loserBoard = board;
    }
    return loserBoard.score.toString();
}
// EOC
export { solve_part1, solve_part2 };
//# sourceMappingURL=day04.js.map