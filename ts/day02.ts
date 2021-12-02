function solve_first ( input: string ): string
{
    let journey = { forward: 0, up: 0, down: 0 }
    let lines: string[] = input.split( '\n' )
    lines.forEach( ( line ) => { let [ dir, amt ] = line.split( ' ' ); journey[ dir ] += parseInt( amt ) } )
    let result: number = journey.forward * ( journey.down - journey.up )
    return result.toString()
}

function solve_second ( input: string ): string
{
    const submarine = {
        horizontal: 0, depth: 0, aim: 0,
        forward: function ( x: number ) { this.horizontal += x; this.depth += x * this.aim },
        up: function ( x: number ) { this.aim -= x }, down: function ( x: number ) { this.aim += x }
    }
    let lines: string[] = input.split( '\n' )
    lines.forEach( ( line ) => { let [ dir, amt ] = line.split( ' ' ); submarine[ dir ]( parseInt( amt ) ) } )
    let result: number = submarine.depth * submarine.horizontal
    return result.toString()
}
// EOC

export { solve_first, solve_second }