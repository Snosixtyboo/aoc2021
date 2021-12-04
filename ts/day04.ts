const NEVER: number = Number.MAX_VALUE

class BingoLine
{
    public update ( when: number, value: number )
    {
        if ( this.lastHitWhen < when )
        {
            this.lastHitWhen = when
            this.lastHitValue = value
        }
        if ( ++this.marked == 5 && this.lastHitWhen < this.board.winDraw )
        {
            this.board.winDraw = this.lastHitWhen
            this.board.winValue = this.lastHitValue
        }
    }

    private board: Board
    private marked: number = 0
    private lastHitWhen: number = 0
    private lastHitValue: number = 0

    constructor ( board: Board )
    {
        this.board = board
    }
}

class Board
{
    public winDraw: number = NEVER;
    public winValue: number = 0
    public winScore: number = 0

    private content: number[] = Array<number>( 25 )
    private drawnWhen: number[] = Array<number>( 25 ).fill( NEVER )
    private rows: BingoLine[] = Array.from( Array<BingoLine>( 5 ), () => new BingoLine( this ) )
    private cols: BingoLine[] = Array.from( Array<BingoLine>( 5 ), () => new BingoLine( this ) )

    constructor ( input: string[], val2Draw: Map<number, number> )
    {
        for ( let row: number = 0; row < 5; row++ )
        {
            const line: number[] = input[ row ].trim().split( /\s+/ ).map( x => parseInt( x ) )
            for ( let col: number = 0; col < 5; col++ )
            {
                const value: number = line[ col ]
                this.content[ row * 5 + col ] = value
                if ( val2Draw.has( value ) )
                {
                    const when: number = val2Draw.get( value )
                    this.drawnWhen[ row * 5 + col ] = when;
                    [ this.rows[ row ], this.cols[ col ] ].forEach( line => line.update( when, value ) )
                }
            }
        }
        this.winScore = this.winValue * this.content.reduce( ( sum, x, i ) => sum + ( this.drawnWhen[ i ] > this.winDraw ? x : 0 ), 0 )
    }
}

function solve_part1 ( input: string ): string
{
    const lines: string[] = input.split( '\n' )
    const draws: number[] = lines[ 0 ].split( ',' ).map( x => parseInt( x ) )
    const val2Draw: Map<number, number> = new Map<number, number>( draws.map( ( x, i ) => [ x, i ] ) )

    let winnerBoard: Board
    for ( let l: number = 2; l < lines.length; l += 6 )
    {
        const board: Board = new Board( lines.slice( l, l + 5 ), val2Draw )
        if ( !winnerBoard || board.winDraw < winnerBoard.winDraw ) winnerBoard = board
    }
    return winnerBoard.winScore.toString()
}

function solve_part2 ( input: string ): string
{
    const lines: string[] = input.split( '\n' )
    const draws: number[] = lines[ 0 ].split( ',' ).map( x => parseInt( x ) )
    const val2Draw: Map<number, number> = new Map<number, number>( draws.map( ( x, i ) => [ x, i ] ) )

    let loserBoard: Board
    for ( let l: number = 2; l < lines.length; l += 6 )
    {
        const board: Board = new Board( lines.slice( l, l + 5 ), val2Draw )
        if ( !loserBoard || board.winDraw > loserBoard.winDraw ) loserBoard = board
    }
    return loserBoard.winScore.toString()
}
// EOC

export { solve_part1, solve_part2 }