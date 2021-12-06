function fishForDays(fishDays, numDays, cycle, delay) {
    let addedPerDay = Array.from(new Array(cycle + delay), (_, i) => (i < delay ? 0 : fishDays.reduce((sum, d) => sum + (d + 1 == i ? 1 : 0), 0)));
    let schools = [0];
    for (let day = (cycle + delay); day <= numDays; day++) {
        if (day % cycle == delay)
            schools.push(day);
        addedPerDay[day] = addedPerDay[day % cycle];
        addedPerDay[day] += schools.slice(1).reduce((sum, spawned) => sum + addedPerDay[day - spawned], 0);
    }
    return addedPerDay.slice(0, numDays + 1).reduce((sum, x) => sum + x, fishDays.length);
}
function solve_part1(input) {
    const fishDays = input.split(',').map(x => parseInt(x));
    const result = fishForDays(fishDays, 80, 7, 2);
    return result.toString();
}
function solve_part2(input) {
    const fishDays = input.split(',').map(x => parseInt(x));
    const result = fishForDays(fishDays, 256, 7, 2);
    return result.toString();
}
// EOC
export { solve_part1, solve_part2 };
//# sourceMappingURL=day06.js.map