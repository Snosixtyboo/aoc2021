function solve_part1 ( input: string ): string
{
    const pattern_disp: string[][] = input.split( '\n' ).map( l => l.split( '|' ) )
    let result: number = pattern_disp.reduce( ( sum1, line ) =>
        sum1 + line[ 1 ].split( ' ' ).reduce<number>( ( sum2, displayed ) =>
            sum2 + ( [ 2, 3, 4, 7 ].includes( displayed.length ) ? 1 : 0 ), 0 ), 0 )
    return result.toString()
}

function solve_part2 ( input: string ): string
{
    const patterns_display: string[][] = input.split( '\n' ).map( l => l.split( '|' ) )
    const result = patterns_display.reduce<number>( ( sum1, pd ) =>
    {
        let patterns: string[] = pd[ 0 ].trim().split( ' ' )
        let n: string[] = [];
        [ n[ 1 ], n[ 4 ], n[ 7 ], n[ 8 ] ] = [ 2, 4, 3, 7 ].map( count => <string> patterns.find( d => d.length == count ) )
        patterns = patterns.filter( p => ![ n[ 1 ], n[ 4 ], n[ 7 ], n[ 8 ] ].some( x => x == p ) )

        const r: string[] = n[ 1 ].split( '' )
        const tl: string[] = n[ 4 ].split( '' ).filter( s => !n[ 1 ].includes( s ) )
        const bl: string[] = n[ 8 ].split( '' ).filter( s => !n[ 4 ].includes( s ) && !n[ 7 ].includes( s ) )

        n[ 6 ] = <string> patterns.find( p => tl.every( s => p.includes( s ) ) && bl.every( s => p.includes( s ) ) )
        patterns = patterns.filter( p => p != n[ 6 ] )
        n[ 9 ] = <string> patterns.find( p => r.every( s => p.includes( s ) ) && tl.every( s => p.includes( s ) ) )
        patterns = patterns.filter( p => p != n[ 9 ] )
        n[ 5 ] = <string> patterns.find( p => tl.every( s => p.includes( s ) ) )
        patterns = patterns.filter( p => p != n[ 5 ] )
        n[ 2 ] = <string> patterns.find( p => !r.every( s => p.includes( s ) ) )
        patterns = patterns.filter( p => p != n[ 2 ] )
        n[ 0 ] = patterns[ 0 ].length == 6 ? patterns[ 0 ] : patterns[ 1 ]
        n[ 3 ] = patterns[ 0 ].length == 6 ? patterns[ 1 ] : patterns[ 0 ]

        const displayed = pd[ 1 ].trim().split( ' ' ).map( p => p.split( '' ) ).reduce<number>( ( sum2, d ) =>
            sum2 * 10 + n.findIndex( x => x.split( '' ).every( s => d.includes( s ) ) && d.every( s => x.includes( s ) ) )
            , 0 )
        return sum1 + displayed
    }, 0 )
    return result.toString()
}
// EOC

export { solve_part1, solve_part2 }