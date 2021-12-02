function solve_first ( input: string ): string
{
    let lines: string[] = input.split( '\n' )
    let numbers: number[] = lines.map( ( line ) => parseInt( line ) )
    let result: number = numbers.reduce( ( sum, x, i, arr ) => sum + ( i > 0 && x > arr[ i - 1 ] ? 1 : 0 ), 0 )
    return result.toString()
}

function solve_second ( input: string ): string
{
    let lines: string[] = input.split( '\n' )
    let numbers: number[] = lines.map( ( line ) => parseInt( line ) )
    let result: number = numbers.reduce( ( sum, x, i, arr ) => sum + ( i > 2 && x > arr[ i - 3 ] ? 1 : 0 ), 0 )
    return result.toString()
}
// EOC

export { solve_first, solve_second }