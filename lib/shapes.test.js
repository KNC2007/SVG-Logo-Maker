// imports classes
const {Circle, Triangle, Square} = require("../lib/shapes");


// testing circle
describe('Circle', () => {
    it('render correctly', () => {
        const shape = new Circle();
        shape.setShapeColor("black");
        expect(shape.render()).toEqual('<circle cx="50%" cy="50%" r="100" height="100%" width="100%"fill="black"/>');
    });
});

// testing triangle
describe('Triangle', () => {
    it('render correctly', () => {
        const shape = new Triangle();
        shape.setShapeColor("red");
        expect(shape.render()).toEqual('<polygon height="100%" width="100%" points="0,200 300,200 150,0" fill="red"/>');
    });
});

// testing square
describe('Square', () => {
    it('render correctly', () => {
        const shape = new Square();
        shape.setShapeColor("green");
        expect(shape.render()).toEqual('<rect x="50" height="200" width="200" fill="green"/>');
    });
});
