
# Fermat: A Rule System for Constraints

Author:	Anthony John Ripa

Date:	2021.12.15

## Fermat

This project <code>Fermat</code> is an extension of a previous work <code>Leibniz</code>.

<code>Leibniz</code> is an mathematical expression simplifier. Both projects deal with the semantics of x/x. <code>Leibniz</code> uses a kind of generic semantics where x/x=1. This allows algebra to solve problems in calculus like ((x+h)^2-x^2)/h@h=0 is (x^2+2xh+h^2-x^2)/h@h=0 is (2xh+h^2)/h@h=0 is 2x+h@h=0 is 2x. This was only possible because we allowed h/h to be replaced by 1. In other words, the graph h/h does not have a hole in it at h=0.

<code>Leibniz</code> is good for simplifying expressions that do not involve an = sign (i.e. not constraints). How to handle constraints (like x=2x)? Naive extension of <code>Leibniz</code> may allow us to divide both sides by x, to get 1=2. This is sub-optimal. It seems that this semantics demands that x/x have a hole in it at x=0. In this logic we do not have x/x=1. We have x/x = 1 if x≠0 else %. Now, the only allowable transformation for this x=2x would be subtract x from both sides yielding 0=x. The right answer.

So, there are 2 competing semantics. The traditional constraint semantics x/x = 1 if x≠0 else %. And the generic semantics x/x=1. What about problems that intermix these semantics? Like (2x+h) * h = h * m. We are tempted to divide both sides by h, to get 2x+h=m, but constraint semantics disallows this. What to do?

<code>Fermat</code> is a rule-system that correctly deals with both semantics, even when mixed. We simply need to annotate the type, so that we never mix up the semantics. Prolog already already has this concept that capitals like X are unknown, and lowercase like x are atoms. We notate as (2x+h) * h = h * M. Dividing both sides by h is safe. <code>Fermat</code> yields 2x+h=M.

In retrospect, it is simple. For example, i * i = 1 seems to be unintelligible. However, mathematicians may write it as i * <i>i</i> = 1 .  Now it is more clear: <i>i</i> represents the square-root of -1. Whereas, i is something that we can solve for. The solution is i = -<i>i</i> .

We simply have to be clear about the difference (and notate the difference) between the base language (complex, generic, ...) and the meta-language (constraint language with symbols for unknowns).

Alternatively, we may think of it as a hierarchy. Numbers are at the base of this hierarchy. Then a level up we have abstractions over numbers, which we wrote as lowercase x, and we called generics. Then a level up we have abstractions over generics, which we wrote as uppercase X.

## Solution Set

Constraint semantics seems to more explicitly manifest the problem of unexpected solutions than generic semantics does. Consider X = 2 * X . We may try to divide by X yielding 1=2, and think that there are no solutions. However, our manipulation seems to have lost a solution. Instead we may try to subtract X from both sides yielding 0=X. Now we have 1 solution. Many would conclude that we found all the solutions. Let's try for more. Start by reciprocating both sides 1/X=1/(2\*X). Pull out the constant factor on the right 1/X=1/2\*1/X. Subtract 1/2\*1/X from both sides. 1/2\*1/X=0. Multiply both sides by 2. 1/X=0. We get X=1/0 as a solution. You may interpret this as satisfying the original constraint by saying that ∞=2∞. Others may say 1/0 is undefined. However, this is circular. √-1 is undefined if you exclude it. The same is true for fractional numbers, negative numbers, and even 0. With generic semantics, simplifying an expression (that does not include an equal sign) we may get √-1 in a less indirect manner (such as simplifying √(0-1) or similar). With expression simplification, it seems that every time that we get an expression that we cannot simplify into one of our other elementary forms, then we now explicitly have a new elementary form on our hands. E.G. 2/3, √2, √-1, 1/0, etc. However, with constraint semantics when we get an answer with a manipulation, there does not appear to be any clear stopping criteria that we should not look for more solutions.

