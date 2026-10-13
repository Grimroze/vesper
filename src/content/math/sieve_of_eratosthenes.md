# Sieve of Eratosthenes

The Sieve of Eratosthenes is a highly efficient ancient algorithm used to find all prime numbers up to a specified integer $n$.

### The Core Idea

The algorithm begins with an assumption that all numbers from $2$ to $n$ are prime. It then iteratively filters out composite numbers by identifying the multiples of each prime it finds.

1. Create a list of consecutive integers from $2$ through $n$.
2. Start with the smallest prime number, $p = 2$.
3. Enumerate the multiples of $p$ by counting in increments of $p$ from $p^2$ to $n$, and mark them in the list as composite (not prime).
4. Find the next number in the list greater than $p$ that is not marked. If there is no such number, stop. Otherwise, set $p$ to this new number and repeat step 3.

### Why Start at $p^2$?

When marking multiples of a prime $p$, you might be tempted to start at $2p$. However, any multiple of $p$ smaller than $p^2$ (such as $2p, 3p, \dots$) will have already been marked by smaller primes ($2, 3, \dots$). Therefore, we can safely start crossing out multiples beginning strictly at $p^2$.

Furthermore, the outer loop only needs to run while $p^2 \le n$. If $p > \sqrt{n}$, then $p^2 > n$, meaning there are no new multiples left to mark in our target range.

### Time and Space Complexity

The memory required to store the boolean flags for numbers up to $n$ makes the space complexity $O(n)$.

The time complexity is remarkably fast. The inner loop executes $rac{n}{p}$ times for each prime $p$. The total number of operations is proportional to the sum of the reciprocals of the primes:

$$\sum_{	ext{prime } p \le n} rac{n}{p} = n \cdot \sum_{	ext{prime } p \le n} rac{1}{p}$$

By Mertens' 2nd theorem, the sum of the reciprocals of primes diverges as $\ln(\ln n)$. Thus, the final time complexity is:
$$O(n \log \log n)$$
