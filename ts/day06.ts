function fishForDays ( fishDays: number[], numDays: number, cycle: number, delay: number )
{
    let spawned: number[] = Array.from( new Array( cycle + delay ), ( _, i ) =>
        ( i < delay ? 0 : fishDays.reduce( ( sum, d ) => sum + ( d + 1 == i ? 1 : 0 ), 0 ) )
    )
    let schools: number[] = [ 0 ]
    for ( let day: number = ( cycle + delay ); day <= numDays; day++ )
    {
        if ( day % cycle == delay ) schools.push( day )
        spawned[ day ] = spawned[ day % cycle ] + schools.slice( 1 ).reduce( ( sum, s ) => sum + spawned[ day - s ], 0 )
    }
    return spawned.slice( 0, numDays + 1 ).reduce( ( sum, x ) => sum + x, fishDays.length )
}

function solve_part1 ( input: string ): string
{
    const fishDays: number[] = input.split( ',' ).map( x => parseInt( x ) )
    const result: number = fishForDays( fishDays, 80, 7, 2 )
    return result.toString()
}

function solve_part2 ( input: string ): string
{
    const fishDays: number[] = input.split( ',' ).map( x => parseInt( x ) )
    const result: number = fishForDays( fishDays, 256, 7, 2 )
    return result.toString()
}
// EOC

export { solve_part1, solve_part2 }
