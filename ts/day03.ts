function solve_part1 ( input: string ): string
{
    const lines = input.split( '\n' )
    const lineLength = lines[ 0 ].length

    const indicate = new Array<number>( lineLength ).fill( 0 )
    lines.forEach( function ( line )
    {
        for ( let i = 0; i < lineLength; i++ )
            indicate[ i ] += ( line[ i ] == '1' ? 1 : -1 )
    } )
    const mcb = indicate.map( x => x > 0 ? '1' : '0' )

    const gamma = parseInt( mcb.join( '' ), 2 )
    const epsilon = ~gamma & ( ( 1 << lineLength ) - 1 )

    const result = gamma * epsilon
    return result.toString()
}

function solve_part2 ( input: string ): string
{
    const lines = input.split( '\n' )

    function filterByMCB ( input: string[], pred: ( x: '0' | '1' | 'X', y: string ) => boolean ): string
    {
        for ( let i = 0; input.length > 1; i++ )
        {
            const indicate = input.reduce( ( sum, line ) => sum + ( line[ i ] == '1' ? 1 : -1 ), 0 )
            const mcb = ( indicate < 0 ? '0' : ( indicate > 0 ? '1' : 'X' ) )
            input = input.filter( line => pred( mcb, line[ i ] ) )
        }
        return input[ 0 ]
    }

    const oxygen = filterByMCB( lines, ( mcb, b ) => mcb == 'X' ? b == '1' : mcb == b )
    const co2 = filterByMCB( lines, ( mcb, b ) => mcb == 'X' ? b == '0' : mcb != b )

    const result: number = parseInt( oxygen, 2 ) * parseInt( co2, 2 )
    return result.toString()
}
// EOC

export { solve_part1, solve_part2 }