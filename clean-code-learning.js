// ** JS Nuggets: Clean Code: Variables **

// Use meaningful and pronounceable variable names
var yearMonthDay = moment().format('YYYY/MM/DD');

// Use ES6 constants when variable values do not change
const FIRST_US_PRESIDENT = "George Washington";

// Use the same vocabulary for the same type of variable
getUser();

// Use searchable names
var MINUTES_IN_A_YEAR = 525600
for (var i = 0; i < MINUTES_IN_A_YEAR; i++) {
	runCronJob();
}

// Use explanatory variables
const cityStateRegex = /^(.+)[,\\s]+(.+?)\s*(\d{5})?$/;
const match = cityStateRegex.match(cityStateRegex);
const city = match[1];
const state = match[2]
saveCityState(city, state);

// Don't add unneeded context
var Car = {
	make: 'Honda',
	model: 'Accord',
	color: 'Blue'
};

function paintCar(car) {
	car.color = 'Red';
}

// Short-circuiting is cleaner than conditionals
function createMicrobrewery(name) {
	var breweryName = name || 'Hipster Brew Co.';
}



// JS Nuggets
// Clean Code: Functions (Part 1)

// Function arguments (2 or fewer ideally)
const menuConfig = {
	title: 'Foo',
	body: 'Bar',
	buttonText: 'Baz',
	cancellable: true
};

function createMenu(menuConfig) {
	// ...
}


// Functions should do one thing
function emailClients(clients) {
	clients
		.filter(isClientActive)
		.forEach(email);
}

function isClientActive(client) {
	const clientRecord = database.lookup(client);
	return clientRecord.isActive();
}



// Function names should say what they do
function addMonthToDate(month, date) {
	// ...
}

const date = new Date();
addToDate(1, date);


// Functions should only be one level of abstraction
function parseBetterJSAlternative(code) {
	const REGEXES = [
		// ...
	];

	const statements = code.split(' ');
	const tokens = [];
	REGEXES.forEach((REGEX) => {
		statements.forEach((statement) => {
			// ...
		});
	});

	const ast = [];
	tokens.forEach((token) => {
		// lex...
	});

	ast.forEach((node) => {
		// parse...
	});
}
// ******
function tokenize(code) {
	const REGEXES = [
		// ...
	];

	const statements = code.split(' ');
	const tokens = [];
	REGEXES.forEach((REGEX) => {
		statements.forEach((statement) => {
			tokens.push( /* ... */ );
		});
	});

	return tokens;
}

function lexer(tokens) {
	const ast = [];
	tokens.forEach((token) => {
		ast.push( /* ... */ );
	});

	return ast;
}

function parseBetterJSAlternative(code) {
	const tokens = tokenize(code);
	const ast = lexer(tokens);
	ast.forEach((node) => {
		// parse...
	});
}


// Remove duplicate code
function showList(employee) {
	developers.forEach((employee) => {
		const expectedSalary = employee.calculateExpectedSalary();
		const experience = employee.getExperience();

		let portfolio = employee.getGithubLink();

		if (employee.type === 'manager') {
			portfolio = employee.getMBAProjects();
		}

		const data = {
			expectedSalary,
			experience,
			portfolio
		};

		render(data);
	});
}


// Don't use flags as function parameters

function createFile(name) {
	fs.create(`./temp/${name}`);
}

function createTempFile(name) {
	fs.create(name);
}



// JS Nuggets
// Clean Code: Functions (Part 2)

// Avoid side effects
let name = 'Beau Carnes';

function splitIntoFirstAndLastName() {
	return name.split(' ');
}

const newName = splitIntoFirstAndLastName(name);

console.log(name);
console.log(newName);

// Don't write to global functions
class SuperArray extends Array {
	diff(comparisonArray) {
		const hash = new Set(comparisonArray);
		return this.filter(elem => !hash.has(elem));
	}
}


// Favor functional programming over imperative programming
const programmerOutput = [{
	name: 'Uncle Bobby',
	linesOfCode: 500
}, {
	name: 'Suzie Q',
	linesOfCode: 1500
}, {
	name: 'Jimmy Gosling',
	linesOfCode: 150
}, {
	name: 'Gracie Hopper',
	linesOfCode: 1000
}];

const INITIAL_VALUE = 0;

const totalOutput = programmerOutput
	.map((programmer) => programmer.linesOfCode)
	.reduce((acc, linesOfCode) => acc + linesOfCode, INITIAL_VALUE);


// Encapsulate conditionals

function shouldShowSpinner(fsm, listNode) {
	return fsm.state === 'fetching' && isEmpty(listNode);
}

if (shouldShowSpinner(fsmInstance, listNodeInstance)) {
	// ...
}


// Avoid negative conditionals
function isDOMNodePresent(node) {
	// ...
}

if (isDOMNodePresent(node)) {
	// ...
}


