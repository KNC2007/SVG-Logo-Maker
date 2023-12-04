class Shape {
    constructor() {
        data.textColor=''
    }
    setTextColor(textColor){
        data.textColor=(textColor);
    }
}


class Circle extends Shape {
    render(){
        return `<svg width="300" height="200">
        <circle cx="50" cy="50" r="40" fill="${data.shapeColor}"/>
     </svg>`
    }
}

class Triangle extends Shape {
    render(){
        return `<svg width="300" height="200">
        <polygon points="0,300 100,150 200,300" fill="${data.shapeColor}"/>
     </svg>`
    }
}

class Square extends Shape {
    render(){
        return `<svg width="300" height="200">
        <rect width="100" height="100" fill="${data.shapeColor}"/>
     </svg>`
    }
};

module.exports = {Circle, Triangle, Square};