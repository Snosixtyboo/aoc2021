import * as day01 from "./day01.js"

import hljs from 'highlight.js/lib/core'
import typescript from 'highlight.js/lib/languages/javascript'
hljs.registerLanguage( 'typescript', typescript )

let button: HTMLButtonElement = document.createElement( "button" )
button.innerHTML = "Day 1"
document.body.appendChild( button )

let codePre: HTMLPreElement = document.createElement( "pre" )
let code: HTMLElement = document.createElement( "code" )
code.attributes[ 'language' ] = 'typescript'
codePre.appendChild( code )
document.body.appendChild( codePre )
fetch( "../ts/day01.ts" ).then( response => response.text() ).then( text => 
{
    text = text.substr( 0, text.indexOf( "// EOC" ) )
    code.innerHTML = text
    hljs.highlightAll()
} )
