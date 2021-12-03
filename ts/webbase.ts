import * as load from "./load"
import hljs from 'highlight.js/lib/core'
import typescript from 'highlight.js/lib/languages/typescript'
hljs.registerLanguage( 'typescript', typescript )

function readFileWeb ( file: string ): Promise<string>
{
    return fetch( file ).then( function ( response )
    {
        if ( !response.ok ) throw Error( "404 " + file )
        return response.text()
    } )
}

let buttonRow: HTMLParagraphElement = document.createElement( "p" )
document.body.appendChild( buttonRow )

let contentSpace: HTMLParagraphElement = document.createElement( "p" )
document.body.appendChild( contentSpace )

function createDay ( day: load.DayData )
{
    let dayParagraph: HTMLParagraphElement = document.createElement( "p" )

    let dayCodeDiv: HTMLDivElement = document.createElement( "div" )
    dayCodeDiv.id = "code"
    let codeHeading: HTMLHeadingElement = document.createElement( "h2" )
    codeHeading.innerHTML = "Solution for " + day.name
    dayCodeDiv.append( codeHeading )
    let dayCode: HTMLPreElement = document.createElement( "pre" )
    let daySrc: HTMLElement = document.createElement( "code" )
    daySrc.appendChild( document.createTextNode( day.source ) )
    hljs.highlightElement( daySrc )
    dayCode.appendChild( daySrc )
    dayCodeDiv.appendChild( dayCode )
    dayParagraph.appendChild( dayCodeDiv )

    let partsDiv: HTMLDivElement = document.createElement( "div" )
    partsDiv.id = "parts"
    let parts = [ { input: day.input1, func: day.solve1 }, { input: day.input2, func: day.solve2 } ]
    for ( let c: number = 0; c < 2; c++ )
    {
        let partDiv: HTMLDivElement = document.createElement( "div" )
        partDiv.id = "part"
        partsDiv.append( partDiv )

        let partHeading: HTMLHeadingElement = document.createElement( "h2" )
        partHeading.innerHTML = "Input Part " + ( c + 1 ).toString()
        let partInput: HTMLTextAreaElement = document.createElement( "textarea" )
        partInput.value = parts[ c ].input
        let partRunDiv: HTMLHeadingElement = document.createElement( "div" )
        partRunDiv.id = "partRun"
        let partRunOutput: Text = document.createTextNode( "???" )
        let partRunButton: HTMLButtonElement = document.createElement( "button" )
        partRunButton.innerHTML = "Run!"
        partRunButton.onclick = () => { partRunOutput.textContent = parts[ c ].func( partInput.value ) }
        partRunDiv.append( partRunButton, document.createTextNode( "   Output: " ), partRunOutput )

        partDiv.append( partHeading, partInput, partRunDiv )
    }
    dayParagraph.append( partsDiv )

    contentSpace.appendChild( dayParagraph )

    let button: HTMLButtonElement = document.createElement( "button" )
    button.innerHTML = day.name
    button.onclick = function ( ev: MouseEvent )
    {
        for ( let content of contentSpace.children )
            ( <HTMLScriptElement> content ).style.display = 'none'
        dayParagraph.style.display = 'initial'
    }
    button.click()
    buttonRow.appendChild( button )
}

Promise.allSettled( load.loadDays( readFileWeb ) ).then( function ( days )
{
    for ( let day of days )
    {
        if ( day.status == 'fulfilled' ) createDay( day.value )
        else console.log( "Oh, cry me a river!" )
    }
} )
