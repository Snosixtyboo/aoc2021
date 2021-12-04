class DayData
{
    name: string
    desc: string
    input: string
    source: string
    solve1: ( input: string ) => string
    solve2: ( input: string ) => string
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
        let src: string = "ts/" + filebase + ".ts"

        let promises = [ rd( desc ), rd( input ), rd( src ), import( "../js/" + filebase + ".js" ) ]
        days.push( Promise.all( promises ).then( function ( contents )
        {
            let dayData: DayData = new DayData
            dayData.name = name
            dayData.desc = contents[ 0 ]
            dayData.input = contents[ 1 ]
            dayData.source = contents[ 2 ].substr( 0, contents[ 2 ].indexOf( '// EOC' ) )
            dayData.solve1 = contents[ 3 ].solve_part1
            dayData.solve2 = contents[ 3 ].solve_part2
            return dayData
        }
        ) )
    }
    return days
}

export { loadDays, DayData }