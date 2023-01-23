const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

const hashInput = (input) => {
  return crypto.createHash("sha3-512").update(input).digest("hex");
};

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
    candidate = TRIVIAL_PARTITION_KEY;
  }

  return candidate;
};

exports.deterministicPartitionKey = (event) => {
  let candidate = getCandidate(event);

  if (candidate && typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }

  if (candidate?.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = hashInput(candidate);
  }

  return candidate.length > MAX_PARTITION_KEY_LENGTH ? hashInput(candidate) : candidate
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