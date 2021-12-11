function simulateOctopi ( lines: readonly string[], pred: ( phase: number, lastFlashes: number ) => boolean )
{
    const octopi = lines.map<number[]>( line => line.split( '' ).map( x => parseInt( x ) ) )

    const state = { phase: 0, lastFlashes: 0, allFlashes: 0 }
    for ( state.phase = 0; !pred( state.phase, state.lastFlashes ); state.phase++ )
    {
        let toUpdate = new Set<readonly [ number, number ]>()
        octopi.forEach( ( row, y ) => row.forEach( ( _, x ) => 
        {
            if ( ++row[ x ] == 10 )
                toUpdate.add( [ x, y ] )
        } ) )

        state.lastFlashes = 0
        while ( toUpdate.size > 0 )
        {
            const toUpdateNext = new Set<readonly [ number, number ]>()
            for ( const p of toUpdate )
            {
                for ( let y = Math.max( 0, p[ 1 ] - 1 ); y < Math.min( octopi.length, p[ 1 ] + 2 ); y++ )
                {
                    for ( let x = Math.max( 0, p[ 0 ] - 1 ); x < Math.min( octopi[ y ].length, p[ 0 ] + 2 ); x++ )
                    {
                        if ( ++octopi[ y ][ x ] == 10 )
                            toUpdateNext.add( [ x, y ] )
                    }
                }
            }
            toUpdate = toUpdateNext
        }
        octopi.forEach( ( row, y ) => row.forEach( ( _, x ) => 
        {
            if ( row[ x ] >= 10 )
            {
                row[ x ] = 0
                state.lastFlashes++
            }
        } ) )
        state.allFlashes += state.lastFlashes
    }
    return state
}

function solve_part1 ( input: string ): string
{
    const lines: readonly string[] = input.split( '\n' )
    const end = simulateOctopi( lines, ( phase: number, lastFlashes: number ) => phase == 100 )
    return end.allFlashes.toString()
}

function solve_part2 ( input: string ): string
{
    const lines: readonly string[] = input.split( '\n' )
    const end = simulateOctopi( lines, ( phase: number, lastFlashes: number ) => lastFlashes == 100 )
    return end.phase.toString()
}
// EOC

export { solve_part1, solve_part2 }