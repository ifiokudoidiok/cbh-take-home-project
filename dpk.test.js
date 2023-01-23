const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
});

describe("deterministicPartitionKey", () => {
  test("Should return partition key if given in event", () => {
    const event = { partitionKey: "12345" };
    const actual = deterministicPartitionKey(event);
    const expected = "12345";
    expect(actual).toEqual(expected);
  });

  test("Should return sha3-512 hash of data if no partitionKey is given in event", () => {
    const event = { test: "12345" };
    const actual = deterministicPartitionKey(event);
    const expected =
      "cb82a45e477767767f8efd203b7e75e3872cdc185f7fc8dc57a60206839a9f08fa92b8050292462776c1d9fe5a5c6f2d91b45edd2bafc174f0d9f50ca438d969";
    expect(actual).toEqual(expected);
  });

  test("Should return trivial partition key if no data is given", () => {
    const actual = deterministicPartitionKey();
    const expected = "0";
    expect(actual).toEqual(expected);
  });
});