// Avoid conditionals
class Airplane {
	// ...
	getCruisingAltitude() {
		switch (this.type) {
			case '777':
				return this.getMaxAltitude() - this.getPassengerCount();
			case 'Air Force One':
				return this.getMaxAltitude();
			case 'Cessna':
				return this.getMaxAltitude() - this.getFuelExpenditure();
		}
	}
}

class Airplane {
	// ...
}

class Boeing777 extends Airplane {
	// ...
	getCruisingAltitude() {
		return this.getMaxAltitude() - this.getPassengerCount();
	}
}

class AirForceOne extends Airplane {
	// ...
	getCruisingAltitude() {
		return this.getMaxAltitude();
	}
}

class Cessna extends Airplane {
	// ...
	getCruisingAltitude() {
		return this.getMaxAltitude() - this.getFuelExpenditure();
	}
}


// Remove dead code

function newRequestModule(url) {
	// ...
}

const req = newRequestModule;
inventoryTracker('apples', req, 'www.carnes.cc');

// Clean Code: Objects and Data Structures

// Use getters and setters
function makeBankAccount() {
	let balance = 0;

	function getBalance() {
		return balance;
	}

	function setBalance(amount) {
		balance = amount;
	}

	return {
		getBalance,
		setBalance
	};
}
const account = makeBankAccount();
account.setBalance(100);
console.log(account.getBalance());



// Make objects have private members
const Employee = function(name) {
	return {
		getName() {
			return name;
		},
	};
};


const employee = new Employee('John Doe');
console.log(`Employee name: ${employee.getName()}`);
delete employee.name;
console.log(`Employee name: ${employee.getName()}`);



/* Clean Code: Classes */

// Prefer ES2015/ES6 classes over ES5 plain functions

//BAD
const Animal = function(age) {
	if (!(this instanceof Animal)) {
		throw new Error('Instantiate Animal with `new`');
	}

	this.age = age;
};

Animal.prototype.move = function move() {};

const Mammal = function(age, furColor) {
	if (!(this instanceof Mammal)) {
		throw new Error('Instantiate Mammal with `new`');
	}

	Animal.call(this, age);
	this.furColor = furColor;
};

Mammal.prototype = Object.create(Animal.prototype);
Mammal.prototype.constructor = Mammal;
Mammal.prototype.liveBirth = function liveBirth() {};

const Human = function(age, furColor, languageSpoken) {
	if (!(this instanceof Human)) {
		throw new Error('Instantiate Human with `new`');
	}

	Mammal.call(this, age, furColor);
	this.languageSpoken = languageSpoken;
};

Human.prototype = Object.create(Mammal.prototype);
Human.prototype.constructor = Human;
Human.prototype.speak = function speak() {};

// GOOD

class Animal {
	constructor(age) {
		this.age = age;
	}

	move() { /* ... */ }
}

class Mammal extends Animal {
	constructor(age, furColor) {
		super(age);
		this.furColor = furColor;
	}

	liveBirth() { /* ... */ }
}

class Human extends Mammal {
	constructor(age, furColor, languageSpoken) {
		super(age, furColor);
		this.languageSpoken = languageSpoken;
	}

	speak() { /* ... */ }
}



// Use method chaining

// BAD
class Car {
	constructor() {
		this.make = 'Honda';
		this.model = 'Accord';
		this.color = 'white';
	}

	setMake(make) {
		this.make = make;
	}

	setModel(model) {
		this.model = model;
	}

	setColor(color) {
		this.color = color;
	}

	save() {
		console.log(this.make, this.model, this.color);
	}
}

const car = new Car();
car.setColor('pink');
car.setMake('Ford');
car.setModel('F-150');
car.save();

//GOOD
class Car {
	constructor() {
		this.make = 'Honda';
		this.model = 'Accord';
		this.color = 'white';
	}

	setMake(make) {
		this.make = make;
		// NOTE: Returning this for chaining
		return this;
	}

	setModel(model) {
		this.model = model;
		// NOTE: Returning this for chaining
		return this;
	}

	setColor(color) {
		this.color = color;
		// NOTE: Returning this for chaining
		return this;
	}

	save() {
		console.log(this.make, this.model, this.color);
		// NOTE: Returning this for chaining
		return this;
	}
}

const car = new Car()
	.setColor('pink')
	.setMake('Ford')
	.setModel('F-150')
	.save();

// Prefer composition over inheritance

// BAD
class Employee {
	constructor(name, email) {
		this.name = name;
		this.email = email;
	}

	// ...
}

// Bad because Employees "have" tax data. EmployeeTaxData is not a type of Employee
class EmployeeTaxData extends Employee {
	constructor(ssn, salary) {
		super();
		this.ssn = ssn;
		this.salary = salary;
	}

	// ...
}

//GOOD
class EmployeeTaxData {
	constructor(ssn, salary) {
		this.ssn = ssn;
		this.salary = salary;
	}

	// ...
}

class Employee {
	constructor(name, email) {
		this.name = name;
		this.email = email;
	}

	setTaxData(ssn, salary) {
			this.taxData = new EmployeeTaxData(ssn, salary);
		}
		// ...
}