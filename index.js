const inquirer = require('inquirer');
const fs = require('fs');
const generateLogo = require("./lib/shapes");


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
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) =>
        err ? console.error(err) : console.log('Generated logo.svg')
    );
}


function init() {
    inquirer.prompt(questions)
    .then(function (userInput) {
        console.log(userInput),
            writeToFile('logo.svg', generateLogo(userInput));
    }
    );

};

// console.log(generateLogo(data))


// WHEN I open the `logo.svg` file in a browser
// THEN I am shown a 300x200 pixel image that matches the criteria I entered
init();