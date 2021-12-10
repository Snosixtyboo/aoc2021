class Point
{
    x: number
    y: number
    constructor ( x: number, y: number ) { this.x = x, this.y = y }
    is ( b: Point ) { return this.x == b.x && this.y == b.y }
}

class Segment
{
    p0: Point
    p1: Point
    constructor ( arr: number[] )
    {
        this.p0 = new Point( arr[ 0 ], arr[ 1 ] )
        this.p1 = new Point( arr[ 2 ], arr[ 3 ] )
    }
}

function countIntersections ( lines: string[], filterFunc: ( segment: Segment ) => boolean ): number
{
    const lineToSegment = ( line: string ) => new Segment( line.split( / -> |,/ ).map( x => parseInt( x ) ) )
    const segments: Segment[] = lines.map( line => lineToSegment( line ) ).filter( filterFunc )
    const dim: Point = segments.reduce<Point>( ( prev, segment ) =>
        new Point(
            Math.max( prev.x, segment.p0.x + 1, segment.p1.x + 1 ),
            Math.max( prev.y, segment.p0.y + 1, segment.p1.y + 1 )
        ), new Point( 0, 0 ) )

    let intersections: number = 0
    const field = Array.from( Array( dim.y ), () => new Array<number>( dim.x ).fill( 0 ) )
    for ( const segment of segments )
    {
        const dir = new Point( segment.p1.x - segment.p0.x, segment.p1.y - segment.p0.y )
        const step = new Point( dir.x < 0 ? -1 : dir.x > 0 ? 1 : 0, dir.y < 0 ? -1 : dir.y > 0 ? 1 : 0 )
        for ( let curr = segment.p0; !curr.is( segment.p1 ); curr.x += step.x, curr.y += step.y )
            if ( ++field[ curr.y ][ curr.x ] == 2 ) intersections++
        if ( ++field[ segment.p1.y ][ segment.p1.x ] == 2 ) intersections++
    }
    return intersections
}

function solve_part1 ( input: string ): string
{
    const lines: string[] = input.split( '\n' )
    const result: number = countIntersections( lines, s => s.p1.y == s.p0.y || s.p1.x == s.p0.x )
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