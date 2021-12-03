class DayData
{
    name: string
    desc: string
    input1: string
    input2: string
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

        let desc: string = "desc/" + filebase + ".txt"
        let input1: string = "inputs/" + filebase + "_1.txt"
        let input2: string = "inputs/" + filebase + "_2.txt"
        let src: string = "ts/" + filebase + ".ts"

        let promises = [ rd( desc ), rd( input1 ), rd( input2 ), rd( src ), import( "../js/" + filebase + ".js" ) ]
        days.push( Promise.all( promises ).then( function ( contents )
        {
            let dayData: DayData = new DayData
            dayData.name = name
            dayData.desc = contents[ 0 ]
            dayData.input1 = contents[ 1 ]
            dayData.input2 = contents[ 2 ]
            dayData.source = contents[ 3 ].substr( 0, contents[ 3 ].indexOf( '// EOC' ) )
            dayData.solve1 = contents[ 4 ].solve_part1
            dayData.solve2 = contents[ 4 ].solve_part2
            return dayData
        }
        ) )
    }
    return days
}

export { loadDays, DayData }