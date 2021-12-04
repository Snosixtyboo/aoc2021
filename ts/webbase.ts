import * as load from "./load"
import hljs from 'highlight.js/lib/core'
import typescript from 'highlight.js/lib/languages/typescript'
hljs.registerLanguage( 'typescript', typescript )

import katex from 'katex'

class FileNotFoundError extends Error { }

function readFileWeb ( file: string ): Promise<string>
{
    return fetch( file ).then( function ( response )
    {
        if ( !response.ok ) throw new FileNotFoundError( "404 " + file )
        return response.text()
    } )
}

let buttonRow: HTMLParagraphElement = document.createElement( "p" )
document.body.appendChild( buttonRow )

let contentSpace: HTMLParagraphElement = document.createElement( "p" )
document.body.appendChild( contentSpace )

function addDescription ( day: load.DayData, dayParagraph: HTMLElement )
{
    let dayDescDiv: HTMLDivElement = document.createElement( "div" )
    dayDescDiv.id = "desc"
    let latexHTML: string = ""
    let lastEnd: number = 0
    const regexp: RegExp = /(?:\$(.*?)\$)/g
    let match: RegExpExecArray
    while ( ( match = regexp.exec( day.desc ) ) !== null )
    {
        latexHTML += day.desc.substring( lastEnd, match.index )
        latexHTML += katex.renderToString( match[ 1 ] )
        lastEnd = regexp.lastIndex
    }
    latexHTML += day.desc.substring( lastEnd, day.desc.length )
    dayDescDiv.innerHTML = latexHTML
    dayParagraph.appendChild( dayDescDiv )
}

function addSource ( day: load.DayData, dayParagraph: HTMLElement )
{
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
}

function addRunnables ( day: load.DayData, dayParagraph: HTMLElement )
{
    let runnablesDiv: HTMLDivElement = document.createElement( "div" )
    runnablesDiv.id = "parts"
    let parts = [ { input: day.input, func: day.solve1 }, { input: day.input, func: day.solve2 } ]
    for ( let c: number = 0; c < 2; c++ )
    {
        let runnableDiv: HTMLDivElement = document.createElement( "div" )
        runnableDiv.id = "part"
        runnablesDiv.append( runnableDiv )

        let runnableHeading: HTMLHeadingElement = document.createElement( "h2" )
        runnableHeading.innerHTML = "Input Part " + ( c + 1 ).toString()
        let runnableInput: HTMLTextAreaElement = document.createElement( "textarea" )
        runnableInput.value = parts[ c ].input

        let runnableRunDiv: HTMLHeadingElement = document.createElement( "div" )
        runnableRunDiv.id = "partRun"
        let runnableOutput: Text = document.createTextNode( "???" )
        let runnableRunButton: HTMLButtonElement = document.createElement( "button" )
        runnableRunButton.innerHTML = "Run!"
        runnableRunButton.onclick = () => { runnableOutput.textContent = parts[ c ].func( runnableInput.value ) }
        runnableRunDiv.append( runnableRunButton, document.createTextNode( "   Output: " ), runnableOutput )

        runnableDiv.append( runnableHeading, runnableInput, runnableRunDiv )
    }
    dayParagraph.append( runnablesDiv )
}

function createDay ( day: load.DayData )
{
    let dayParagraph: HTMLParagraphElement = document.createElement( "p" )

    addDescription( day, dayParagraph )
    addSource( day, dayParagraph )
    addRunnables( day, dayParagraph )

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
        else if ( day.reason instanceof FileNotFoundError ) console.log( "Oh, cry me a river!" )
        else throw Error( day.reason )
    }
} )
