const crypto = require("crypto");
const { DPK } = require("./constants");

/**
 * Utilizes the crypto module to hash input data in order to generate a deterministic partition key.
 * @param {*} input 
 * Computes the SHA3-512 hash digest of the input and @returns it as a hexadecimal string. 
 * @returns 
 */
const hashInput = (input) => {
  
  return crypto.createHash("sha3-512").update(input).digest("hex");
};
/**
 * - Makes use of a constant to define the maximum length of the partition key.
 * - Checks if the input is an event, and if so, will use the partition key from the event.
 * - If the input is not an event, it will stringify the input and hash it to generate the partition key.
 * @param {*} event 
 * @returns candidate
 */
const getCandidate = (event) => {
  let candidate;
  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      candidate = hashInput(data);
    }
  } else {
    candidate = DPK.TRIVIAL_PARTITION_KEY;
  }

  return candidate;
};

exports.deterministicPartitionKey = (event) => {
  let candidate = getCandidate(event);

  if (candidate && typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }

  if (candidate?.length > DPK.MAX_PARTITION_KEY_LENGTH) {
    candidate = hashInput(candidate);
  }

  // If the partition key exceeds the maximum length, it will be hashed again to ensure it is under the maximum length
  return candidate.length > DPK.MAX_PARTITION_KEY_LENGTH
    ? hashInput(candidate)
    : candidate;
};

// const crypto = require("crypto");

// exports.deterministicPartitionKey = (event) => {
//   const TRIVIAL_PARTITION_KEY = "0";
//   const MAX_PARTITION_KEY_LENGTH = 256;
//   let candidate;

//   if (event) {
//     if (event.partitionKey) {
//       candidate = event.partitionKey;
//     } else {
//       const data = JSON.stringify(event);
//       candidate = crypto.createHash("sha3-512").update(data).digest("hex");
//     }
//   }

//   if (candidate) {
//     if (typeof candidate !== "string") {
//       candidate = JSON.stringify(candidate);
//     }
//   } else {
//     candidate = TRIVIAL_PARTITION_KEY;
//   }
//   if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
//     candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
//   }
//   return candidate;
// };
