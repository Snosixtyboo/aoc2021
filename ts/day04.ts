const NEVER: number = Number.MAX_VALUE

class Board
{
    public win = { value: 0, when: NEVER }
    public score: number = 0

    private field: { value: number, when: number }[][]

    constructor ( input: string[], drawnWhen: Map<number, number> )
    {
        this.field = Array.from( Array( 5 ), () => new Array() )
        for ( let row: number = 0; row < 5; row++ )
        {
            const line: number[] = input[ row ].trim().split( /\s+/ ).map( x => parseInt( x ) )
            for ( let col: number = 0; col < 5; col++ )
            {
                const value: number = line[ col ]
                const when: number = drawnWhen.has( value ) ? drawnWhen.get( value ) : NEVER
                this.field[ row ][ col ] = { value, when }
            }
        }

        for ( let y: number = 0; y < 5; y++ )
        {
            let [ winRow, winCol ] = Array.from( Array( 2 ), () => ( { value: 0, when: 0 } ) )
            for ( let x: number = 0; x < 5; x++ )
            {
                if ( this.field[ y ][ x ].when > winRow.when ) winRow = this.field[ y ][ x ]
                if ( this.field[ x ][ y ].when > winCol.when ) winCol = this.field[ x ][ y ]
            }
            [ winRow, winCol ].forEach( f => { if ( f.when < this.win.when ) this.win = f } )
        }
        const sum = this.field.flat().reduce<number>( ( s, f ) => s + ( f.when > this.win.when ? f.value : 0 ), 0 )
        this.score = sum * this.win.value
    }
}

function solve_part1 ( input: string ): string
{
    const lines: string[] = input.split( '\n' )
    const draws: number[] = lines[ 0 ].split( ',' ).map( x => parseInt( x ) )
    const drawnWhen: Map<number, number> = new Map<number, number>( draws.map( ( x, i ) => [ x, i ] ) )

    let winnerBoard: Board
    for ( let l: number = 2; l < lines.length; l += 6 )
    {
        const board: Board = new Board( lines.slice( l, l + 5 ), drawnWhen )
        if ( !winnerBoard || board.win.when < winnerBoard.win.when ) winnerBoard = board
    }
    return winnerBoard.score.toString()
}

function solve_part2 ( input: string ): string
{
    const lines: string[] = input.split( '\n' )
    const draws: number[] = lines[ 0 ].split( ',' ).map( x => parseInt( x ) )
    const drawnWhen: Map<number, number> = new Map<number, number>( draws.map( ( x, i ) => [ x, i ] ) )

    let loserBoard: Board
    for ( let l: number = 2; l < lines.length; l += 6 )
    {
        const board: Board = new Board( lines.slice( l, l + 5 ), drawnWhen )
        if ( !loserBoard || board.win.when > loserBoard.win.when ) loserBoard = board
    }
    return loserBoard.score.toString()
}
// EOC

export { solve_part1, solve_part2 }