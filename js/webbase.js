import * as load from "./load";
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
hljs.registerLanguage('typescript', typescript);
import katex from 'katex';
class FileNotFoundError extends Error {
}
function readFileWeb(file) {
    return fetch(file).then(function (response) {
        if (!response.ok)
            throw new FileNotFoundError("404 " + file);
        return response.text();
    });
}
function addDescription(day, dayParagraph) {
    let dayDescDiv = document.createElement("div");
    dayDescDiv.id = "desc";
    let latexHTML = "";
    let lastEnd = 0;
    const regexp = /(?:\$(.*?)\$)/g;
    let match;
    while ((match = regexp.exec(day.desc)) !== null) {
        latexHTML += day.desc.substring(lastEnd, match.index);
        latexHTML += katex.renderToString(match[1]);
        lastEnd = regexp.lastIndex;
    }
    latexHTML += day.desc.substring(lastEnd, day.desc.length);
    dayDescDiv.innerHTML = latexHTML;
    dayParagraph.appendChild(dayDescDiv);
}
function addSource(day, dayParagraph) {
    let dayCodeDiv = document.createElement("div");
    dayCodeDiv.id = "code";
    let codeHeading = document.createElement("h2");
    codeHeading.innerHTML = "Solution for " + day.name;
    dayCodeDiv.append(codeHeading);
    let dayCode = document.createElement("pre");
    let daySrc = document.createElement("code");
    daySrc.appendChild(document.createTextNode(day.source));
    hljs.highlightElement(daySrc);
    dayCode.appendChild(daySrc);
    dayCodeDiv.appendChild(dayCode);
    dayParagraph.appendChild(dayCodeDiv);
}
function addRunnables(day, dayParagraph) {
    let runnablesDiv = document.createElement("div");
    runnablesDiv.id = "parts";
    let parts = [{ input: day.input, func: day.solve1 }, { input: day.input, func: day.solve2 }];
    for (let c = 0; c < 2; c++) {
        let runnableDiv = document.createElement("div");
        runnableDiv.id = "part";
        runnablesDiv.append(runnableDiv);
        let runnableHeading = document.createElement("h2");
        runnableHeading.innerHTML = "Input Part " + (c + 1).toString();
        let runnableInput = document.createElement("textarea");
        runnableInput.value = parts[c].input;
        let runnableRunDiv = document.createElement("div");
        runnableRunDiv.id = "partRun";
        let runnableOutput = document.createTextNode("???");
        let runnableRunButton = document.createElement("button");
        runnableRunButton.innerHTML = "Run!";
        runnableRunButton.onclick = () => {
            try {
                runnableOutput.textContent = parts[c].func(runnableInput.value);
            }
            catch (err) {
                alert("Whoops, that did not go well! Is the input perhaps malformed?");
            }
        };
        runnableRunDiv.append(runnableRunButton, document.createTextNode("   Output: "), runnableOutput);
        runnableDiv.append(runnableHeading, runnableInput, runnableRunDiv);
    }
    dayParagraph.append(runnablesDiv);
}
function createDay(day) {
    let dayParagraph = document.createElement("p");
    addDescription(day, dayParagraph);
    addSource(day, dayParagraph);
    addRunnables(day, dayParagraph);
    contentSpace.appendChild(dayParagraph);
    let button = document.createElement("button");
    button.innerHTML = day.name;
    button.onclick = function (ev) {
        for (let content of contentSpace.children)
            content.style.display = 'none';
        dayParagraph.style.display = 'initial';
    };
    button.click();
    buttonRow.appendChild(button);
}
let buttonRow = document.createElement("p");
document.body.appendChild(buttonRow);
let contentSpace = document.createElement("p");
document.body.appendChild(contentSpace);
Promise.allSettled(load.loadDays(readFileWeb)).then(function (days) {
    for (let day of days) {
        if (day.status == 'fulfilled')
            createDay(day.value);
        else
            console.log("Oh, cry me a river!");
    }
    // let footer = document.createElement( "footer" )
    // let p1: HTMLParagraphElement = document.createElement( "p" )
    // p1.innerHTML = "Bernhard Kerbl"
    // let p2: HTMLParagraphElement = document.createElement( "p" )
    // let h1: HTMLAnchorElement = document.createElement( "a" )
    // h1.href = "kerbl@cg.tuwien.ac.at"
    // h1.innerText = "kerbl@cg.tuwien.ac.at"
    // p2.appendChild( h1 )
    // let p3: HTMLParagraphElement = document.createElement( "p" )
    // p3.innerHTML = "Opinions, mistakes and bad jokes are my own."
    // footer.append( p1, p2, p3 )
    // document.body.appendChild( footer )
});
//# sourceMappingURL=webbase.js.map