A common approach to dealing with constraints is to fix the solution set before the problem starts. For example, we may only look for solutions that are real numbers (perhaps because we believe that these are the only actualizable solutions, hence the term real). However, we may miss solutions due to our unwarranted initial assumption about the solution space. We may miss complex solutions that may have solved our problem in a meaningful way. Building on this approach, we may keep an open mind of the solution space while doing exploratory analysis of the problem. Then after a time when we are satisfied that we understand the problem and what its solution space should be, then we fix the solution space for this domain. This is an improvement. However, there is a presumption that this process actually limits upon anything.

Let's consider 2 examples in which thinking that we know enough to fix the hypothesis space fails. One is with real numbers. When performing the calculations for the existence of regular polyhedra (the so-called Platonic solid) we assume a real number for the solutions. If so we get 5 Platonic solids. If we use R* the extended reals, we get 6. The sixth is the Sphere. We can't predict beforehand the right solution space. Therefore, we can't predict anything about the shapes which we can expect, or not expect. Making presumptions limits the shapes that we can find. Another example is from Differential Equations. Here we assume complex number solutions. We may want to solve Df=cf. We translate that to (D-c)f=0. We solve corresponding equation D-c=0 or m-c=0. We get m=c and the solution is e^(ct). We may have 2 different roots (D-c₁)(D-c₂)f=0. Here we get solutions e^(c₁t) and e^(c₂t). The roots may be repeated c₁=c₂. In this case instead of e^(c₁t) and e^(c₂t) we get e^(c₁t) and te^(c₂t). This seems to break the format, and should raise a flag, but seems not to have brought into question the solution set. Remember we had the idea that a polynomial of degree n has n roots. However, it is typically allowed to have repeated roots. This is suspicious, and violates the original assumption, with an exception case. Consider x^2=0. Typically it is said to have repeated roots r₁=r₂=0. Let's rethink. x^2=0 seems to have 0 as a solution. A solution should be any number that when squared gives 0. Racking our brain we may recall some work with nilpotent numbers (sometimes written ε) that are not 0 but whose square is 0. Allowing this then we get 2 solutions (as the theorem predicts) to x^2=0. The solutions are r₁=0, and r₁=ε. The solutions are e^(c₁t) and e^(c₂t) which are e^(0t) and e^(εt). The first is 1. The second is e^(εt) = 1+εt+ε^2t/2+ε^3t/6+… = 1+εt+0+0+… = 1+εt. This seems to give us both solutions without special cases. It seems that to solve polynomial constraints, not only should we understand roots of unity, but we should also understand roots of nullity. The moral seems to be that even after centuries (in the Diff.Eq. case) or millennia (in the Platonic case) when we think that we have fully determined the solution space, we can still be wrong.

This being the case it seems that the best we can do is merely return popular solutions, not all of them. In the alternative, instead of returning the solution set, we may return the simplified version of the constraint. Maybe if the input is X^2=1-1 then we return X^2=0 (a simpler constraint) not a solution set like {0} or {0,ε}.

## Constraints vs. Generics

