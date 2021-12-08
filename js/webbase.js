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
function snow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx = canvas.getContext('2d');
    for (let flake of flakes) {
        flake.posY += 1;
        if (flake.posY + flake.size >= canvas.height) {
            flake.posY -= canvas.height;
            flake.posX = Math.random() * canvas.width;
        }
        const lived = (flake.posY + flake.size) / canvas.height;
        ctx.globalAlpha = 1 - lived * lived;
        ctx.drawImage(flakeImg, flake.posX, flake.posY, flake.size, flake.size);
    }
    requestAnimationFrame(snow);
}
let canvas = document.createElement('canvas');
canvas.height = 300;
canvas.width = window.innerWidth;
let ctx = canvas.getContext('2d');
const flakeImg = new Image();
flakeImg.src = "snow.png";
const numFlakes = 100;
let flakes = [];
for (let i = 0; i < numFlakes; i++)
    flakes.push({ posX: Math.random() * canvas.width, posY: -Math.random() * canvas.height, size: Math.random() * 20 - 10 });
document.body.appendChild(canvas);
requestAnimationFrame(snow);
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
});
//# sourceMappingURL=webbase.js.map