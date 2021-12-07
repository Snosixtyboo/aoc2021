function solve_part1 ( input: string ): string
{
    const pos: number[] = input.split( ',' ).map( x => parseInt( x ) ).sort( ( a, b ) => a - b )
    const median: number = pos[ Math.floor( pos.length / 2 ) ]
    let result: number = pos.reduce( ( sum, p ) => sum + Math.abs( p - median ), 0 )
    return result.toString()
}

function solve_part2 ( input: string ): string
{
    const pos: number[] = input.split( ',' ).map( x => parseInt( x ) )
    const guess: number = Math.round( pos.reduce( ( sum, p ) => sum + p, 0 ) / pos.length )
    const results: number[] = [ guess - 1, guess, guess + 1 ].map( test =>
        pos.reduce( ( sum, p ) => 
        {
            const n: number = Math.abs( test - p )
            return sum + ( n * n + n ) / 2
        }, 0 )
    )
    return Math.min( ...results ).toString()
}
// EOC

export { solve_part1, solve_part2 }