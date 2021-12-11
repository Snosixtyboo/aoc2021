function simulateOctopi ( lines: readonly string[], pred: ( phase: number, lastFlashes: number ) => boolean )
{
    const octopi = lines.map<number[]>( line => line.split( '' ).map( x => parseInt( x ) ) )

    const state = { phase: 0, lastFlashes: 0, allFlashes: 0 }
    for ( state.phase = 0; !pred( state.phase, state.lastFlashes ); state.phase++ )
    {
        let toUpdate = new Array<Readonly<{ x: number, y: number }>>()
        octopi.forEach( ( row, y ) => row.forEach( ( _, x ) => 
        {
            if ( ++row[ x ] == 10 )
                toUpdate.push( { x, y } )
        } ) )

        state.lastFlashes = 0
        while ( toUpdate.length > 0 )
        {
            const toUpdateNext = new Array<Readonly<{ x: number, y: number }>>()
            for ( const p of toUpdate )
            {
                state.lastFlashes++
                state.allFlashes++
                octopi[ p.y ][ p.x ] = 0

                for ( let y = Math.max( 0, p.y - 1 ); y < Math.min( octopi.length, p.y + 2 ); y++ )
                {
                    for ( let x = Math.max( 0, p.x - 1 ); x < Math.min( octopi[ y ].length, p.x + 2 ); x++ )
                    {
                        if ( octopi[ y ][ x ] != 0 && ++octopi[ y ][ x ] == 10 )
                            toUpdateNext.push( { x, y } )
                    }
                }
            }
            toUpdate = toUpdateNext
        }
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