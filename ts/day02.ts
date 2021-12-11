function validKey<T> ( o: T, k: string | symbol | number ): k is keyof T { return k in o }

function solve_part1 ( input: string ): string
{
    const journey = { forward: 0, up: 0, down: 0 }

    input.split( '\n' ).forEach( line =>
    {
        const [ cmd, param ] = line.split( ' ' )
        if ( !validKey( journey, cmd ) )
            throw Error( "Unknown command!" )
        journey[ cmd ] += parseInt( param )
    } )

    const result = journey.forward * ( journey.down - journey.up )
    return result.toString()
}

function solve_part2 ( input: string ): string
{
    const submarine = {
        horizontal: 0, depth: 0, aim: 0,
        up: function ( x: number ) { this.aim -= x },
        down: function ( x: number ) { this.aim += x },
        forward: function ( x: number ) { this.horizontal += x; this.depth += x * this.aim }
    }

    input.split( '\n' ).forEach( line =>
    {
        let func
        const [ cmd, param ] = line.split( ' ' )
        if ( !validKey( submarine, cmd ) || typeof ( func = submarine[ cmd ] ) !== 'function' )
            throw Error( "Invalid command!" )
        func.call( submarine, parseInt( param ) )
    } )

    const result = submarine.depth * submarine.horizontal
    return result.toString()
}
// EOC

export { solve_part1, solve_part2 }
