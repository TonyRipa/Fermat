
# Fermat: A Rule System for Constraints

Author:	Anthony John Ripa

Date:	2020.09.15

## Fermat

This project <code>Fermat</code> is an extension of a previous work <code>Leibniz</code>.

<code>Leibniz</code> is an mathematical expression simplifier. Both projects deal with the semantics of x/x. <code>Leibniz</code> uses a kind of generic semantics where x/x=1. This allows algebra to solve problems in calculus like ((x+h)^2-x^2)/h@h=0 is (x^2+2xh+h^2-x^2)/h@h=0 is (2xh+h^2)/h@h=0 is 2x+h@h=0 is 2x. This was only possible because we allowed h/h to be replaced by 1. In other words, the graph h/h does not have a hole in it at h=0.

<code>Leibniz</code> is good for simplifying expressions that do not involve an = sign (i.e. not constraints). How to handle constraints (like x=2x)? Naive extension of <code>Leibniz</code> may allow us to divide both sides by x, to get 1=2. This is sub-optimal. It seems that this semantics demands that x/x have a hole in it at x=0. In this logic we do not have x/x=1. We have x/x = 1 if x≠0 else %. Now, the only allowable transformation for this x=2x would be subtract x from both sides yielding 0=x. The right answer.

So, there are 2 competing semantics. The traditional constraint semantics x/x = 1 if x≠0 else %. And the generic semantics x/x=1. What about problems that intermix these semantics? Like (2x+h)*h=h*m. We are tempted to divide both sides by h, to get 2x+h=m, but constraint semantics disallows this. What to do?

<code>Fermat</code> is a rule-system that correctly deals with both semantics, even when mixed. We simply need to annotate the type, so that we never mix up the semantics. Prolog already already has this concept that capitals like X are unknown, and lowercase like x are atoms. We notate as (2x+h)*h=h*M. Dividing both sides by h is safe. <code>Fermat</code> yields 2x+h=M.

In retrospect, it is simple. For example, i * i = 1 seems to be unintelligible. However, mathematicians may write it as i * <i>i</i> = 1 .  Now it is more clear: <i>i</i> represents the square-root of -1. Whereas, i is something that we can solve for. The solution is i = -<i>i</i> .

We simply have to be clear about the difference (and notate the difference) between the base language (complex, generic, ...) and the meta-language (constraint language with symbols for unknowns).

## Dependencies

<a href='https://github.com/TonyRipa/Leibniz'>Leibniz</a>