We return to x/x. For generics we think we can safely replace x/x with 1. Constraint semantics suggest that this may be a suboptimal rule because changing X=2X to 1=2 loses the solution X=0. Splintering the semantics suggests x/x=1 but X/X=(x=0)?%:1. Those whose thinking is dominated by constraint semantics may think X/X=(x=0)?%:1 , and not be comfortable with the apparently less cautious alternate domain where x/x=1. However, it seems that the constraint semantics is actually not so cautious. Consider X=2X. Constraint semantics disallows dividing both sides by X. This belief is justified by 2 reasons: 1) is that X/X has a hole in it at X=0 2) We know that X=2X simplified to 1=2 loses a solution (namely X=0). Taken together constraint semantics seems to be cautious. However constraint semantics is typically good with the replacement of X-X with 0. This is not cautious. Consider X=2X. Subtract X from both sides. 0=X. This may look fine. However we lost a solution. X=1/0 satisfies X=2X, but not 0=X. We lost the solution X=1/0. A typical constraint semanticist may think this is fine because 1/0 is not real. However this reasoning is circular. I.E. everything that you choose to exclude is undefined by definition. This does not justify the exclusion. Experience (for centuries or millennia) also cannot justify the exclusion as we saw earlier with Platonic Solids and/or Differential Equations. Furthermore, for solutions of the form a/b (where a & b are integers) if I reciprocate the problem then give it to the solver, then reciprocate the answer, then I should get the right answer. Basically flipping the projective real line upside down should not change the answer. Typical constraint semantics is insufficiently cautious to guarantee this. This is because they allow X-X to be replaced with 0. What should now be clear is that replacing X/X with 1 is as safe as replacing X-X with 0. Either both are safe, or neither. It seems neither.

For generic semantics is seemed that x/x=1. This may have taken some convincing because constraint semantics suggested there's a hole. However, we never seemed to question x-x=0. This seemed obviously true because constraint semantics had allowed it. However, cautious constraint semantics does not allow it. This suggests that for generics x/x=1 is as safe as x-x=0. For generic semantics we did not ground the semantics in imagined substitutions but on generic quantities. For example x/x is 1 because how many x's per x are there? The answer is 1. Similarly, for x-x=0.

In conclusion, x/x=1 is as true as x-x=0. Also X/X=1 is as true as X-X=0. Objections that emerge from considerations of real numbers are special cases (much like the theorems in real-analysis when compared with complex-analysis). Intuitions about what x/x should be given what X/X should be, when only thinking about reals, are unreliable domain specific intuitions that are half oversafe and half undersafe. Traditional methods have a trade-off profile that has been largely overlooked, likely because it was not fully explored. Fully understanding that trade-off can inform the practitioner as to what approach is more desirable and when. An alternate approach is splitting into 2 semantics: 1) Generic semantics where x/x=1 and x-x=0 can guarantee safety 2) Constraint semantics where neither X/X=1 nor X-X=0 can guarantee safety. If problems can be well-modularized into the different semantics, then it would appear that it may be a good choice to apply the appropriate semantics in the appropriate place, instead of trying a one-size-fits-all, especially when it becomes clear that the one-size-fits-all is not so good a fit.

## 0\*X=0

0\*X=0 is a rather special constraint. This is a rule that works for any X. Therefore Prolog responds with X=\_672 (or similar). The \_672 is Prolog's way of creating a new variable, and it names that variable with a random number.

If we entered 0\*X=0,0\*Y=0 then Prolog would respond like X=\_672,Y=\_673 (or similar). One new variable is assigned for X, and another for Y. This is in perfect agreement with Linear Algebra where this system of 2 equations and 2 unknowns yields 2 free parameters. In Linear Algebra, we would make up new parameters like s and t, and then write the solution as X=s and Y=t.

In mathematics, when we get 0/0 we say it is indeterminate. In computer science, with the IEEE-754 standard for floating point arithmetic, when we get 0/0 we would get NaN. If we check NaN==NaN we get false. IEEE-754, Prolog, and Linear Algebra are all telling us the same thing. Prolog and Linear Algebra are telling us clearly. IEEE-754 is telling us with a number with strange properties. What they are all telling us is that 0/0 creates a new variable.

## Constraint Satisfaction vs. Constraint Simplification

One approach to the problem of constraints is constraint solving (i.e. constraint satisfaction). For constraint solving, given a constraint like X\*X=-1, we get a solution set {} (i.e. the empty set) if the allowable solutions are real numbers, and we get a solution set {i,-i} if the allowable solutions are complex numbers. For other allowable solutions, we may get another solution set. Constraint solving is underconstrained without at least implicitly specifying allowable solutions. This is an issue that we wish to avoid.

