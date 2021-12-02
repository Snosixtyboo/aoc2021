function solve_first(input) {
    let lines = input.split('\n');
    let numbers = lines.map((line) => parseInt(line));
    let result = numbers.reduce((sum, x, i, arr) => sum + (i > 0 && x > arr[i - 1] ? 1 : 0), 0);
    return result.toString();
}
function solve_second(input) {
    let lines = input.split('\n');
    let numbers = lines.map((line) => parseInt(line));
    let result = numbers.reduce((sum, x, i, arr) => sum + (i > 2 && x > arr[i - 3] ? 1 : 0), 0);
    return result.toString();
}
// EOC
export { solve_first, solve_second };
//# sourceMappingURL=day01.js.map