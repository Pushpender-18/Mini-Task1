import { createHash } from 'crypto';

class Block {
	constructor(index, data, previousHash) {
		this.index = index;
		this.timestamp = this.getFormattedDateTime();	// Get the timestamp
		this.data = data;
		this.previousHash = previousHash;
		this.nonce = this.mineBlock(6);	// Block Mining
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

	// Function to mine
	mineBlock(difficulty) {
		const start = Date.now();	// Start Time
		let i = 0;	// Tracks number of tries
		let temp_hash;
		do {
			this.nonce = i;	// increment nonce value
			temp_hash = this.sha256(JSON.stringify(this));	// Generate hash
			i++;	// Increment trie
		} while (temp_hash.slice(0, difficulty) != '0'.repeat(difficulty))	// Check
		console.log(`Hash: ${temp_hash}`);	// Print Hash
		console.log(`Tries: ${i}`);	// Print Number of tries
		console.log(`Time taken: ${(Date.now()-start)}ms`);	// Time Elapsed
	}
}

// Only one block used and not entire block chain to reduce code complexity and increase code readibility
const block = new Block(0, "Genesis Block", null);	// Create Block

// Sample Output 
/*
Hash: 000000c484dc703a642416f3119e4f105052e7b15a5f2c9df3bfc6c2f7440055
Tries: 10397540
Time taken: 10512ms
*/