Another approach is constraint simplification. For constraint simplification, given a constraint like X\*X=-1, we return a simplified constraint. In our case, X\*X=-1 does not get simpler, so we return X\*X=-1. We have completely avoided the issue of being underconstrained without specifying allowable solutions. Domain specific solvers (like real or complex solvers) may consume our simplified output constraint as their input, and provide a domain specific solution set like {} or {i,-i}. By being general (i.e. domain independent) instead of domain specific we need not concern ourselves with such domain specific idiosyncrasies. Another advantage is one of types. The input is of type constraint (like X\*X=-1). The output is also of type constraint (like X\*X=-1). This is clean. It is like <code>Leibniz</code> where the input is an expression and the output is an expression. <code>Leibniz</code> simplified expression simplification by not having to always plug in different values for x and checking. Similarly, we can simplify constraint simplification by not having to always plug in different values for X and checking.

## Relations

### =

<code>Leibniz</code> has an evaluation construct.  For example, x+h@h=0.  This is typically written in math class as x+h|h=0.  I will use @ and | interchangeably.  x+h@h=0 is typically interpreted as meaning take the expression x+h and evaluate it at h equals 0.  Alternatively, one may think it means take the expression x+h and everywhere there is an h substitute in a 0.  Another reading is x+h such that h=0.  In the construct x+h@h=0 the pair (@ and =) are so linked that their independent usage is rare if at all.  For example, we typically do not see x+h@h by itself without the =.  If we did see it, then what would it mean?  Well, x+h|h is a thing that if you complete it with x+h|h=0, then you could put the 0 in it.  We have seen something like this before.  A function f can be similarly completed f(0).  The function has an independent existence.  For example, the cosine function has an independent existence, even when we are not plugging a number in.  Similarly x+h|h though seemingly incomplete can have its own existence.  Beyond the similarity of being completable objects, they actually appear to be exactly the same sort of thing.  x+h|h seems to operate in exactly the same fashion as the function f(h) = x+h.  The main difference being that f is a named function, and x+h|h is an anonymous function.  Expanding on this we can identify x+h|h with other notations for anonymous functions.  We can identify x+h|h with the arrow functions as in C++'s h => x+h , or Java's h -> x+h , or in math class h ↦ x+h.  They have the variable on the left, and the expression on the right.  We could imagine flipping it around x+h <= h , or x+h <- h , or x+h ↤ h .  The arrows make it clear.  The arrows point from the variable to the expression.  When we wrote x+h|h , because of the symmetry of the | operator , we had to remember that the expression is on the left , and the variable is on the right.  So, as we can see, in the construct x+h|h=0 , the x+h|h part has a meaning by itself , and that meaning is a function.

<code>Leibniz</code> was updated to allow for x+h@h to be used independently , and by its very nature any independent usage will necessarily be identical to that of the usage of a function.

<code>Fermat</code> was designed to handle expressions like m * h = (2x+h) * h .  These expressions appear to have a different semantics (Constraint Semantics) from the semantics that Leibniz was created to handle (Generic Semantics) .  For <code>Fermat</code>'s Constraint Semantics we modify the notation slightly (from math class) to show that we are solving for m with the expression M * h = (2x+h) * h .  Now M is a variable (to be solved for) , while x & h are Generics (not to be solved for).  This is all well and good.  We wish to understand constraints even simpler .  We realized functions to be sub-expressions of expressions like x+h|h=0.  Can we do something similar for constraints?  Yes.  We can say m such that m * h = (2x+h) * h .  We can write m | m * h = (2x+h) * h .  Writing it this way unambiguously specifies the roles of m, x, & h without the need for capitalization .  Instances of Constraint Semantics can be encoded without the need for Constraint Syntax.  Instances of Constraint Semantics can be encoded with Generic Syntax.

