function solve_part1(input) {
    const pattern_disp = input.split('\n').map(l => l.split('|'));
    let result = pattern_disp.reduce((sum1, line) => sum1 + line[1].split(' ').reduce((sum2, displayed) => sum2 + ([2, 3, 4, 7].includes(displayed.length) ? 1 : 0), 0), 0);
    return result.toString();
}
function solve_part2(input) {
    const patterns_display = input.split('\n').map(l => l.split('|'));
    const result = patterns_display.reduce((sum1, pd) => {
        let patterns = pd[0].trim().split(' ');
        let n = [];
        [n[1], n[4], n[7], n[8]] = [2, 4, 3, 7].map(count => patterns.find(d => d.length == count));
        patterns = patterns.filter(p => ![n[1], n[4], n[7], n[8]].some(x => x == p));
        const r = n[1].split('');
        const tl = n[4].split('').filter(s => !n[1].includes(s));
        const bl = n[8].split('').filter(s => !n[4].includes(s) && !n[7].includes(s));
        n[6] = patterns.find(p => tl.every(s => p.includes(s)) && bl.every(s => p.includes(s)));
        patterns = patterns.filter(p => p != n[6]);
        n[9] = patterns.find(p => r.every(s => p.includes(s)) && tl.every(s => p.includes(s)));
        patterns = patterns.filter(p => p != n[9]);
        n[5] = patterns.find(p => tl.every(s => p.includes(s)));
        patterns = patterns.filter(p => p != n[5]);
        n[2] = patterns.find(p => !r.every(s => p.includes(s)));
        patterns = patterns.filter(p => p != n[2]);
        n[0] = patterns[0].length == 6 ? patterns[0] : patterns[1];
        n[3] = patterns[0].length == 6 ? patterns[1] : patterns[0];
        const displayed = pd[1].trim().split(' ').map(p => p.split('')).reduce((sum2, d) => sum2 * 10 + n.findIndex(x => x.split('').every(s => d.includes(s)) && d.every(s => x.includes(s))), 0);
        return sum1 + displayed;
    }, 0);
    return result.toString();
}
// EOC
export { solve_part1, solve_part2 };
//# sourceMappingURL=day08.js.map