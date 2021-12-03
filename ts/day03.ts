enum BIT { ONE = '1', ZERO = '0', NONE = 'X' }

function solve_part1 ( input: string ): string
{
    const lines: string[] = input.split( '\n' )
    const lineLength = lines[ 0 ].length

    const indicate: Array<number> = new Array<number>( lineLength ).fill( 0 )
    lines.forEach( function ( line )
    {
        for ( let i: number = 0; i < lineLength; i++ )
            indicate[ i ] += ( line[ i ] == BIT.ONE ? 1 : -1 )
    } )
    const mcb: Array<BIT> = indicate.map( x => x > 0 ? BIT.ONE : BIT.ZERO )
    const gamma: number = parseInt( mcb.join( '' ), 2 )
    const epsilon: number = ~gamma & ( ( 1 << lineLength ) - 1 )

    const result: number = gamma * epsilon
    return result.toString()
}

function solve_part2 ( input: string ): string
{
    const lines: string[] = input.split( '\n' )

    function filterByMCB ( input: string[], pred: ( x: string, y: string ) => boolean ): string
    {
        for ( let i: number = 0; input.length > 1; i++ )
        {
            const indicate: number = input.reduce( ( sum, line ) => sum + ( line[ i ] == BIT.ONE ? 1 : -1 ), 0 )
            const mcb: BIT = ( indicate < 0 ? BIT.ZERO : ( indicate > 0 ? BIT.ONE : BIT.NONE ) )
            input = input.filter( line => pred( mcb, line[ i ] ) )
        }
        return input[ 0 ]
    }

    const oxygen: string = filterByMCB( lines, ( mcb, b ) => mcb == BIT.NONE ? b == BIT.ONE : mcb == b )
    const co2: string = filterByMCB( lines, ( mcb, b ) => mcb == BIT.NONE ? b == BIT.ZERO : mcb != b )

    const result: number = parseInt( oxygen, 2 ) * parseInt( co2, 2 )
    return result.toString()
}
// EOC

export { solve_part1, solve_part2 }