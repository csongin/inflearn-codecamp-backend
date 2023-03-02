class Monster {
  power = 10;

  constructor(power) {
    this.power = power;
  }

  attack = () => {
    console.log('공격하자!!');
    console.log(`내 공격력은 ${this.power}이야!!`);
  };

}

class SkyMonster extends Monster {
  constructor(power) {
    super(power)
  }

  run = () => {
    console.log('날라서 도망가자!!');
  };

}

class GroundMonster extends Monster {
  constructor(power) {
    super(power)
  }

  run = () => {
    console.log('뛰어서 도망가자!!');
  };

}

const myMonster1 = new SkyMonster(10);
myMonster1.attack();
myMonster1.run();

const myMonster2 = new GroundMonster(100);
myMonster2.attack();
myMonster2.run();
