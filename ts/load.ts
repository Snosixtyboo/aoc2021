class DayData
{
    name: string = ""
    desc: string = ""
    input: string = ""
    source: string = ""
    init: ( ...args: any[] ) => any = () => { }
    solve1: ( input: string ) => string = () => ""
    solve2: ( input: string ) => string = () => ""
}

function loadDays ( rd: ( file: string ) => Promise<string> ): Array<Promise<DayData>>
{
    let days: Promise<DayData>[] = new Array<Promise<DayData>>()
    for ( let day = 1; day <= 25; day++ )
    {
        let name = "Day " + day.toString()
        let filebase = "day" + '0'.repeat( 2 - day.toString().length ) + day.toString()

        let desc: string = "desc/" + filebase + ".tex"
        let input: string = "inputs/" + filebase + ".txt"
        let srcTs: string = "ts/" + filebase + ".ts"
        let srcRs: string = "rs/" + filebase + "/" + filebase + ".rs"
        let src = Promise.allSettled( [ rd( srcTs ), rd( srcRs ) ] ).then( content => 
        {
            if ( content[ 0 ].status == "fulfilled" )
                return content[ 0 ].value
            if ( content[ 1 ].status == "fulfilled" )
                return content[ 1 ].value
            throw Error( "404, no code" )
        } )

        let promises = [ rd( desc ), rd( input ), src, import( "../js/" + filebase + ".js" ) ]
        days.push( Promise.all( promises ).then( function ( contents )
        {
            let dayData: DayData = new DayData
            dayData.name = name
            dayData.desc = contents[ 0 ]
            dayData.input = contents[ 1 ]
            dayData.source = contents[ 2 ].substr( 0, contents[ 2 ].indexOf( '// EOC' ) )
            dayData.init = contents[ 3 ].default
            dayData.solve1 = contents[ 3 ].solve_part1
            dayData.solve2 = contents[ 3 ].solve_part2
            return dayData
        }
        ) )
    }
    return days
}

export { loadDays, DayData }