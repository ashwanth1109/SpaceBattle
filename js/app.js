//------------------------------------------GETTING ELEMENTS BY ID------------------------------------------

let gameTitle = document.getElementById(`game-title`);
let gameTitleText = document.getElementById(`game-title-text`);

const makeTitleTextAppear = () => {
  gameTitleText.style.opacity = 1;
  gameTitleText.style.visibility = `visible`;
};
const makeTitleAppear = () => {
  gameTitle.style.width = "60vw";
  setTimeout(makeTitleTextAppear, 2000);
};

setTimeout(makeTitleAppear, 1000);

//------------------------------------------JS CORE CODE------------------------------------------
//------------------------------------------------------------------------------------

//------------------------------------------CLASS TO CREATE SHIP------------------------------------------
class Ship {
  constructor(name, hull = 0, firepower = 0, accuracy = 0) {
    this.name = name;
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
  }

  attack(opponent) {
    let random = Math.random();
    let isHitSuccesful = false;
    if (this.accuracy >= random && this.hull > 0) {
      isHitSuccesful = true;
    }
    if (isHitSuccesful) {
      console.log(`Attack from ${this.name} on ${opponent.name} was succesful`);
      opponent.hull -= this.firepower;
      console.log(`${opponent.name}'s health is now ${opponent.hull}`);
    } else {
      console.log(
        `Attack from ${this.name} on ${opponent.name} was unsuccesful`
      );
      console.log(`${opponent.name}'s health is still at ${opponent.hull}`);
    }
  }

  generateRandomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  generateRandomAccuracyFromRange(min, max) {
    min *= 10;
    max *= 10;
    let randomInt = this.generateRandomIntFromRange(min, max);
    return randomInt / 10;
  }

  randomizeHullValue(min, max) {
    this.hull = this.generateRandomIntFromRange(min, max);
  }

  randomizeFirepowerValue(min, max) {
    this.firepower = this.generateRandomIntFromRange(min, max);
  }

  randomizeAccuracy(min, max) {
    this.accuracy = this.generateRandomAccuracyFromRange(min, max);
  }

  consoleLogShipValues() {
    console.log(`${this.name}'s hull value is ${this.hull}`);
    console.log(`${this.name}'s firepower value is ${this.firepower}`);
    console.log(`${this.name}'s accuracy value is ${this.accuracy}`);
  }
}

//------------------------------------------GENERATE ALIEN SHIPS USING FACTORY------------------------------------------

const alienShipFactory = numberOfShips => {
  let alienShips = [];
  for (let i = 1; i <= numberOfShips; i++) {
    const shipName = `Alien Spaceship ${i}`;
    const alienShip = new Ship(shipName);
    alienShip.randomizeHullValue(3, 6);
    alienShip.randomizeFirepowerValue(2, 4);
    alienShip.randomizeAccuracy(0.6, 0.8);
    alienShip.consoleLogShipValues();
    alienShips.push(alienShip);
  }
  return alienShips;
};

const alienShips = alienShipFactory(6);

//------------------------------------------GENERATE USS SCHWARZENEGGAR------------------------------------------

const uss = new Ship(`USS SCHWARZENEGGAR`, 20, 5, 0.7);
uss.consoleLogShipValues();

//------------------------------------------SIMULATE BATTLE------------------------------------------

// alert(
//   `You are now entering the battle with your ship to defend the earth against alien attack`
// );

//------------------------------------------ADDING FUNCTIONS FOR BUTTONS------------------------------------------

const fight = () => {
  console.log(`fight`);
};
const retreat = () => {
  console.log(`retreat`);
};
const shootLaser = () => {
  console.log(`laser`);
};
const createShield = () => {
  console.log(`shield`);
};

//------------------------------------------ADDING CONTROLS USING BUTTONS------------------------------------------

const fightButton = document.getElementById(`fight-button`);
const retreatButton = document.getElementById(`retreat-button`);
const laserButton = document.getElementById(`laser-button`);
const shieldButton = document.getElementById(`shield-button`);

fightButton.addEventListener(`click`, fight);
retreatButton.addEventListener(`click`, retreat);
laserButton.addEventListener(`click`, shootLaser);
shieldButton.addEventListener(`click`, createShield);

let action = null;
let shipIndex = 0;
let isGameOver = false;

const checkIfGameIsOver = () => {
  let check = false;
  if (uss.hull <= 0) {
    check = true;
  } else {
    let flag = 1;
    for (let i = 0; i < alienShips.length; i++) {
      if (alienShips[i].hull > 0) {
        flag -= 1;
      }
    }
    if (flag === 1) {
      check = true;
    }
  }
  return check;
};

const incrementShipIndexInLoop = () => {
  shipIndex++;
  if (shipIndex === alienShips.length) {
    shipIndex = 0;
  }
};

// while (action !== `stop`) {
//   action = prompt(`What do you want to do?`, `stop or fight`);
//   if (action === `fight`) {
//     uss.attack(alienShips[shipIndex]);
//     alienShips[shipIndex].attack(uss);
//   }
//   incrementShipIndexInLoop();
//   if (checkIfGameIsOver()) {
//     if (uss.hull <= 0) {
//       console.log(`Oh no, the alien ships won. Earth is gonna be destroyed`);
//     } else {
//       console.log(
//         `Congratulations, ${
//           uss.name
//         } has saved the day. The alien ships have all been destroyed`
//       );
//     }
//     action = `stop`;
//   }
// }
