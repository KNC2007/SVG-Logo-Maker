const inquirer = require('inquirer');
const fs = require('fs');
const {Circle, Triangle, Square} = require("./lib/shapes");
const { writeFile } = require("fs/promises")


class Logo {
    constructor() {
        this.textEl = ''
        this.shapeEl = ''
    }
    render() {
        return `<svg version="1.1"
     width="300" height="200"
     xmlns="http://www.w3.org/2000/svg"
     width="300" height="200">${this.shapeEl}${this.textEl}</svg>`
    }
    setTextEl(letters, textColor) {
        this.textEl = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${letters}</text>`
    }
    setShapeEl(shape) {
        if (shape && typeof shape.render === 'function') {
            this.shapeEl = shape.render();
        } else {
            console.error('Invalid shape object provided.');
        }
    }
};



// GIVEN a command-line application that accepts user input
// WHEN I am prompted for text
const questions = [
    // THEN I can enter up to three characters
    {
        type: 'input',
        name: 'letters',
        message: 'Enter text for the logo. (Must not be more than 3 characters.)',
    },
    // WHEN I am prompted for the text color
    // THEN I can enter a color keyword (OR a hexadecimal number)
    {
        type: 'input',
        name: 'textColor',
        message: 'Enter a text color.',
    },
    // WHEN I am prompted for a shape
    // THEN I am presented with a list of shapes to choose from: circle, triangle, and square
    {
        type: 'list',
        name: 'shape',
        message: 'Select a shape for the logo.',
        choices: [
            'Circle',
            'Triangle',
            'Square',
        ]
    },
    // WHEN I am prompted for the shape's color
    // THEN I can enter a color keyword (OR a hexadecimal number)
    {
        type: 'input',
        name: 'shapeColor',
        message: 'Enter a shape color.',
    },
];


// WHEN I have entered input for all the prompts
// THEN an SVG file is created named `logo.svg`
// AND the output text "Generated logo.svg" is printed in the command line
// function writeToFile(fileName, data) {
//     fs.writeFile(fileName, svg.render(), (err) =>
//         err ? console.error(err) : console.log('Generated logo.svg')
//     );
// }

async function generateLogo(data) {
    let logoLetters = '';
    if (data.letters.length > 0 && data.letters.length < 4) {
        logoLetters = data.letters;
    } else {
        console.log("Please enter 1-3 letters.")
    }

    let logoShape = '';
    if (data.shape === "Circle") {
        logoShape = new Circle();
    } else if (data.shape === "Triangle") {
        logoShape = new Triangle();
    } else if (data.shape === "Square") {
        logoShape = new Square();
    }
    logoShape.setShapeColor(data.shapeColor);

    // console.log(logoShape);
    // console.log(logoLetters);

    const svg = new Logo();
    svg.setShapeEl(logoShape);
    svg.setTextEl(logoLetters, data.textColor);
    return writeFile("logo.svg", svg.render())
    
};

async function init() {
    inquirer.prompt(questions)
        .then(function (userInput) {
            // console.log(userInput)
            generateLogo(userInput)
            console.log('Generated logo.svg')
        }
        );
};



// WHEN I open the `logo.svg` file in a browser
// THEN I am shown a 300x200 pixel image that matches the criteria I entered
init();