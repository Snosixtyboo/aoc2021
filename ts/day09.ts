function solve_part1 ( input: string ): string
{
    const f = input.split( '\n' ).map( l => l.split( '' ) ).map( r => r.map( h => parseInt( h ) ) )

    const rd = ( x: number, y: number ) => x < 0 || x >= f[ 0 ].length || y < 0 || y >= f.length ? Number.MAX_VALUE : f[ y ][ x ]

    const result = f.reduce<number>( ( sum1, row, y ) =>
    {
        return sum1 + row.reduce<number>( ( sum2, ref, x ) => 
        {
            if ( [ rd( x, y - 1 ), rd( x, y + 1 ), rd( x - 1, y ), rd( x + 1, y ) ].every( v => v > ref ) )
                sum2 += 1 + rd( x, y )
            return sum2
        }, 0 )
    }, 0 )

    return result.toString()
}

function solve_part2 ( input: string ): string
{
    const f = input.split( '\n' ).map( l => l.split( '' ) ).map( r => r.map( h => parseInt( h ) ) )

    const rd = ( x: number, y: number ) => x < 0 || x >= f[ 0 ].length || y < 0 || y >= f.length ? Number.MAX_VALUE : f[ y ][ x ]

    const basins: number[] = []
    for ( let y = 0; y < f.length; y++ )
    {
        for ( let x = 0; x < f[ y ].length; x++ )
        {
            let basinSize = 0, point
            const visit: { x: number, y: number }[] = [ { x, y } ]
            while ( ( point = visit.shift() ) !== undefined )
            {
                if ( rd( point.x, point.y ) >= 9 )
                    continue

                visit.splice( visit.length, 0,
                    { x: point.x + 1, y: point.y }, { x: point.x - 1, y: point.y },
                    { x: point.x, y: point.y + 1 }, { x: point.x, y: point.y - 1 }
                )

                basinSize++
                f[ point.y ][ point.x ] = Number.MAX_VALUE
            }

            if ( basinSize )
                basins.push( basinSize )
        }
    }

    const result = basins.sort( ( a, b ) => b - a ).slice( 0, 3 ).reduce( ( prod, x ) => prod * x, 1 )
    return result.toString()
}
// EOC

export { solve_part1, solve_part2 }