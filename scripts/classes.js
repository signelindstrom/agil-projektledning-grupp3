class student {
  constructor(name, email, city, major, answers) {
    this.name = name;
    this.email = email;
    this.city = city;
    this.major = major;
    this.answers = answers;
  }
}

// Corporation.js
class corporation {
  constructor(name, email, city, requirements, answers) {
    this.name = name;
    this.email = email;
    this.city = city;
    this.requirements = requirements;
    this.answers = answers;
  }
}

export {corporation, student}