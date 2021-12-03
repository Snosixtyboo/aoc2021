function solve_part1 ( input: string ): string
{
    const journey = { forward: 0, up: 0, down: 0 }
    const lines: string[] = input.split( '\n' )
    lines.forEach( ( line ) => { let [ dir, amt ] = line.split( ' ' ); journey[ dir ] += parseInt( amt ) } )
    const result: number = journey.forward * ( journey.down - journey.up )
    return result.toString()
}

function solve_part2 ( input: string ): string
{
    const submarine = {
        horizontal: 0, depth: 0, aim: 0,
        forward: function ( x: number ) { this.horizontal += x; this.depth += x * this.aim },
        up: function ( x: number ) { this.aim -= x }, down: function ( x: number ) { this.aim += x }
    }
    const lines: string[] = input.split( '\n' )
    lines.forEach( ( line ) => { const [ dir, amt ] = line.split( ' ' ); submarine[ dir ]( parseInt( amt ) ) } )
    const result: number = submarine.depth * submarine.horizontal
    return result.toString()
}
// EOC

export { solve_part1, solve_part2 }