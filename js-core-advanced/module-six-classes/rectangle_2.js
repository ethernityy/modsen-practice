class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }

  getArea() {
    return this.height * this.width;
  }

  getPerimeter() {
    return (this.height + this.width) * 2;
  }
}

const anyRectangle = new Rectangle(6, 10);

console.log('area:', anyRectangle.getArea());
console.log('perimeter:', anyRectangle.getPerimeter());
