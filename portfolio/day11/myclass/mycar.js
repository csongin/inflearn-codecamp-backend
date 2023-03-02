class MyCar {
  model = 'Trailblazer';
  horsepower = 100;
  color = 'blue';

  constructor(model, horsepower, color) {
    this.model = model;
    this.horsepower = horsepower;
    this.color = color;
  }

  start = () => {
    console.log(`${this.model} ${this.color} 출발합니당! 마력은 ${this.horsepower}`);
  }

  stop = () => {
    console.log('멈춥니당!');
  }
}

const mycar = new MyCar('tico', 50, 'red');

console.log(mycar.start());
console.log(mycar.stop());