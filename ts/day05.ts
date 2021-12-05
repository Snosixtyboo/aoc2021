class Point
{
    x: number
    y: number
    constructor ( x: number, y: number ) { this.x = x, this.y = y }
    is ( b: Point ) { return this.x == b.x && this.y == b.y }
}

class Segment
{
    constructor ( arr: number[] )
    {
        this.points = [ new Point( arr[ 0 ], arr[ 1 ] ), new Point( arr[ 2 ], arr[ 3 ] ) ]
        Object.seal( this.points )
    }
    points: Point[] = []
}

function countIntersections ( lines: string[], filterFunc: ( segment ) => boolean ): number
{
    const lineToSegment = line => ( a => new Segment( a.map( x => parseInt( x ) ) ) )( line.split( / -> |,/ ) )
    const segments: Segment[] = lines.map( line => lineToSegment( line ) ).filter( filterFunc )
    const dim: Point = segments.reduce<Point>( ( prev, s ) => ( new Point(
        Math.max( prev.x, Math.max( s.points[ 0 ].x + 1, s.points[ 1 ].x + 1 ) ),
        Math.max( prev.y, Math.max( s.points[ 0 ].y + 1, s.points[ 1 ].y + 1 ) )
    ) ), new Point( 0, 0 ) )

    let intersections: number = 0
    const field = Array.from( Array( dim.y ), () => new Array<number>( dim.x ).fill( 0 ) )
    for ( const segment of segments )
    {
        const start: Point = segment.points[ 0 ], stop: Point = segment.points[ 1 ]
        const dir = new Point( stop.x - start.x, stop.y - start.y )
        const step = new Point( dir.x < 0 ? -1 : dir.x > 0 ? 1 : 0, dir.y < 0 ? -1 : dir.y > 0 ? 1 : 0 )
        for ( let curr = start; !curr.is( stop ); curr.x += step.x, curr.y += step.y )
            if ( ++field[ curr.y ][ curr.x ] == 2 ) intersections++
        if ( ++field[ stop.y ][ stop.x ] == 2 ) intersections++
    }
    return intersections
}

function solve_part1 ( input: string ): string
{
    const lines: string[] = input.split( '\n' )
    const result: number = countIntersections( lines, ( segment ) =>
    {
        return segment.points[ 1 ].y == segment.points[ 0 ].y || segment.points[ 1 ].x == segment.points[ 0 ].x
    } )
    return result.toString()
}

function solve_part2 ( input: string ): string
{
    const lines: string[] = input.split( '\n' )
    const result: number = countIntersections( lines, () => true )
    return result.toString()
}
// EOC

export { solve_part1, solve_part2 }