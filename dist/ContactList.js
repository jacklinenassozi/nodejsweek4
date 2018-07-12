"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ContactList = exports.Contact = undefined;

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _util = require("util");

var _util2 = _interopRequireDefault(_util);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const util = require("util");
const writeFile = _util2.default.promisify(_fs2.default.writeFile); // const fs = require("fs");

const readFile = _util2.default.promisify(_fs2.default.readFile);

class Contact {
	constructor(obj) {
		this.id = obj.id;
		this.name = obj.name;
		this.age = obj.age;
		this.email = obj.email;
	}

	addPhone(number) {

		return this.phoneNumber = number;
	}
	call() {

		if (this.phoneNumber) console.log("Calling " + this.name + " at " + this.phoneNumber);else console.log(this.name + " has no phone number saved.");
	}
	birthday() {

		console.log("Wishing " + this.name + " a happy " + (this.age + 1) + "th birthday!");
	}
}exports.Contact = Contact;
;

class ContactList {
	constructor(filename) {
		this.list = [];
		this.filename = filename;
		this.load();
	}

	addContact(contact) {
		if (contact instanceof Contact) {
			this.list.push(contact);
			console.log("this.list", this.list);
			return this.save(this.list);
		}
	}
	editContact(b) {
		return b;
	}

	removeContact(i) {
		if (this.list[i]) {
			this.list.splice(i, 1);
		}
	}

	save(list) {
		return writeFile(_path2.default.resolve(__dirname, this.filename), JSON.stringify(list), "utf8").then(() => {
			return list;
		});
	}

	load() {
		const readFilePromise = readFile(_path2.default.resolve(__dirname, this.filename), "utf8");

		return readFilePromise.then(fileString => {
			this.list = JSON.parse(fileString).map(contactObj => new Contact(contactObj));

			return Promise.resolve(null);
		});
		// return new Promise((resolve, reject) => {
		// 	readFilePromise
		// 	.then(fileString => {
		// 		this.list = JSON.parse(fileString)
		// 		.map(contactObj => new Contact(contactObj));

		// 		resolve(null);
		// 	});
		// });
	}
}exports.ContactList = ContactList;
;
//# sourceMappingURL=ContactList.js.map