// ----------------- School Class -----------------
class School {
  constructor(name, level, numberOfStudents) {
    this._name = name;               // School name
    this._level = level;             // Level: "primary", "middle", "high"
    this._numberOfStudents = numberOfStudents; // Number of students
  }

  // ----------- Getters -----------
  get name() { return this._name; }
  get level() { return this._level; }
  get numberOfStudents() { return this._numberOfStudents; }

  // ----------- Setter for numberOfStudents -----------
  set numberOfStudents(newNumberOfStudents) {
    if (typeof newNumberOfStudents === "number") {
      this._numberOfStudents = newNumberOfStudents;
    } else {
      console.log('Invalid input: numberOfStudents must be set to a Number.');
    }
  }

  // ----------- Instance Method: quickFacts -----------
  quickFacts() {
    console.log(`${this._name} educates ${this._numberOfStudents} students at the ${this._level} school level.`);
  }

  // ----------- Static Method: pickSubstituteTeacher -----------
  static pickSubstituteTeacher(substituteTeachers) {
    if (!Array.isArray(substituteTeachers) || substituteTeachers.length === 0) {
      return null; // Return null if input is invalid
    }
    const randomIndex = Math.floor(Math.random() * substituteTeachers.length);
    return substituteTeachers[randomIndex];
  }

  // ----------- Optional toString Method for catalog printing -----------
  toString() {
    return `${this._name} (${this._level}) — ${this._numberOfStudents} students`;
  }
}

// ----------------- Primary School -----------------
class Primary extends School {
  constructor(name, numberOfStudents, pickupPolicy) {
    super(name, 'primary', numberOfStudents); // Level is always 'primary'
    this._pickupPolicy = pickupPolicy;
  }

  get pickupPolicy() { return this._pickupPolicy; }
}

// ----------------- High School -----------------
class HighSchool extends School {
  constructor(name, numberOfStudents, sportsTeams) {
    super(name, "high", numberOfStudents);
    this._sportsTeams = sportsTeams;
  }

  get sportsTeams() { return this._sportsTeams; }

  printSportsTeams() {
    console.log(`${this._name} sports teams:`);
    this._sportsTeams.forEach(team => console.log(team));
  }
}

// ----------------- Middle School -----------------
class MiddleSchool extends School {
  constructor(name, numberOfStudents, averageTestScores, schoolOverview) {
    super(name, "middle", numberOfStudents);
    this._averageTestScores = averageTestScores;
    this._schoolOverview = schoolOverview;
  }

  get averageTestScores() { return this._averageTestScores; }
  get schoolOverview() { return this._schoolOverview; }
}

// ----------------- School Catalog -----------------
class SchoolCatalog {
  constructor() {
    this._schools = []; // Store all school instances
  }

  addSchool(school) {
    if (!(school instanceof School)) {
      throw new Error('Only School instances can be added');
    }
    this._schools.push(school);
  }

  getAll() { return [...this._schools]; }

  findByLevel(level) {
    return this._schools.filter(s => s.level === level);
  }

  findByName(name) {
    return this._schools.find(s => s.name === name) || null;
  }

  removeByName(name) {
    const idx = this._schools.findIndex(s => s.name === name);
    if (idx === -1) return false;
    this._schools.splice(idx, 1);
    return true;
  }
}

// ----------------- Example Usage -----------------

// Create some school instances
const lorraineHansbury = new Primary(
  "Lorraine Hansbury",
  514,
  "Students must be picked up by a parent, guardian, or a family member over 13."
);

const alSmith = new HighSchool(
  "Al E. Smith",
  415,
  ["Baseball", "Basketball", "Volleyball", "Track and Field"]
);

const oakRidge = new MiddleSchool(
  "Oak Ridge Middle",
  580,
  85, // average test score
  "Focuses on STEM and arts programs."
);

// Use methods
lorraineHansbury.quickFacts();
console.log(
  "Substitute teacher:", 
  School.pickSubstituteTeacher([
    "Jamal Crawford",
    "Lou Williams",
    "J. R. Smith",
    "James Harden",
    "Jason Terry",
    "Manu Ginobili",
  ])
);
alSmith.printSportsTeams();

// Create a catalog and add schools
const catalog = new SchoolCatalog();
catalog.addSchool(lorraineHansbury);
catalog.addSchool(alSmith);
catalog.addSchool(oakRidge);

// Print all schools in catalog
console.log("\nAll schools in catalog:");
catalog.getAll().forEach(s => console.log(s.toString()));
