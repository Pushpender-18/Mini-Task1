import { createHash } from 'crypto';

class Block {
	constructor(index, data, previousHash) {
		this.index = index;
		this.timestamp = this.getFormattedDateTime();	// Get the timestamp
		this.data = data;
		this.nonce = Math.floor(Math.random() * 100);	// Randomly generate the nonce
		this.previousHash = previousHash;
		// Convert the instance into string using JSON
		this.hash = this.sha256(JSON.stringify(this));	// Create hash for the current block
	}

	// Generate Hash Value
	sha256(message) {
		return createHash('sha256').update(message).digest('hex');	// Generates hash in hex format
	}

	// Get Time Stamp
	getFormattedDateTime() {
		const now = new Date();

		// Function for ensuring numbers are always two digit
		const pad = (num) => String(num).padStart(2, '0');	

		// Date
		const day = pad(now.getDate());
		const month = pad(now.getMonth() + 1); // Months are zero-based
		const year = now.getFullYear();

		// Time
		const hours = pad(now.getHours());
		const minutes = pad(now.getMinutes());
		const seconds = pad(now.getSeconds());

		return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
	}
}

class Blockchain {
	constructor() {
		this.index = 0;		// Index
		this.chain = {};	// Block chain
		this.previousHash = null;	// For Genesis Block (null)
	}

	print(block) {	// To print a block
		console.log("------------------------");
		console.log("Previous Hash: " + block.previousHash);
		console.log("Index: " + block.index);
		console.log("Timestamp: " + block.timestamp);
		console.log("Nonce: " + block.nonce);
		console.log("Data: " + block.data);
		console.log("Hash: " + block.hash);
		console.log("------------------------");
	}

	print_chain() {	// To print the entire blockchain
		let block = this.chain[null];
		while (block != null) {
			this.print(block);
			block = this.chain[block.hash];
		}
	}

	add(data) {	// Adding data
		let block = new Block(this.index, data, this.previousHash);
		this.previousHash = block.hash;	// Setting previous hash
		this.chain[block.previousHash] = block;	// Adding to block chain
		this.index++;	// Incrementing index
	}
}

const blockchain = new Blockchain();

// Add Blocks
blockchain.add("Genesis Block");
blockchain.add("Second Block");
blockchain.add("Third Block");

// Print Blockchain
blockchain.print_chain();

// Changing First Block
// let block = new Block(0, "New Block", null);
// blockchain.chain[null] = block;

// Again Printing Chain
// blockchain.print_chain();
// Blocks after new block are invalid

// Sample Output
/*
------------------------
Previous Hash: null
Index: 0
Timestamp: 07-06-2025 13:45:53
Nonce: 70
Data: Genesis Block
Hash: cfbcc251b093117e713ce97226a53806c9b80438ed40f431f40ee5e0150b4a6e
------------------------
------------------------
Previous Hash: cfbcc251b093117e713ce97226a53806c9b80438ed40f431f40ee5e0150b4a6e
Index: 1
Timestamp: 07-06-2025 13:45:53
Nonce: 50
Data: Second Block
Hash: 8641247fd85bd2a89eada8eaa12da698a6be8abfafe423a3112f979aaa58393d
------------------------
------------------------
Previous Hash: 8641247fd85bd2a89eada8eaa12da698a6be8abfafe423a3112f979aaa58393d
Index: 2
Timestamp: 07-06-2025 13:45:53
Nonce: 53
Data: Third Block
Hash: 2a130cf31845cb2ac1ccf179017553eb8dcb4a6d4a6e630ce1a76edd1d94271a
------------------------
*/