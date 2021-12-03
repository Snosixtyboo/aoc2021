function solve_part1(input) {
    const lines = input.split('\n');
    const numbers = lines.map((line) => parseInt(line));
    const result = numbers.reduce((sum, x, i, arr) => sum + (i > 0 && x > arr[i - 1] ? 1 : 0), 0);
    return result.toString();
}
function solve_part2(input) {
    const lines = input.split('\n');
    const numbers = lines.map((line) => parseInt(line));
    const result = numbers.reduce((sum, x, i, arr) => sum + (i > 2 && x > arr[i - 3] ? 1 : 0), 0);
    return result.toString();
}
// EOC
export { solve_part1, solve_part2 };
//# sourceMappingURL=day01.js.map