const input = require("readline-sync");

const oldPointStructure = {
  1: ["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"],
  2: ["D", "G"],
  3: ["B", "C", "M", "P"],
  4: ["F", "H", "V", "W", "Y"],
  5: ["K"],
  8: ["J", "X"],
  10: ["Q", "Z"],
};

function oldScrabbleScorer(word) {
  word = word.toUpperCase();
  let letterPoints = "";

  for (let i = 0; i < word.length; i++) {
    for (const pointValue in oldPointStructure) {
      if (oldPointStructure[pointValue].includes(word[i])) {
        letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
      }
    }
  }
  return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  console.log("Let's play some scrabble!\n");
  let word = input.question("Enter a word to score: ");
  return word;
}

let simpleScorer = function (word) {
  word = word.toUpperCase();
  let letterPoints = 0;
  for (let i = 0; i < word.length; i++) {
    letterPoints++;
  }
  return letterPoints;
};

let vowelBonusScorer = function (word) {
  let letterPoints = 0;
  let vowels = "aeiou";
  for (let i = 0; i < word.length; i++) {
    if (vowels.includes(word[i].toLowerCase())) {
      letterPoints += 3;
    } else {
      letterPoints++;
    }
  }
  return letterPoints;
};

let scrabbleScorer = function (word, pointStructure) {
  word = word.toLowerCase();
  let score = 0;
  for (let i = 0; i < word.length; i++) {
    score += pointStructure[word[i]] || 0;
  }
  return score;
};

const scoringAlgorithms = [
  {
    name: "Simple Score",
    description: "Each letter is worth 1 point",
    scorerFunction: simpleScorer,
  },

  {
    name: "Bonus Vowels",
    description: "Vowels are 3 points, consonants are 1 point",
    scorerFunction: vowelBonusScorer,
  },

  {
    name: "Scrabble",
    description: "The traditional scoring algorithm",
    scorerFunction: scrabbleScorer,
  },
];

function scorerPrompt(word) {
  let scoringOption =
    input.question(`Which scoring algorithm would you like to use?
0 - Simple: One point per character
1 - Vowel Bonus: Vowels are worth 3 points
2 - Scrabble: Uses scrabble point system
Enter 0, 1, or 2: `);

  console.log(
    `Score for '${word}': ${scoringAlgorithms[scoringOption].scorerFunction(
      word,
      scoringOption == 2 ? newPointStructure : undefined
    )}`
  );
}

function transform(oldPointStructure) {
  let newPointObject = {};
  for (let key in oldPointStructure) {
    let letters = oldPointStructure[key];
    for (let i = 0; i < letters.length; i++) {
      newPointObject[letters[i].toLowerCase()] = Number(key);
    }
  }
  return newPointObject;
}

let newPointStructure = transform(oldPointStructure);

console.log(oldPointStructure);
console.log(newPointStructure);

function runProgram() {
  let word = initialPrompt();
  scorerPrompt(word);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
  initialPrompt: initialPrompt,
  transform: transform,
  oldPointStructure: oldPointStructure,
  simpleScorer: simpleScorer,
  vowelBonusScorer: vowelBonusScorer,
  scrabbleScorer: scrabbleScorer,
  scoringAlgorithms: scoringAlgorithms,
  newPointStructure: newPointStructure,
  runProgram: runProgram,
  scorerPrompt: scorerPrompt,
};
