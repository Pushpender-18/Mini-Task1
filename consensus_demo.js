function choose(list) {	// Select max from the given
	let max = 0;
	for (let val of list) {
		max = Math.max(max, val);
	}

	return max;
}

function vote() {	// Function to vote
	voters.forEach(() => {
		let choice = Math.round(Math.random());	// Randomly choose one of the delegate
		if (choice == 0) {	// Give vote
			delegates['Delegate 1']++;
		} else if (choice == 1) {
			delegates['Delegate 2']++;
		}
	});

	// Check which delegate won and return 
	if (delegates['Delegate 1'] > delegates['Delegate 2']) {
		return 'Delegate 1';
	}
	return 'Delegate 2';
}

let miner = [];
let stake = [];
let voters = ['Voter 1', 'Voter 2', 'Voter 3'];
let delegates = {'Delegate 1' : 0, 'Delegate 2' : 0};

for (let i=0; i<5; i++) {
	miner.push(Math.floor(Math.random()*100));	// Randomly assign power to miners
	stake.push(Math.floor(Math.random()*1000));	// Randomly assign stake to participants
}

console.log('------------------------------------------------------------------------------------');

// Proof of Work (PoW)
const selectedMiner = choose(miner);
console.log(`Miner with processing power ${selectedMiner} is selected to add the block to the blockchain.`);
console.log("Explanation: Miner with the most processing power solves the cryptographic puzzle the fastest.");
console.log('------------------------------------------------------------------------------------');

console.log('\n------------------------------------------------------------------------------------');
// Proof of Stake (PoS)
const selectedStake = choose(stake);
console.log(`The participant with stake of ${selectedStake} is selected to add the block to the blockchain.`);
console.log("Explanation: The participant with the highest stake is more valued.");
console.log('------------------------------------------------------------------------------------');

console.log('\n------------------------------------------------------------------------------------');
// Delegated Proof of Stake (DPoS)
const selectedDelegate = vote();
console.log(`The ${selectedDelegate} is selected to add the block to the blockchain.`);
console.log("Explanation: The delegate with the most votes is choosen to add the block to the blockchain.");
console.log('------------------------------------------------------------------------------------');

// Sample Output

/*
------------------------------------------------------------------------------------
Miner with processing power 78 is selected to add the block to the blockchain.
Explanation: Miner with the most processing power solves the cryptographic puzzle the fastest.
------------------------------------------------------------------------------------

------------------------------------------------------------------------------------
The participant with stake of 795 is selected to add the block to the blockchain.
Explanation: The participant with the highest stake is more valued.
------------------------------------------------------------------------------------

------------------------------------------------------------------------------------
The Delegate 1 is selected to add the block to the blockchain.
Explanation: The delegate with the most votes is choosen to add the block to the blockchain.
------------------------------------------------------------------------------------
*/