Earlier we noted that x+h|h is just like the function h ↦ x+h.  We noted that we could also write it as x+h ↤ h.  In all of these we put in one value for h and we get out one value for x+h.  Considering constraints like m | m * h = (2x+h) * h , we may have sub-expressions like m|m\*h . Using arrow notation this would be m ↤ m\*h , or m\*h ↦ m .  This looks odd in that it seems like an expression is input and a variable is output.  Seen another way, it just means remove a factor of h from the input (like how m ↦ m\*h would mean add a factor of h to the input).  Consider m\*m ↦ m .  Whereas m ↦ m\*m squares the input , m\*m ↦ m seems the opposite .  Let's rewrite m\*m ↦ m as m ↤ m\*m .  Now we'll try to evaluate at 9 .  We write m ↤ m*m = 9 .  This expression seems to have two distinct simplifications.  One is 3.  The other is -3 .  This would appear to make the symbols | and ↦ and ↤ not functions but really relations.  So we can handle Constraints with the | operator , but we give up on the | operator being a function because in general it could be a relation.  It may complicate cases where we only want one solution.  If the input is a variable then the output seems unique.  If the input is an expression then we may get multiple solutions.

There are multiple ways to handle this complexity.  One way is the way that is natural to Prolog which is that a predicate is not guaranteed to return exactly once.  It may return 0 times.  It may return 2 or more times.  This solution has a certain naturalness , especially in the context of being natively supported by the language that the software is written in.  Another solution is to always return an aggregate like a set, or a list.  One advantage is that you have the answers all neatly up in one package.  One problem is that now you have to work with a new data-type.  Another problem may be that the set is infinite but not exhaustive (like even numbers).  A third solution is that these are already in simplest form.  The square root of 9 is already in simplest form.  This may bother people who don't know the answer is 3 or -3.  We could help them out and simplify m|m\*m=9 to m|m\*m-9=0 to m|(m-3)\*(m+3)=0 and return that.  This way we return exactly once, the data-type didn't change, and the answers are less implicit and more explicit.

There is still the issue that the number of solutions depends on your assumptions about possible solutions.  x\*x=1 has one solution in whole numbers and two solutions in integers.  x\*x=-1 has two solutions in complex, and none in integer.  When we don't know how many times to return, this seems to clearly rule out returning more than once, or returning a set.  Returning an expression still seems possible.  The expression m|m\*m=9 can simplify to m|(m-3)\*(m+3)=0.  When using whole numbers there is one solution, and with integers two.  Though by writing m|(m-3)\*(m+3)=0 we seem to imply that there are two.  Consider x|x\*x=-9.  We could simplify to x|(x-3i)\*(x+3i)=0 .  Though this seems to force the user to use complex numbers.  We could return x|(x-3(a|a\*a=-1))\*(x+3(a|a\*a=-1))=0 .  That is correct for reals and complex.  Though it looks bizarre for people not using complex.  Furthermore, x|x^9-x=0 may necessitate quaternions (or worse yet no quaternions but expressions that would generate them [like the formula with no i but instead a|a\*a=-1]).  This seems to be getting out of hand.  This example x|x\*x=0 may require nilpotent numbers (or replace all nilpotent numbers with the expression that generates them).  One extreme would be just return x|x^9-x=0.  Another would be the most general (something without quaternion but with sub-expressions that generate them).  Another would be go for a mathematical habit like real or complex.  Mathematical habits lead to unwarranted assumptions.  The most general is another solution.  The lazy solution x|x^9-x=0 seems best.

Furthermore, as was previously discussed, by focusing on Constraint Simplification instead of Constraint Satisfaction, we allow for a pipeline wherein the Generic Constraint Simplifier can act as a pre-processor whose results can be passed to some Domain-Specific (Integer, Real, Complex, etc.) Constraint Satisfier.

### ≠

The = operator has issues. One issue is that it seems to stand in for another relation. Since it is standing for something else, the syntax is redundant. This forced redundancy constrains the allowable syntax, such that its expressibility is reduced.

