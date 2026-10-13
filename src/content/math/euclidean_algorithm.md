# The Euclidean Algorithm

The Euclidean Algorithm is a method for finding the Greatest Common Divisor (GCD) of two integers $a$ and $b$. It is one of the oldest numerical algorithms still in common use.

### The Mathematical Foundation

The algorithm is based on the principle that the greatest common divisor of two numbers does not change if the larger number is replaced by its difference with the smaller number. 

However, repeatedly subtracting the smaller number from the larger number can be slow. A much faster approach replaces subtraction with the modulo operation (the remainder of division):

$$\gcd(a, b) = \gcd(b, a \pmod b)$$

The base case for this recursive definition is when $b = 0$. In this case, $\gcd(a, 0) = a$.

### Complexity Analysis

The Euclidean algorithm is incredibly efficient. Its time complexity is determined by Lame's Theorem, which states that the number of steps required to find the GCD of two numbers is at most $5$ times the number of digits in the smaller number.

Mathematically, the time complexity is bounded by:
$$O(\log(\min(a, b)))$$

### The Extended Euclidean Algorithm

While the standard algorithm only finds the GCD, the **Extended Euclidean Algorithm** also finds integer coefficients $x$ and $y$ such that:

$$a \cdot x + b \cdot y = \gcd(a, b)$$

This equation is known as **Bézout's identity**. Finding these coefficients is critical in advanced number theory, particularly for finding the **Modular Multiplicative Inverse**. If $\gcd(a, m) = 1$, then taking the equation modulo $m$ gives:

$$a \cdot x \equiv 1 \pmod m$$

Here, $x$ is the modular inverse of $a$ modulo $m$.
