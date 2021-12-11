class Segment
{
    public p0: readonly [ number, number ]
    public p1: readonly [ number, number ]

    public constructor ( arr: ReadonlyArray<number> )
    {
        this.p0 = [ arr[ 0 ], arr[ 1 ] ]
        this.p1 = [ arr[ 2 ], arr[ 3 ] ]
    }
}

function is ( a: readonly [ number, number ], b: readonly [ number, number ] ) { return a[ 0 ] == b[ 0 ] && a[ 1 ] == b[ 1 ] }

function countIntersections ( lines: string[], filterFunc: ( seg: Readonly<Segment> ) => boolean ): number
{
    const lineToSegment = ( line: string ) => new Segment( line.split( / -> |,/ ).map( x => parseInt( x ) ) )

    const segments = lines.map( line => lineToSegment( line ) ).filter( filterFunc )
    const dim = segments.reduce<[ number, number ]>( ( prev, seg ) => [
        Math.max( prev[ 0 ], seg.p0[ 0 ] + 1, seg.p1[ 0 ] + 1 ),
        Math.max( prev[ 1 ], seg.p0[ 1 ] + 1, seg.p1[ 1 ] + 1 ) ], [ 0, 0 ] )

    let intersections = 0
    const field = Array.from( Array( dim[ 1 ] ), () => new Array<number>( dim[ 0 ] ).fill( 0 ) )
    for ( const seg of segments )
    {
        const d = [ Math.sign( seg.p1[ 0 ] - seg.p0[ 0 ] ), Math.sign( seg.p1[ 1 ] - seg.p0[ 1 ] ) ]
        for ( const c: [ number, number ] = [ seg.p0[ 0 ], seg.p0[ 1 ] ]; !is( c, seg.p1 ); c[ 0 ] += d[ 0 ], c[ 1 ] += d[ 1 ] )
            if ( ++field[ c[ 1 ] ][ c[ 0 ] ] == 2 ) intersections++
        if ( ++field[ seg.p1[ 1 ] ][ seg.p1[ 0 ] ] == 2 ) intersections++
    }
    return intersections
}

function solve_part1 ( input: string ): string
{
    const lines = input.split( '\n' )
    const result = countIntersections( lines, s => s.p1[ 1 ] == s.p0[ 1 ] || s.p1[ 0 ] == s.p0[ 0 ] )
    return result.toString()
}

function solve_part2 ( input: string ): string
{
    const lines = input.split( '\n' )
    const result = countIntersections( lines, () => true )
    return result.toString()
}
// EOC

export { solve_part1, solve_part2 }