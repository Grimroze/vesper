# Binary Exponentiation

Binary exponentiation (also known as exponentiation by squaring) is an elegant mathematical trick that allows us to calculate $a^n$ using only $O(\log n)$ multiplications, rather than the $O(n)$ multiplications required by a naive approach.

### The Core Idea

The operation of raising a number $a$ to the power of $n$ can be broken down recursively based on the binary representation of the exponent $n$:

1. **If $n$ is even:** We can split the exponent in half.
   $$a^n = a^{n/2} \cdot a^{n/2} = (a^{n/2})^2$$
2. **If $n$ is odd:** We pull out one $a$ and the remaining exponent becomes even.
   $$a^n = a \cdot a^{n-1} = a \cdot (a^{(n-1)/2})^2$$

This simple property means that at every step, we either halve the exponent (if it's even) or subtract one (if it's odd). Since any number can be halved at most $\log_2(n)$ times before reaching $1$, the total number of operations is bounded by $O(\log n)$.

### Modular Exponentiation

In competitive programming, you are often asked to compute large powers modulo a prime number $m$. Because the modulo operator distributes over multiplication:

$$(X \cdot Y) \pmod m = ((X \pmod m) \cdot (Y \pmod m)) \pmod m$$

We can apply the modulo $m$ at every multiplication step during binary exponentiation to prevent integer overflow and keep the intermediate numbers small.

### Beyond Integers: Matrix Exponentiation

The beauty of binary exponentiation is that it applies to **any associative operation**. If we have a matrix $M$ that describes a linear recurrence (like the Fibonacci sequence), we can compute the $n$-th state by calculating $M^n$. 

By using binary exponentiation on matrices instead of integers, we can jump to the $n$-th term of a linear recurrence in $O(k^3 \log n)$ time, where $k$ is the dimension of the matrix.
