---
layout: post
title: "Lagrange Polynomial Example"
description: "Using the Lagrange polynomial to interpolate a function at given points."
date: 2017-05-06
---

<!-- implements MathJax -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>

<!--
MathJax Reference Guide:
https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference
-->

<!-- lagrange polynomial definition -->

The lagrange interpolation polynomial __(1)__ is a linear combination of the lagrange basis polynomials __(2)__ which are defined below as

<!-- interpolation polynomial -->

$$ \tag{1} p\left(x\right) = \sum _{n=0}^k\: f_jl_j\left(x\right) $$

<!-- lagrange basis polynomials -->

$$ \tag{2} l_j\left(x\right) = \prod _{m=0}^k\: \frac{\:x-x_m}{\:x_j-x_m} $$


<!-- lagrange polynomial example problem -->

As an example, let's say we wanted to use Lagrange interpolation polynomial $$ p\left(x\right) $$ to interpolate the function $$ f\left(x\right)=e^x $$ at the points $$ x_0 = -1 $$, $$ x_0 = 0 $$, and $$ x_2 = 1 $$. Since we will be interpolating with three points our interpolation polynomial, along with three lagrange basis polynomials, will look like so

<!-- lagrange interpolating polynomial with 3 points -->

$$ p\left(x\right) = f\left(x_0\right)l_0\left(x\right) + f\left(x_1\right)l_1\left(x\right) + f\left(x_2\right)l_2\left(x\right) $$

<!-- lagrange basis polynomials l_{0, 1, 2} -->

$$ l_0\left(x\right) = \frac{\left(x-x_1\right)\left(x-x_2\right)}{\left(x_0-x_1\right)\left(x_0-x_2\right)} $$

$$ l_1\left(x\right) = \frac{\left(x-x_0\right)\left(x-x_2\right)}{\left(x_1-x_0\right)\left(x_1-x_2\right)} $$

$$ l_2\left(x\right) = \frac{\left(x-x_0\right)\left(x-x_1\right)}{\left(x_2-x_0\right)\left(x_2-x_1\right)} $$

Plugging in our given points $$ x_0 = -1 $$, $$ x_1 = 0 $$, and $$ x_2 = 1 $$ into our three lagrange basis polynomials we get

<!-- lagrange basis polynomials x_{0, 1, 2} = {-1, 0, 1} -->

$$ l_0\left(x\right) = \frac{\left(x-0\right)\left(x-1\right)}{\left((-1)-0\right)\left((-1)-1\right)} = \frac{x\left(x-1\right)}{\:2} $$

$$ l_1\left(x\right) = \frac{\left(x-0\right)\left(x-1\right)}{\left((-1)-0\right)\left((-1)-1\right)} = -\frac{(x+1\left)(x-1\right)}{\:1} $$

$$ l_2\left(x\right) = \frac{\left(x-(-1)\right)\left(x-0\right)}{\left(1-(-1)\right)\left(1-0\right)} = \frac{x\left(x+1\right)}{\:2} $$

Our Lagrange interpolating polynomial will now like like so

<!-- lagrange interpolating polynomial -->

$$ p\left(x\right) = f\left(x_0\right)\frac{x\left(x-1\right)}{\:2} - f\left(x_1\right)\frac{(x+1\left)(x-1\right)}{\:1} + f\left(x_2\right)\frac{x\left(x+1\right)}{\:2} $$

Since were interpolating the function $$ f\left(x\right)=e^x $$ at the points $$ x_0 = -1 $$, $$ x_1 = 0 $$, and $$ x_2 = 1 $$, the lagrange interpolating polynomial would then be

<!-- lagrange interpolating polynomial -->

$$ p\left(x\right) = e^{-1}\cdot \frac{x\left(x-1\right)}{\:2} - e^{0}\cdot \frac{(x+1\left)(x-1\right)}{\:1} + e^{1}\cdot \frac{x\left(x+1\right)}{\:2} $$

Now using our interpolating polynomial $$ p\left(x\right) $$ we can approximate the value of $$ f\left(x\right)=e^x $$ at the point $$ x = 0.5 $$.

$$ p\left(0.5\right) = e^{-1}\cdot \frac{(0.5)\left((0.5)-1\right)}{\:2} - e^{0}\cdot \frac{((0.5)+1\left)((0.5)-1\right)}{\:1} + e^{1}\cdot \frac{(0.5)\left((0.5)+1\right)}{\:2} = 1.72337... $$

$$ e^{0.5} \approx 1.72337... $$