Let's see an example. On a calculator we can hit 1 then + then 2 then = . The answer 3 is returned. We input 4 symbols to get our answer. Using postfix notation we could input 1 then 2 then + . The answer 3 is returned. We input 3 symbols to get our answer. We saved 1 symbol. Prefix is similar.

Let's see another example. To express that the sum of 1 and 2 is 3 we can write 1 + 2 = 3. This costs 5 symbols. Alternatively, we can write 1 2 + 3 . This costs 4 symbols. This saves 1 symbol. Let's think about the difference.  In 1 + 2 = 3 , we are saying 1+2 is 3 . The verb is =. The + is some kind of helper. In 1 2 + 3 , we are saying 1 & 2 sumto 3. The verb is sumto. We avoid a redundant verb is . We avoid = .

Let's see another example. We saw 1 2 + 3. This states a relation. We saw 1 2 + . This reduced to 3. It seems that removing a member from a relation creates something that is reducible to the part removed. Removing the '3' from '1 2 + 3' makes '1 2 +' which reduces to '3'. What if we removed a different part? We may remove the '1' from '1 2 + 3' making '2 + 3' . Following the same logic '2 + 3' should reduce to '1' . This gives us subtraction for free, without needing an extra operator (like -) . Furthermore, this simplicity came after abandoning =.

Consider using =, and using the same trick of removing the desired symbol. From '1 + 2 = 3' we can remove the '3' to get '1 + 2 = '. It does seem the '1 + 2 = ' could sensibly reduce to '3' . One might note that we might also just write '1 + 2' which could sensibly reduce to '3' . Now let's consider removing '1'. From '1 + 2 = 3' we can remove the '1' to get '+ 2 = 3'. It seems the '+ 2 = 3' could sensibly reduce to '1' . One issue is that unlike '1 + 2 =' which could be shortened to '1 + 2' this '+ 2 = 3' seems unshortenable. This asymmetry is undesirable. We could shorten with '3 - 2' . This costs a new kind of symbol. Introducing the symbol = introduced a costly asymmetry, and that price was paid with the introduction of yet more symbols (like -) . It is far cheaper to write 1 2 +, which reduces to 3, and to write 2 + 3, which reduces to 1.

Let's revisit algebraic issues. Consider x s.t. x\*3=3\*2 . x such that the product of x & 3 is the product of 3 and 2 . That is needlessly complicated. To solve it one might write x = 3\*2/3. This would change a multiplication problem into a division problem. This would yield x=2. The extra operator type / is needlessly complicated. Furthermore, we are led to introduce the concept of a variable x just to express, what should be expressible with less complication. There is still the needless = operator. Instead of using variables and = to write 'x\*3=3\*2' we can use the previous less kludge-like notation to write 3\*32\* . No concept of variable is needed. No new operator is needed. No = is needed. Simplifying is less complicated. 3\*32\* simplifies to 12* simplifies to 2.

The x in the previous problem was an artifact of the way the question was framed. The postfix notation did not need it. There may be questions where the letters are less contrived. For example, in m s.t. m\*h=h\*2, the m is contrived. We can instead write h\*h2\* . The h is not a placeholder for the answer to the question, which we could easily avoid by not ill-posing the question. The h is a placeholder for something input into the question. We allow it. Let's see how to simplify it. h\*h2\* simplifies to 12* simplifies to 2.

Remembering the distinction that was made much earlier between variable and generic, it seems that with this approach we can do away with variables, but we do not do away with generics. The variables seem to be an artifact, of an awkward way to pose the problem, as were the inverse operators, and the = .

In conclusion, using = starts us on an awkward path where we are led to explicitly double the number of operators that have, and we are led to introduce the concept of a variable. All of this complication can be avoided.

#### (

