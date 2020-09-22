---
layout: post
title: "Midpoint Integration"
description: "Using Taylor expansions to derive the leading error term."
date: 2018-05-08
tag: Mathematics
---

<!-- implements MathJax -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>

<!--
MathJax Reference Guide:
https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference
-->

<!-- taylor series definition -->
The Taylor series, as described below, is used to expand given functions in a method known as Taylor expansion.

<!-- taylor series -->
- $$ \tag{1} \sum _{n=0}^{\infty }\:\frac{f^{\left(n\right)}\left(a\right)}{n!}\left(x-a\right)^n $$
- $$ \tag{2} f\left(a\right) + \frac{f'\left(a\right)}{1!}\left(x-a\right) + \frac{f''\left(a\right)}{2!}\left(x-a\right)^2 + \frac{f'''\left(a\right)}{3!}\left(x-a\right)^3 + \dots $$

<!-- example problem part a -->
As an example, we will use Taylor expansion to derive an error formula for the interval $$ \left[-\frac{h}{2},\:\frac{h}{2}\right] $$ using the local Midpoint Rule described bellow.

- $$ \int _{-\frac{h}{2}}^{-\frac{h}{2}} \:f\left(x\right)dx \approx hf\left(0\right) $$

Using the Taylor series we will expand our function, and take the definite integral on the given interval.

<!-- taylor series expansion -->
- $$ \int _{-\frac{h}{2}}^{-\frac{h}{2}} \:\left(f_0+\frac{x}{1!}f'_0+\frac{x^2}{2!}f''_0+\frac{x^3}{3!}f'''_0+\dots\right) - hf\left(0\right) = 0 $$
<!-- integration -->
- $$ \left(\frac{h}{2}f_0 + \frac{h^2}{8}f'_0 + \frac{h^3}{48}f''_0 + \frac{h^4}{384}f'''_0 + \dots\right) - \left(-\frac{h}{2}f_0 + \frac{h^2}{8}f'_0 - \frac{h^3}{48}f''_0 + \frac{h^4}{384}f'''_0 + \dots\right) - hf\left(0\right) = 0 $$
<!-- remove cancelled terms -->
- $$ \left(\frac{h^3}{48}f''_0 + \frac{h^4}{384}f'''_0 + \dots\right) - \left(-\frac{h^3}{48}f''_0 + \frac{h^4}{384}f'''_0 + \dots\right) = 0 $$

Now we have our _leading error term_ __(1)__ and the _order of accuracy_ __(2)__; which can be identified, respectively, as the first non-zero term and the $$ h^n $$ in that same term.

<!-- leading error term -->
- $$ \tag{1} 2\left(-\frac{h^3}{48}\right)f''_0 \to \left(-\frac{h^3}{24}\right)f''_0 $$
<!-- order of accuracy -->
- $$ \tag{2} \mathcal{O} \left(h^3\right) $$

To further expand on the example; a bound on the leading error term cam be determined when numerically integrating some function $$ f\left(x\right) $$ over an interval $$ \left[a,\:b\right] $$.

- $$ \frac{\left(b-a\right)}{h}\left|\left(-\frac{h^3}{24}\right)f''\left(\xi \:\right)\right| = \left(b-a\right)\left(\frac{h^2}{24}\right)f''\left(\xi \:\:\right) $$
- $$ \text{where, } f^{\left(n\right)}\left(\xi\right) = \max _{\left[a,\:b\right]}\left[f^{\left(n\right)}\left(x\right)\right] $$

We can then determine how many subintervals __(1)__ of equal size would be required to numerically integrate a function $$ f\left(x\right) = e^x $$ over the interval $$ \left[-1,\:1\right] $$ with an error less than $$ 10^{-4} $$.

<!-- sub-intervals -->
- $$ \tag{1} N = \frac{\left(b-a\right)}{h} \to h = \frac{\left(b-a\right)}{N} $$
- $$ \frac{\left(1-\left(-1\right)\right)}{h}\left|\left(-\frac{h^3}{24}\right)e^1\right| < 10^{-4} $$
- $$ \left(\frac{2}{h}\right)\left(\frac{h^3}{24}\right)e^1\:<\:10^{-4} $$
- $$ h = \sqrt{\frac{10^{-4}\cdot \:\:24}{2e}} \to \frac{2}{N} = \sqrt{\frac{10^{-4}\cdot \:\:24}{2e}} $$
- $$ N = \lceil 95.18897\dots \rceil = 96 $$