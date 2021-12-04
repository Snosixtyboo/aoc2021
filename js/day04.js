const NEVER = Number.MAX_VALUE;
class BingoLine {
    constructor(board) {
        this.marked = 0;
        this.lastHitWhen = 0;
        this.lastHitValue = 0;
        this.board = board;
    }
    update(when, value) {
        if (this.lastHitWhen < when) {
            this.lastHitWhen = when;
            this.lastHitValue = value;
        }
        if (++this.marked == 5 && this.lastHitWhen < this.board.winDraw) {
            this.board.winDraw = this.lastHitWhen;
            this.board.winValue = this.lastHitValue;
        }
    }
}
class Board {
    constructor(input, val2Draw) {
        this.winDraw = NEVER;
        this.winValue = 0;
        this.winScore = 0;
        this.content = Array(25);
        this.drawnWhen = Array(25).fill(NEVER);
        this.rows = Array.from(Array(5), () => new BingoLine(this));
        this.cols = Array.from(Array(5), () => new BingoLine(this));
        for (let row = 0; row < 5; row++) {
            const line = input[row].trim().split(/\s+/).map(x => parseInt(x));
            for (let col = 0; col < 5; col++) {
                const value = line[col];
                this.content[row * 5 + col] = value;
                if (val2Draw.has(value)) {
                    const when = val2Draw.get(value);
                    this.drawnWhen[row * 5 + col] = when;
                    [this.rows[row], this.cols[col]].forEach(line => line.update(when, value));
                }
            }
        }
        this.winScore = this.winValue * this.content.reduce((sum, x, i) => sum + (this.drawnWhen[i] > this.winDraw ? x : 0), 0);
    }
}
function solve_part1(input) {
    const lines = input.split('\n');
    const draws = lines[0].split(',').map(x => parseInt(x));
    const val2Draw = new Map(draws.map((x, i) => [x, i]));
    let winnerBoard;
    for (let l = 2; l < lines.length; l += 6) {
        const board = new Board(lines.slice(l, l + 5), val2Draw);
        if (!winnerBoard || board.winDraw < winnerBoard.winDraw)
            winnerBoard = board;
    }
    return winnerBoard.winScore.toString();
}
function solve_part2(input) {
    const lines = input.split('\n');
    const draws = lines[0].split(',').map(x => parseInt(x));
    const val2Draw = new Map(draws.map((x, i) => [x, i]));
    let loserBoard;
    for (let l = 2; l < lines.length; l += 6) {
        const board = new Board(lines.slice(l, l + 5), val2Draw);
        if (!loserBoard || board.winDraw > loserBoard.winDraw)
            loserBoard = board;
    }
    return loserBoard.winScore.toString();
}
// EOC
export { solve_part1, solve_part2 };
//# sourceMappingURL=day04.js.map