enum Op { '[', '(', '{', '<' }
const isValidOp = ( s: any ): s is keyof typeof Op => typeof s == "string" && s in Op

enum Cls { ']', ')', '}', '>' }
const isValidCls = ( s: any ): s is keyof typeof Cls => typeof s == "string" && s in Cls

const pairs = new Map<Op, Cls>( [ [ Op[ "(" ], Cls[ ")" ] ], [ Op[ "[" ], Cls[ "]" ] ], [ Op[ "{" ], Cls[ "}" ] ], [ Op[ "<" ], Cls[ ">" ] ] ] )

enum Problem { INCOMPLETE_START, INCOMPLETE_END, CORRUPTED }

function parse ( line: string ): { problem: Problem, stack: Array<Op>, offender?: string } | undefined
{
    const parseStack = new Array<Op>()
    for ( const c of line )
    {
        if ( isValidOp( c ) )
            parseStack.push( Op[ c ] )
        else if ( isValidCls( c ) )
        {
            const toMatch = parseStack.pop()
            if ( toMatch == undefined )
                return { problem: Problem.INCOMPLETE_END, stack: parseStack, offender: c }
            else if ( pairs.get( toMatch ) != Cls[ c ] )
                return { problem: Problem.CORRUPTED, stack: parseStack, offender: c }
        }
    }

    if ( parseStack.length )
        return { problem: Problem.INCOMPLETE_START, stack: parseStack }
}

function solve_part1 ( input: string ): string
{
    const lines = input.split( '\n' )
    const scoring = new Map<Cls, number>( [ [ Cls[ ')' ], 3 ], [ Cls[ ']' ], 57 ], [ Cls[ '}' ], 1197 ], [ Cls[ '>' ], 25137 ] ] )

    const result = lines.reduce<number>( ( sum, line ) =>
    {
        const cmd = parse( line )
        if ( cmd?.problem == Problem.CORRUPTED && isValidCls( cmd.offender ) )
        {
            const score = scoring.get( Cls[ cmd.offender ] )
            if ( score === undefined )
                throw Error( "Scoring is not defined for " + cmd.offender )

            return sum + score
        }
        return sum
    }, 0 )

    return result.toString()
}

function solve_part2 ( input: string ): string
{
    const lines = input.split( '\n' )
    const scoring = new Map<Cls, number>( [ [ Cls[ ')' ], 1 ], [ Cls[ ']' ], 2 ], [ Cls[ '}' ], 3 ], [ Cls[ '>' ], 4 ] ] )

    const scores = lines.map<number>( line =>
    {
        let lineScore = 0
        const cmd = parse( line )
        if ( cmd?.problem == Problem.INCOMPLETE_START )
        {
            let opener
            while ( ( opener = cmd.stack.pop() ) !== undefined )
            {
                const closer = pairs.get( opener )
                if ( closer === undefined )
                    throw Error( "Closer not defined for Opener " + opener )

                const score = scoring.get( closer )
                if ( score === undefined )
                    throw Error( "Scoring not defined for " + closer )

                lineScore = 5 * lineScore + score
            }
        }
        return lineScore
    } )

    const result = scores.filter( s => s != 0 ).sort( ( a, b ) => a - b ).find( ( _, i, a ) => i == Math.floor( a.length / 2 ) )
    if ( result === undefined )
        throw Error( "Not enough errors to find a middle one!" )

    return result.toString()
}
// EOC

export { solve_part1, solve_part2 }