Normal postfix notation parses to a unique parse tree, without parentheses. The extended notation may be ambiguous. Consider 1+0+1. Associating left to right yields <s>1</s>+1 yields 2. Associating right to left yields 1+1 yields 0. Since we want the user to be able to express both trees, we will not solve the problem merely by imposing an order of operations. Additionally, we will allow for parentheses. So, (1+0)+1 yields <s>1</s>+1 yields 2. And, 1+(0+1) yields 1+1 yields 0. If the user does not specify then 1+0+1 will be left to right associative by default, yielding <s>1</s>+1 yields 2.

#### ↦

The ↦ operator is often used to express functions. For example, x↦x means x mapsto x. So, x↦x is the identity function. For another example, x↦1 means x mapsto 1. So, x↦1 is a function that returns 1 no matter what the input is. We would like to introduce the ↦ operator into our language, and proceed in direct analogy with the above avoidance of both the = and the doubling of every operator.

We convert the sentence 'f maps x to y' to the symbols fx↦y . If we leave off the y, then we have fx↦ . We can read this as f x mapsto . Instead if we leave off the f, then we have x↦y. We can read this as x mapsto y . When ↦ is in the middle, it is the function abstraction operator. When ↦ is at the end, it is the function application operator. 

With this syntax established we can try an example: x↦(xx+)y↦ . This is (x mapsto sum of x & x) appliedto y . Substituting y into that function, we get sum of y & y. So, x↦(xx+)y↦ simplifies to yy+ .

#### ^

The ^ operator is often used to express exponentiation. For example, the equation 2\^3=8 means 2\*2\*2=8. We would like to introduce the ^ operator into our language, and proceed in direct analogy with the above avoidance of both the = and the doubling of every operator.

We convert the sentence '2\^3=8' to the symbols 23\^8 . If we leave off the 8, then we have 23^ . We can read this as 2's 3rd power . Instead if we leave off the 2, then we have 3\^8. We can read this as 3rd root 8 (Ideally since position determines meaning, we'd still say power not root) . When ^ is in the middle, it is the nth root operator. When ^ is at the end, it is the exponentiation operator. 

With this syntax established we can try an example: 3\^(23^) . This is 3rd root (2's 3rd power) . Simplifying inside parentheses first, we get 8. So, 3\^(23^) simplifies to 3\^8. Then 3\^8 simplifies to 2. So, in total, 3\^(23^) simplifies to 2.

We had previously expressed addition as 12+ , which had an answer of 3. Addition has a unique inverse which is subtraction. We expressed subtraction as 2+3 , which had an answer of 1. Similarly 1+3 has an answer of 2. Solving for the first or second number (though conceptually different) can be expressed in the same way. This relates to the fact that addition is commutative : 12+ equals 21+ . We also saw that multiplication had a unique inverse called division. Unfortunately, exponentiation is not commutative : 23^ isn't 32^ . We should expect exponentiation to have two inverses. We wrote one inverse as 3\^8 which simplified to 2. We noted that this inverse is called a root. What if in 23\^8 we want to leave out the unknown 3? If we write 2\^8 then according to our previous syntax this would not yield 3, but instead yield the 2nd root of 8. The is a problem. When we removed the 3 from 23\^8 we slid the 2 to the right yielding 2\^8. This change in position changed the meaning. Instead we should remove the 3 from 23\^8 without changing the position, yielding 2 ^8 . In quotes, the expression is "2 ^8" . When not using quotes, the expression looks confusing (like two separate expressions) , but it is one expression that happens to include a space : 2 ^8 . With this notation 2 ^8 simplifies to 3. This is now the other inverse of exponentiation, which is usually referred to as a logarithm. People typically say the log base 2 of 8 is 3. Instead of 3 different functions (power, root, and log) we use one function/operator ^ and distinguish meaning by position of the operands. On the space notation, if 2 ^8 is too much to bear, we may replace the space with an _ , yielding 2_\^8 . Now an expression looks like a single chunk, instead of two separate things.

## Dependencies

<a href='https://github.com/TonyRipa/Leibniz'>Leibniz</a>
