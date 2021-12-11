function flashOctopi ( lines: readonly string[], pred: ( state: { it: number, lastFlashes: number, allFlashes: number } ) => boolean )
{
    const octopi = lines.map<number[]>( line => line.split( '' ).map( x => parseInt( x ) ) )
    const state = { it: 0, lastFlashes: 0, allFlashes: 0 }
    for ( state.it = 0; !pred( state ); state.it++ )
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
            let toUpdateNext = new Set<readonly [ number, number ]>()
            for ( const p of toUpdate )
            {
                for ( let y = Math.max( 0, p[ 1 ] - 1 ); y < Math.min( octopi.length, p[ 1 ] + 2 ); y++ )
                {
                    for ( let x = Math.max( 0, p[ 0 ] - 1 ); x < Math.min( octopi[ y ].length, p[ 0 ] + 2 ); x++ )
                    {
                        if ( x == p[ 0 ] && y == p[ 1 ] )
                            continue
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
    const end = flashOctopi( lines, ( state: { it: number, lastFlashes: number, allFlashes: number } ) => state.it == 100 )
    return end.allFlashes.toString()
}

function solve_part2 ( input: string ): string
{
    const lines: readonly string[] = input.split( '\n' )
    const end = flashOctopi( lines, ( state: { it: number, lastFlashes: number, allFlashes: number } ) => state.lastFlashes == 100 )
    return end.it.toString()
}
// EOC

export { solve_part1, solve_part2 }