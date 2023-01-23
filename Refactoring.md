# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here
The initial code was hard to follow with different if blocks depending on one another.
The flow does not seem like the best way to go.






Below is a breakdown of my refactoring:

This code is a utility function used to generate a deterministic partition key for an event.
 The partition key is used to determine which partition of a database an event should be written to.
 A deterministic partition key is one that always produces the same output for a given input.


The code first checks to see if the event has a partition key. 
If so, it assigns the partition key to a candidate variable. 
If not, it creates a hash of the event data and assigns that to the candidate variable.

Next, it checks to see if the candidate is a string and, if not, it converts it to a string. 
It then checks to see if the length of the candidate is greater than the maximum partition key length. 
If so, it creates another hash of the candidate.

Finally, it returns the candidate. 
If the length of the candidate is greater than the maximum partition key length, 
it returns the hash of the candidate. 
Otherwise, it returns the candidate.
