
# Fermat: A Rewriting System for Constraints

Author:	Anthony John Ripa

Date:	2025.06.15

Live Demo at <a target='_blank' href='http://tonyripa.github.io/Fermat/'>http://tonyripa.github.io/Fermat/</a>

## Fermat

This project <code>Fermat</code> is an extension of a previous work <code>Leibniz</code>.

<code>Leibniz</code> is a mathematical expression simplifier. Both projects deal with the semantics of x/x. <code>Leibniz</code> uses a kind of [indeterminate](<https://en.wikipedia.org/wiki/Indeterminate_(variable)>) semantics where x/x=1. This allows algebra to solve problems in calculus like ((x+h)^2-x^2)/h@h=0 is (x^2+2xh+h^2-x^2)/h@h=0 is (2xh+h^2)/h@h=0 is 2x+h@h=0 is 2x. This was only possible because we allowed h/h to be replaced by 1. In other words, the graph h/h does not have a hole in it at h=0.

<code>Leibniz</code> is good for simplifying expressions that do not involve an = sign (i.e. not constraints). How to handle constraints (like x=2x)? Naive extension of <code>Leibniz</code> may allow us to divide both sides by x, to get 1=2. This is sub-optimal. It seems that this semantics demands that x/x have a hole in it at x=0. In this logic we do not have x/x=1. We have x/x = 1 if x≠0 else %. Now, the only allowable transformation for this x=2x would be subtract x from both sides yielding 0=x. The right answer.

So, there are 2 competing semantics. The traditional constraint semantics x/x = 1 if x≠0 else %. And the generic semantics x/x=1. What about problems that intermix these semantics? Like (2x+h) * h = h * m. We are tempted to divide both sides by h, to get 2x+h=m, but constraint semantics disallows this. What to do?

<code>Fermat</code> is a rule-system that correctly deals with both semantics, even when mixed. We simply need to annotate the type, so that we never mix up the semantics. Prolog already has this concept that capitals like X are unknown, and lowercase like x are atoms. We notate as (2x+h) * h = h * M. Dividing both sides by h is safe. <code>Fermat</code> yields 2x+h=M.

In retrospect, it is simple. For example, i * i = 1 seems to be unintelligible. However, mathematicians may write it as i * <i>i</i> = 1 .  Now it is more clear: <i>i</i> represents the square-root of -1. Whereas, i is something that we can solve for. The solution is i = -<i>i</i> .

We simply have to be clear about the difference (and notate the difference) between the base language (complex, generic, …) and the meta-language (constraint language with symbols for unknowns).

Alternatively, we may think of it as a hierarchy. Numbers are at the base of this hierarchy. Then a level up we have abstractions over numbers, which we wrote as lowercase x, and we called generics. Then a level up we have abstractions over generics, which we wrote as uppercase X.

## Language Choice

Prolog is a natural first choice, as it already distinguishes between variables like X and atoms like x, by using upper-case and lower-case respectively. Some drawbacks include the fact that getting X to print as X consistently is difficult as the run-time controls variables. Furthermore, constraint programming requires programming hooks, with difficulty on the order of reflective programming. The strong native support for some convenient features comes at the price of higher cost of other features, which unfortunately are all but required for this project. By porting to JavaScript, we give up some convenient Prolog native support (auto-parsing), and gain other convenient JavaScript native support (manual-parsing).

## Solution Set

Constraint semantics seems to more explicitly manifest the problem of unexpected solutions than generic semantics does. Consider X = 2 * X . We may try to divide by X yielding 1=2, and think that there are no solutions. However, our manipulation seems to have lost a solution. Instead we may try to subtract X from both sides yielding 0=X. Now we have 1 solution. Many would conclude that we found all the solutions. Let's try for more. Start by reciprocating both sides 1/X=1/(2\*X). Pull out the constant factor on the right 1/X=1/2\*1/X. Subtract 1/2\*1/X from both sides. 1/2\*1/X=0. Multiply both sides by 2. 1/X=0. We get X=1/0 as a solution. You may interpret this as satisfying the original constraint by saying that ∞=2∞. Others may say 1/0 is undefined. However, this is circular. √-1 is undefined if you exclude it. The same is true for fractional numbers, negative numbers, and even 0. With generic semantics, simplifying an expression (that does not include an equal sign) we may get √-1 in a less indirect manner (such as simplifying √(0-1) or similar). With expression simplification, it seems that every time that we get an expression that we cannot simplify into one of our other elementary forms, then we now explicitly have a new elementary form on our hands. E.G. 2/3, √2, √-1, 1/0, etc. However, with constraint semantics when we get an answer with a manipulation, there does not appear to be any clear stopping criteria that we should not look for more solutions.

A common approach to dealing with constraints is to fix the solution set before the problem starts. For example, we may only look for solutions that are real numbers (perhaps because we believe that these are the only actualizable solutions, hence the term real). However, we may miss solutions due to our unwarranted initial assumption about the solution space. We may miss complex solutions that may have solved our problem in a meaningful way. Building on this approach, we may keep an open mind of the solution space while doing exploratory analysis of the problem. Then after a time when we are satisfied that we understand the problem and what its solution space should be, then we fix the solution space for this domain. This is an improvement. However, there is a presumption that this process actually limits upon anything.

Let's consider 2 examples in which thinking that we know enough to fix the hypothesis space fails. One is with real numbers. When performing the calculations for the existence of regular polyhedra (the so-called Platonic solid) we assume a real number for the solutions. If so we get 5 Platonic solids. If we use R* the extended reals, we get 6. The sixth is the Sphere. We can't predict beforehand the right solution space. Therefore, we can't predict anything about the shapes which we can expect, or not expect. Making presumptions limits the shapes that we can find. Another example is from Differential Equations. Here we assume complex number solutions. We may want to solve Df=cf. We translate that to (D-c)f=0. We solve corresponding equation D-c=0 or m-c=0. We get m=c and the solution is e^(ct). We may have 2 different roots (D-c₁)(D-c₂)f=0. Here we get solutions e^(c₁t) and e^(c₂t). The roots may be repeated c₁=c₂. In this case instead of e^(c₁t) and e^(c₂t) we get e^(c₁t) and te^(c₂t). This seems to break the format, and should raise a flag, but seems not to have brought into question the solution set. Remember we had the idea that a polynomial of degree n has n roots. However, it is typically allowed to have repeated roots. This is suspicious, and violates the original assumption, with an exception case. Consider x^2=0. Typically it is said to have repeated roots r₁=r₂=0. Let's rethink. x^2=0 seems to have 0 as a solution. A solution should be any number that when squared gives 0. Racking our brain we may recall some work with nilpotent numbers (sometimes written ε) that are not 0 but whose square is 0. Allowing this then we get 2 solutions (as the theorem predicts) to x^2=0. The solutions are r₁=0, and r₁=ε. The solutions are e^(c₁t) and e^(c₂t) which are e^(0t) and e^(εt). The first is 1. The second is e^(εt) = 1+εt+ε^2t/2+ε^3t/6+… = 1+εt+0+0+… = 1+εt. This seems to give us both solutions without special cases. It seems that to solve polynomial constraints, not only should we understand roots of unity, but we should also understand roots of nullity. The moral seems to be that even after centuries (in the Diff.Eq. case) or millennia (in the Platonic case) when we think that we have fully determined the solution space, we can still be wrong.

This being the case it seems that the best we can do is merely return popular solutions, not all of them. In the alternative, instead of returning the solution set, we may return the simplified version of the constraint. Maybe if the input is X^2=1-1 then we return X^2=0 (a simpler constraint) not a solution set like {0} or {0,ε}.

## Objects

When we see a letter like x we are somehow conditioned to think of a variable. However, sometimes letters refer to constants, like a name.

When we see a constant like x we are somehow conditioned to think of a number. However, sometimes constants refer to objects, like a line-segment or event.

### Objects in Statistics

In Statistics, we often see Odds(Event1:Event2). Event1 is not a variable. Event1 is a constant. Event1 is an event. The same is true for Event2. Odds(Event1:Event2) means the odds of Event1 to Event2. Or how much more likely is Event1 than Event2. The events are not numbers. The Odds(Event1:Event2) may be a number. Consider Odds(E1:E1). How much more likely is E1 than E1. They are just as likely. We may write 1:1 or 1/1 or 1. Note that this is true no matter how likely we label E1 to be. This is crucial because the relative chance does not depend on any absolute chance. Crucially, it is even true if we think there is no chance of E1. Odds(E1:E1) is 1 even if E1 = "Going faster than the speed of light" or something else we think impossible. This is not because E1 has a small non-zero chance. It is because the relative chance of any event to itself is 1. There is no division by zero. We do not compare the numbers. We compare the events. If E2 is "Going faster than the speed of light on a weekend" Odds (E2:E1) = 2:7 or 2/7. Not because either is possible or non-zero. We do not divide numbers. We compare events directly.

Consider 4 events E1,E2,E3,E4. These events may correspond to a discrete probability distribution [.5,.5,0,0] . We may be interested in calculating all the pairwise odds; this concept seems obvious but is not easy to find in literature; we call it an odds table. We may try to use the discrete probability distribution to calculate the odds table. Here goes:

<table border>
	<tr><th>Odds</th><th>E1</th><th>E2</th><th>E3</th><th>E4</th></tr>
	<tr><th>E1</th><td>1</td><td>1</td><td>∞</td><td>∞</td></tr>
	<tr><th>E2</th><td>1</td><td>1</td><td>∞</td><td>∞</td></tr>
	<tr><th>E3</th><td>0</td><td>0</td><td>%</td><td>%</td></tr>
	<tr><th>E4</th><td>0</td><td>0</td><td>%</td><td>%</td></tr>
</table>

We see it works well in the top-left quadrant; this is because we only have to divide non-zero numbers to calculate the odds. We see it also works well in the bottom-left quadrant; this is because we only have to divide with non-zero numbers in the denominator to calculate the odds. We see it also works fairly well in the top-right quadrant; this is because we only have to divide with non-zero numbers in the numerator to calculate the odds. We see it doesn't work too well in the bottom-right quadrant; this is because we have to divide with zero numbers in both the numerator and the denominator to calculate the odds; we get the indeterminate form 0/0, which is no information.

It may be the case that E3 is twice as likely as E4. Perhaps E4 is 1 point on an interval, and has probability 0. Perhaps E3 is 2 points on an interval, and has probability 0. E3 can be twice as likely as E4, even if we can't infer that from the probability distributions. We need a new data-structure that can carry the information that a probability distribution doesn't.

We introduce a new data-structure called an odds chain. The odds chain contains a linear sequence of odds of Eventₙ₊₁ to Eventₙ. For example, our events 1 through 4 correspond to the odds chain Odds(Event2:Event1),Odds(Event3:Event2),Odds(Event4:Event3) = 1,0,½ . We can expand this odds chain to calculate the odds table; provided we use the expansion formulas Odds(A:B) = 1 / Odds(B:A) , Odds(A:C) = Odds(A:B) \* Odds(B:C) .

<table border>
	<tr><th>Odds</th><th>E1</th><th>E2</th><th>E3</th><th>E4</th></tr>
	<tr><th>E1</th><td>1</td><td>1</td><td>∞</td><td>∞</td></tr>
	<tr><th>E2</th><td>1</td><td>1</td><td>∞</td><td>∞</td></tr>
	<tr><th>E3</th><td>0</td><td>0</td><td>1</td><td>2</td></tr>
	<tr><th>E4</th><td>0</td><td>0</td><td>½</td><td>1</td></tr>
</table>

There is concern of exotic cases such as odds trees or lattices that cannot be properly compressed with an odds chain such that recovering the full odds table is always possible. We imagine increasingly complicated patches.

For simplicity, we can take the odds table to be the default complete and proper representation of chance. So, instead of calculating the odds table in terms of other structures, we can start and end every problem with an odds table. The proper specification of the problem is an odds table; the proper specification of the solution is an odds table.

### Objects in Geometry

Similarly, if h is a line-segment then h/h=1. It does not matter what value if any we associate with the line-segment. Crucially, we do not divide some property of the line-segment, like length. We divide the line-segments.

Consider f(x)=x^2. We write the difference quotient (f(x+h)-f(x))/h = ((x+h)^2-x^2)/h = (x^2+2xh+h^2-x^2)/h = (2xh+h^2)/h . The concern is that if h is 0, then we cannot take the next step 2x+h. However, h need not be 0. h can be a line-segment. If h is a line-segment we can self divide it and get 1. We can get (2xh+h^2)/h = 2x+h . This is true independent of any fact about any property of h; this is independent of the weight, length, or cost of h. Length((f(x+h)-f(x))/h) = Length((2xh+h^2)/h) = Length(2x+h) = Length(2x) + Length(h) = Length(2x) = 2 * Length(x) .

## Generics

Earlier we discussed different kinds of object arithmetic. We could have an event-object x. While Prob(x) may be 0, x is not 0. So, x/x=1 without risking division by 0. Similarly, we could have a line-segment object x. While length(x) may be 0, x is not 0. Again, x/x=1 without risking division by 0.

Generics can be thought of as non-specific objects. We could have a generic object (or generic for short) x. While some valuation function of x [e.g. f(x)] could be 0, x is not 0. So, x/x=1 without risking division by 0.

## Constraints vs. Generics

We return to x/x. For generics we think we can safely replace x/x with 1. Constraint semantics suggest that this may be a suboptimal rule because changing X=2X to 1=2 loses the solution X=0. Splintering the semantics suggests x/x=1 but X/X=(x=0)?%:1. Those whose thinking is dominated by constraint semantics may think X/X=(x=0)?%:1 , and not be comfortable with the apparently less cautious alternate domain where x/x=1. However, it seems that the constraint semantics is actually not so cautious. Consider X=2X. Constraint semantics disallows dividing both sides by X. This belief is justified by 2 reasons: 1) is that X/X has a hole in it at X=0 2) We know that X=2X simplified to 1=2 loses a solution (namely X=0). Taken together constraint semantics seems to be cautious. However constraint semantics is typically permissive with the replacement of X-X with 0. This is not cautious. Consider X=2X. Subtract X from both sides. 0=X. This may look fine. However we lost a solution. X=1/0 satisfies X=2X, but not 0=X. We lost the solution X=1/0. A typical constraint semanticist may think this is fine because 1/0 is not real. However this reasoning is circular. I.E. everything that you choose to exclude is undefined by definition. This does not justify the exclusion. Experience (for centuries or millennia) also cannot justify the exclusion as we saw earlier with Platonic Solids and/or Differential Equations. Furthermore, for solutions of the form a/b (where a & b are integers) if I reciprocate the problem then give it to the solver, then reciprocate the answer, then I should get the right answer. Basically flipping the projective real line upside down should not change the answer. Typical constraint semantics is insufficiently cautious to guarantee this. This is because they allow X-X to be replaced with 0. What should now be clear is that replacing X/X with 1 is as safe as replacing X-X with 0. Either both are safe, or neither. It seems neither.

For generic semantics is seemed that x/x=1. This may have taken some convincing because constraint semantics suggested there's a hole. However, we never seemed to question x-x=0. This seemed obviously true because constraint semantics had allowed it. However, cautious constraint semantics does not allow it. This suggests that for generics x/x=1 is as safe as x-x=0. For generic semantics we did not ground the semantics in imagined substitutions but on generic quantities. For example x/x is 1 because how many x's per x are there? The answer is 1. Similarly, for x-x=0.

In conclusion, x/x=1 is as true as x-x=0. Also X/X=1 is as true as X-X=0. Objections that emerge from considerations of real numbers are special cases (much like the theorems in real-analysis when compared with complex-analysis). Intuitions about what x/x should be given what X/X should be, when only thinking about reals, are unreliable domain specific intuitions that are half oversafe and half undersafe. Traditional methods have a trade-off profile that has been largely overlooked, likely because it was not fully explored. Fully understanding that trade-off can inform the practitioner as to what approach is more desirable and when. An alternate approach is splitting into 2 semantics: 1) Generic semantics where x/x=1 and x-x=0 can guarantee safety 2) Constraint semantics where neither X/X=1 nor X-X=0 can guarantee safety. If problems can be well-modularized into the different semantics, then it would appear that it may be a good choice to apply the appropriate semantics in the appropriate place, instead of trying a one-size-fits-all, especially when it becomes clear that the one-size-fits-all is not so good a fit.

## Variables as Wires

Variables appear to be a natural response to a resource poor language. We may ask: what is 2+3. The answer may be 5. What if I know the sum is 5, and the augend is 2, and I want to know the addend (and I lack the words sum, augend, and addend)? I could modify the language with a new operator – and ask: what is 5-2. This can and did happen. The general problem of resource poor languages also created the variable, so that one could solve innumerable ad-hoc problems without bloating the language. Just add a templating scheme to a resource poor language. Instead of relying on the invention of the – operator, I can just ask: what is x such that 2+x=5. Since 2+3=5 exists and is true in the resource poor language, I was able to use meta symbols like x to express what I could not in the base language.

The question of whether there is an alternative approach to templating schemes (variables) seems to have been answered in the affirmative. Lambda Calculus which uses variables, is computationally complete according to the Church-Turing Thesis. The computationally equivalent Combinator Calculus was specifically invented to be equi-powerful and variable-free.

Other approaches to avoiding variables, note that language’s linear-encoding incentivizes upgrading via templating (variables). Graphical programming languages (like circuit diagrams) appear to have no need for variables. I may have an Addition element with two edges specified, as in 2+3. Rewiring, I can specify the sum, and the augend. This is natural in a 2-dimensional language. A linear language would beg for a new operator, or a templating scheme. Similarly, x such that x²-5x+6=0 is typically specified in a linear language with a templating scheme (variable), like in the beginning of this sentence. Alternatively, we could have upgraded the linear language with a new operator that works for quadratics; this approach is not popular. With a 2-D language, careful wiring of some addition and multiplication elements would yield the same effect.

At this point it should be clear, from Combinator Calculus alone, that variables are not needed. If used, though not needed, variables should be used with care, because they are extremely easy to confuse with symbols in the base language. It is advisable to get a good handle on the base language, before ever introducing a templating scheme.

## Reference

Another possible characterization of variables vs generics, is variables vs references. 

Kit Fine’s 2023 ‘Refining Russell’ states “ ‘x²’ is to be interpreted classically in the first case (‘dx²/dx = 2x’) and generically in the second case (‘x² is non-negative’). ” We think Fine’s ‘classically’ is like our generic, while Fine’s ‘generically’ is like our variable.

Fine offers "hatting an expression would be a device for securing reference to the sense of the un-hatted expression ... for example, to write ‘dx²/dx’ as ‘dx̂²/dx’".

Fine’s approach shifts the question from questions about the nature of variables of different sorts, to the question of references of different sorts (direct vs. indirect).  For example, in c, we may write int x = 0.  Thereafter, x/x would yield NaN (i.e. 0/0 yields Not a Number).  However, if we use the reference operator &, &x/&x would yield 1.  Furthermore, none of this is contingent on x being a variable.  In c, if our declaration is const int x = 0 , then we still have x/x yields NaN and &x/&x yields 1.

If Fine’s distinction is relevant, then what we desire is not a proper calculus for the domain objects (variable or otherwise) but a proper calculus of references (a pointer arithmetic).

## Dependency

Constraints vs. Generics model 2 types. We may imagine multiple types based on dependencies. For example, we can have a dependency chain, y=x, where y is Any, and x is Real (or vice-versa). Alternatively, we can have a dependency chain, y=x, where y is Any, and x lacks dependence. In the latter case, x is like a generic. We might imagine all kinds of dependency chains, trees, loops, etc. which might otherwise be interpreted as many different kinds of types.

## 0\*X=0

0\*X=0 is a rather special constraint. This is a rule that works for any X. Therefore Prolog responds with X=\_672 (or similar). The \_672 is Prolog's way of creating a new variable, and it names that variable with a random number.

If we entered 0\*X=0,0\*Y=0 then Prolog would respond like X=\_672,Y=\_673 (or similar). One new variable is assigned for X, and another for Y. This is in perfect agreement with Linear Algebra where this system of 2 equations and 2 unknowns yields 2 free parameters. In Linear Algebra, we would make up new parameters like s and t, and then write the solution as X=s and Y=t.

In mathematics, when we get 0/0 we say it is indeterminate. In computer science, with the IEEE-754 standard for floating point arithmetic, when we get 0/0 we would get NaN. If we check NaN==NaN we get false. IEEE-754, Prolog, and Linear Algebra are all telling us the same thing. Prolog and Linear Algebra are telling us clearly. IEEE-754 is telling us with a number that has strange properties. What they are all telling us is that 0/0 creates a new variable.

## Constraint Satisfaction vs. Constraint Simplification

One approach to the problem of constraints is constraint solving (i.e. constraint satisfaction). For constraint solving, given a constraint like X\*X=-1, we get a solution set {} (i.e. the empty set) if the allowable solutions are real numbers. However, we get a solution set {i,-i} if the allowable solutions are complex numbers. For other allowable solutions, we may get another solution set. Constraint solving is underconstrained without at least implicitly specifying allowable solutions. This is an issue that we wish to avoid.

Another approach is constraint simplification. For constraint simplification, given a constraint like X\*X=-1, we return a simplified constraint. In our case, X\*X=-1 does not get simpler, so we return X\*X=-1. We have completely avoided the issue of being underconstrained without specifying allowable solutions. Domain specific solvers (like real or complex solvers) may consume our simplified output constraint as their input, and provide a domain specific solution set like {} or {i,-i}. By being general (i.e. domain independent) instead of domain specific we need not concern ourselves with such domain specific idiosyncrasies. Another advantage is one of types. The input is of type constraint (like X\*X=-1). The output is also of type constraint (like X\*X=-1). This is clean. It is like <code>Leibniz</code> where the input is an expression and the output is an expression. <code>Leibniz</code> simplified expression simplification by not having to always plug in different values for x and checking. Similarly, we can simplify constraint simplification by not having to always plug in different values for X and checking.

### Constraint Simplification

The approach was to break into 2 steps: first a domain independent constraint simplifier, second a domain specific constraint solver. However, constraint simplification may be domain dependent. Consider the constraint 1 = a \* X + b \* X . Naively, we may try the simplification 1 = (a + b) \* X . However, this assumes that the operation \* distributes over + , which will hold in some domains and not in others. Similar arguments will hold for commutativity (whether or not a \* b = b \* a). It seems that constraint simplification is domain dependent. Some simplification rules will be valid in some contexts and not in others. It seems we have at least 2 different ways of specifying this context for the constraint simplification step. The first approach is to specify what the possible values the variables can take, and the valid constraint simplifications will then follow. The second approach is that we merely specify what simplification rules are valid. Note the second approach is really the second half of the first approach. This is because if we specify the allowable values of the variables, then we conclude the allowable rules.

### Constraint Satisfaction

We will consider Constraint Satisfaction with domain dependency. What if we are in the integer domain and the user specifies X \* 0 = 0 ? The answer seems to be X ∈ ℤ . Prolog's library(clpfd) notates this as "X in inf..sup" (where inf means infimum and sup means supremum) . So, instead of returning X=\_672 indicating X is a fresh Prolog variable (which could be any possible thing), we can instead return X in inf..sup, or X is integer (notating that X is an Integer). Furthermore if both X=7 and X in inf..sup are true, then it should return X=7. Also integer(X) can return X in inf..sup. We want X\*2=1 to return X=0.5 , while integer(X),X\*2=1 should return false.

Users are likely to input expressions such as X \* 0 = 0 (or X \* X = X) without ever specifying a domain. In this case, the problem is underspecified. What can be done? One solution is rewriting the expression as the user types in the input (as seen in modern Computer Algebra Systems like Maple & Mathematica) and/or querying the user for ambiguous input such as Maple. These user-interface issues are not best addressed in a command-line language like Prolog, but are easy to address in a Visual User Interface language like JavaScript. Another solution is an interactive Symbol Table.

## Relations

### =

<code>Leibniz</code> has an evaluation construct.  For example, x+h@h=0.  This is typically written in math class as x+h|h=0.  I will use @ and | interchangeably.  x+h@h=0 is typically interpreted as meaning take the expression x+h and evaluate it at h equals 0.  Alternatively, one may think it means take the expression x+h and everywhere there is an h substitute in a 0.  Another reading is x+h such that h=0.  In the construct x+h@h=0 the pair (@ and =) are so linked that their independent usage is rare if at all.  For example, we typically do not see x+h@h by itself without the =.  If we did see it, then what would it mean?  Well, x+h|h is a thing that if you complete it with x+h|h=0, then you could put the 0 in it.  We have seen something like this before.  A function f can be similarly completed f(0).  The function has an independent existence.  For example, the cosine function has an independent existence, even when we are not plugging a number in.  Similarly x+h|h though seemingly incomplete can have its own existence.  Beyond the similarity of being completable objects, they actually appear to be exactly the same sort of thing.  x+h|h seems to operate in exactly the same fashion as the function f(h) = x+h.  The main difference being that f is a named function, and x+h|h is an anonymous function.  Expanding on this we can identify x+h|h with other notations for anonymous functions.  We can identify x+h|h with the arrow functions as in C++'s h => x+h , or Java's h -> x+h , or in math class h ↦ x+h.  They have the variable on the left, and the expression on the right.  We could imagine flipping it around x+h <= h , or x+h <- h , or x+h ↤ h .  The arrows make it clear.  The arrows point from the variable to the expression.  When we wrote x+h|h , because of the symmetry of the | operator , we had to remember that the expression is on the left , and the variable is on the right.  So, as we can see, in the construct x+h|h=0 , the x+h|h part has a meaning by itself , and that meaning is a function.

<code>Leibniz</code> was updated to allow for x+h@h to be used independently , and by its very nature any independent usage will necessarily be identical to that of the usage of a function.

<code>Fermat</code> was designed to handle expressions like m * h = (2x+h) * h .  These expressions appear to have a different semantics (Constraint Semantics) from the semantics that Leibniz was created to handle (Generic Semantics) .  For <code>Fermat</code>'s Constraint Semantics we modify the notation slightly (from math class) to show that we are solving for m with the expression M * h = (2x+h) * h .  Now M is a variable (to be solved for) , while x & h are Generics (not to be solved for).  This is all well and good.  We wish to understand constraints even simpler .  We realized functions to be sub-expressions of expressions like x+h|h=0.  Can we do something similar for constraints?  Yes.  We can say m such that m * h = (2x+h) * h .  We can write m | m * h = (2x+h) * h .  Writing it this way unambiguously specifies the roles of m, x, & h without the need for capitalization .  Instances of Constraint Semantics can be encoded without the need for Constraint Syntax.  Instances of Constraint Semantics can be encoded with Generic Syntax.

Earlier we noted that x+h|h is just like the function h ↦ x+h.  We noted that we could also write it as x+h ↤ h.  In all of these we put in one value for h and we get out one value for x+h.  Considering constraints like m | m * h = (2x+h) * h , we may have sub-expressions like m|m\*h . Using arrow notation this would be m ↤ m\*h , or m\*h ↦ m .  This looks odd in that it seems like an expression is input and a variable is output.  Seen another way, it just means remove a factor of h from the input (like how m ↦ m\*h would mean add a factor of h to the input).  Consider m\*m ↦ m .  Whereas m ↦ m\*m squares the input , m\*m ↦ m seems the opposite .  Let's rewrite m\*m ↦ m as m ↤ m\*m .  Now we'll try to evaluate at 9 .  We write m ↤ m*m = 9 .  This expression seems to have two distinct simplifications.  One is 3.  The other is -3 .  This would appear to make the symbols | and ↦ and ↤ not functions but really relations.  So we can handle Constraints with the | operator , but we give up on the | operator being a function because in general it could be a relation.  It may complicate cases where we only want one solution.  If the input is a variable then the output seems unique.  If the input is an expression then we may get multiple solutions.

There are multiple ways to handle this complexity.  One way is the way that is natural to Prolog which is that a predicate is not guaranteed to return exactly once.  It may return 0 times.  It may return 2 or more times.  This solution has a certain naturalness , especially in the context of being natively supported by the language that the software is written in.  Another solution is to always return an aggregate like a set, or a list.  One advantage is that you have the answers all neatly up in one package.  One problem is that now you have to work with a new data-type.  Another problem may be that the set is infinite but not exhaustive (like even numbers).  A third solution is that these are already in simplest form.  The square root of 9 is already in simplest form.  This may bother people who don't know the answer is 3 or -3.  We could help them out and simplify m|m\*m=9 to m|m\*m-9=0 to m|(m-3)\*(m+3)=0 and return that.  This way we return exactly once, the data-type didn't change, and the answers are less implicit and more explicit.

There is still the issue that the number of solutions depends on your assumptions about possible solutions.  x\*x=1 has one solution in whole numbers and two solutions in integers.  x\*x=-1 has two solutions in complex, and none in integer.  When we don't know how many times to return, this seems to clearly rule out returning more than once, or returning a set.  Returning an expression still seems possible.  The expression m|m\*m=9 can simplify to m|(m-3)\*(m+3)=0.  When using whole numbers there is one solution, and with integers two.  Though by writing m|(m-3)\*(m+3)=0 we seem to imply that there are two.  Consider x|x\*x=-9.  We could simplify to x|(x-3i)\*(x+3i)=0 .  Though this seems to force the user to use complex numbers.  We could return x|(x-3(a|a\*a=-1))\*(x+3(a|a\*a=-1))=0 .  That is correct for reals and complex.  Though it looks bizarre for people not using complex.  Furthermore, x|x^9-x=0 may necessitate quaternions (or worse yet no quaternions but expressions that would generate them [like the formula with no i but instead a|a\*a=-1]).  This seems to be getting out of hand.  This example x|x\*x=0 may require nilpotent numbers (or replace all nilpotent numbers with the expression that generates them).  One extreme would be just return x|x^9-x=0.  Another would be the most general (something without quaternion but with sub-expressions that generate them).  Another would be go for a mathematical habit like real or complex.  Mathematical habits lead to unwarranted assumptions.  The most general is another solution.  The lazy solution x|x^9-x=0 seems best.

Furthermore, as was previously discussed, by focusing on Constraint Simplification instead of Constraint Satisfaction, we allow for a pipeline wherein the Generic Constraint Simplifier can act as a pre-processor whose results can be passed to some Domain-Specific (Integer, Real, Complex, etc.) Constraint Satisfier.

This is reasonable provided that Constraint Simplification can actually be done domain-independently.

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

### Analogy

Another relation formulation is in terms of analogies. Consider: hot is to cold as bad is to good. This is an analogy of opposites. We can write:

<table border><tr><td>Hot</td><td>Cold</td></tr><tr><td>Bad</td><td>Good</td></tr></table>

We see the table is redundant. We can imagine leaving one of those squares blank. If we have made the analogy correctly then how to fill in the blank is a forced choice. We can do similar things with math:

<table border><tr><td>x</td><td>2*x</td></tr><tr><td>y</td><td>2*y</td></tr></table>

Again we see the table is redundant. We can imagine leaving one of those squares blank. If we have made the analogy correctly then how to fill in the blank is a forced choice.

With this approach we can abandon the equal sign (=), and half the operators (at least).

For notational convenience, instead of always being required to write a 2x2 matrix, we can use a 1x4 vector. We can call this relation r. In this notation, the previous example can be written r( x , 2\*x , y , 2\*y ).

#### Functions

<table border>
	<tr><td colspan=2><table border><tr><td>&nbsp;x&nbsp;</td><td>&nbsp;2*x&nbsp;</td></tr></table></td></tr>
	<tr><td>&nbsp;y&nbsp;</td><td>&nbsp;2*y&nbsp;</td></tr>
</table>

With analogies we have a relation between 4 things . For example, we earlier saw r( x , 2\*x , y , 2\*y ) . Instead of clustering into 4 parts, it can cluster into 3 parts : r( (x , 2\*x) , y , 2\*y ) . The first part is (x , 2\*x). The second part is y. The third part is 2\*y. The last 2 parts are the same as before. What type of thing is the first part (x , 2\*x) ? Intuitively, it seems to be a pair . A mathematician may call it a tuple . Can we avoid new types of things ? Well, r( x , 2\*x , y , 2\*y ) was a relation, which seems to be a name (in this case r) followed by comma separated entries enclosed in parentheses. We may consider (x , 2\*x) to be this same type of object (in which case it would also probably be called a relation) except that it does not seem to start with a name . We may relax the constraint that all relations start with names. We may have unnamed relations. In this case, (x , 2\*x) would be a relation. Since it is unnamed, it would be an unnamed relation. This seems less a new type and more a clarification of types. Though we need not name (x , 2\*x) if we were to name it what would we name it ? By exploring how it is used perhaps we can see. We can explore the 4 part relation first. r(x, 2\*x, 4, 8) . This says x is to 2\*x as 5 is to 10 . If we group it with parentheses then (x is to 2\*x) as 5 is to 10 . This (x is to 2\*x) seems just like a function, with 5 being the argument, and 10 being the result. If this is right then a natural name would be function. We could write the unnamed (x , 2\*x) as the named function(x , 2\*x). As part of the larger r we could write r( function(x , 2\*x) , y , 2\*y ) . If we don't like the word function, we can procede like lambda calculus and use the name λ . We can write λ(x , 2\*x) . As part of the larger r we could write r( λ(x , 2\*x) , y , 2\*y ) .

If we name it, and what we name it, are less important then understanding the nature of (x , 2\*x) . (x , 2\*x) appears to behave just like a function, just like a lambda function from lambda calculus. By reorganizing the parts of the whole r( x , 2\*x , y , 2\*y ) , we can think of a part of r( x , 2\*x , y , 2\*y ) as a function . We don't have to reorganize r( x , 2\*x , y , 2\*y ) into different parts . However, if we do reorganize r( x , 2\*x , y , 2\*y ) into different parts, then grouping the first 2 parts together seems to naturally make a thing that behaves in every way like a lambda function.

#### Rewrites

<table border>
	<tr><td rowspan=2><table border><tr><td>&nbsp;x&nbsp;</td></tr><tr><td>&nbsp;y&nbsp;</td></tr></table></td><td>2*x</td></tr>
	<tr><td>&nbsp;2*y&nbsp;</td></tr>
</table>

We previously saw that if we group the first row (x , 2\*x) we get the concept of function. What if we group the first column (x , y) ? Proceeding similarly to before, we get a relation between 3 parts : (x , y) , 2\*x , and 2\*y . We can write the relation as r ( (x , y) , 2\*x , 2\*y ) . How can we think of this relation? With analogies the 2\*y was a forced choice from the x , y , and 2\*x. With functions, the 2\*y is still a forced choice; we merely package the (x , 2\*x) and refer to that chunk with the name function. The name function was appropriate because that chunk acts just like functions from lambda calculus. Now we have the same x , y , 2\*x , and 2\*y but partitioned differently so it looks like (x , y) , 2\*x , and 2\*y . Just as before the 2\*y is a forced choice from the x , y , 2\*x . So, the 2\*y is a forced choice from the (x , y) , 2\*x . In the same way that in lambda calculus (x , 2\*x) , y will yield a forced choice of 2\*y , is there some other previously existing convention in which (x , y) , 2\*x will yield a forced choice of 2\*y ? As it turns out, the fields of rewriting, term-rewriting, string-rewriting, and abstract-rewriting already have this convention . The (x , y) would be called the rewrite-rule . The 2\*x would be called the term. The 2\*y is the result of applying the rewrite-rule (x , y) to the term 2\*x . The rewrite-rule (x , y) can be thought of as saying replace every x with a y.

If we name it, and what we name it, are less important then understanding the nature of (x , y) . (x , y) appears to behave just like a rewrite-rule from abstract rewriting. By reorganizing the parts of the whole r( x , 2\*x , y , 2\*y ) , we can think of a part of r( x , 2\*x , y , 2\*y ) as a rewrite-rule . We don't have to reorganize r( x , 2\*x , y , 2\*y ) into different parts . However, if we do reorganize r( x , 2\*x , y , 2\*y ) into different parts, then grouping the x and y parts together seems to naturally make a thing that behaves in every way like a rewrite-rule.

By focusing on the structure rather than the naming, we can see that this structure occurs in multiple places. In programming there are variables. These variable have a scope, this is like environment variables, or a context. For example, we may write x=3. The fact that x=3 is then stored in the scope. If in that context the value of 2\*x is called for, as in for example print(2\*x), then the 2\*x will be combined with the scope x=3, yielding 2\*3 then 6. In languages like these, where the scope works behind the scenes, it may be difficult to notice that scopes and rewrites share a common structure. In some functional languages, where the scope can be manipulated directly, we may write scope={x:3} and eval(2\*x,scope), or we may write even more succinctly eval(2\*x,{x:3}) .

Again the point is not what we name these objects, but that they share a common structure, and that simple structures have only a few possible arrangements. One arrangement is no grouping. One arrangement is grouping the first row. One arrangement is grouping the first column.

#### Expressions

<table border><tr><td>x</td><td>x*x</td></tr><tr><td> </td><td>-1</td></tr></table>

What do we do when there is no way to fill in the table? x is to x\*x as what is to -1? The traditional answer has been to create a new entity which is the answer. In this case, the traditional answer has been the imaginary number i.

<table border><tr><td>x</td><td>x*x</td></tr><tr><td>i</td><td>-1</td></tr></table>

One the one hand, it is good that we have an answer. On the other hand, all we did is give a name to the unknown original expression. We could have equally well returned the unknown original expression. This is what was done with division. 3 doesn't divide 2 evenly. So, 2/3 is just 2/3. The question is the answer. The answer to an irreducible expression is just the irreducible expression. One way we could express this is to fill in that blank with the original like this:

<table border>
	<tr><td>x</td><td>x*x</td></tr>
	<tr><td><table border><tr><td>x</td><td>x*x</td></tr><tr><td> </td><td>-1</td></tr></table></td><td>-1</td></tr>
</table>

This is like 2/3 = 2/3. It is a bit like a fractal because it invites repetition. Alternatively, it is just 2/3. We just write:

<table border><tr><td>x</td><td>x*x</td></tr><tr><td> </td><td>-1</td></tr></table>

As something of an aside, in one of our other notations, this would be notated as the irreducible expression x@x\*x=-1 . Alternatively, we could use the previous r notation like r( x , x\*x ,  , -1 ) .

In conclusion, much of this entire work has been about avoiding unnecessary new syntax. We can do the same thing again here, by returning irreducible expressions, as the answer to any posed question.

However, this idea of irreducible expressions is not without its drawbacks. These irreducible expressions appear to be irreducible constraints. It may be the case that irreducible constraints do not fully specify a solution. For example, r( x , x\*x ,  , -1 ) may not fully specify i; it may also specify -i. If obliterating the distinction (between i and -i) is good, then this approach is good; otherwise, it's not good. We may also note that r( x , x\*x ,  , -1 ) might also specify the quaternion j which is distinct from the quaternion i. It may be that irreducible constraints are not sufficient for our purposes (which is specifying everything that we ought to specify).

## Quantifiers

In solving m \* h = h , we noted ambiguity. One attempt to disambiguate was by labeling m as a variable, and h as a generic. Solving (for the only variable in the equation) we got m=1 .

Another approach is quantifiers. The two most famous quantifiers are ∀ (for all) and ∃ (for some). We may write ∃x x+x=8 . This is true, because for some x self-addition is 8 (for example 4+4=8). We may write ∀x x+x=8 . This is an example of a statement that means for all x, self-addition is 8. This statement happens to be false as shown by counter-example (for example, for x=1). There is also the (pseudo)quantifier | (such that). We can write x | x+x=8 . This means x such that x+x=8 . This statement evaluates to 4.

The quantifiers ∀ and ∃ when used in a statement always evaluate to true or false. The (pseudo)quantifier | need not, and typically evaluates to a number.

With these quantifiers in mind, we may attempt to disambiguate expressions like m \* h = h.

We will write m | ∀h m \* h = h. This means that we want to find an m such that for all h, m \* h = h. The m| means solve for m. The ∀h means that it must work for all h. The meaning is clear; solve for m and it must work for all h. We might guess m=2. However, we quickly notice that this does not work for all h (for example 2 \* 7 = 7). We might guess m=1. This does work for all h (for all h, 1 \* h = h). So, m | ∀h m \* h = h evaluates to 1.

It seems that we are able to disambiguate ambiguous expressions like m \* h = h , with quantifiers. 

## Fundamental Theorem of Algebra

The Fundamental Theorem of Algebra states that polynomial factorization is unique, and the number of roots (or equivalently factors) is the degree of the polynomial, and if the roots are r₁,r₂,…,rₙ then the factors are (x-r₁),(x-r₂),…,(x-rₙ), so the polynomial equals (x-r₁)\*(x-r₂)\*…\*(x-rₙ).

For example, x²-3x+2 is a quadratic expression (i.e. the highest power is 2) therefore it has 2 roots (or equivalently 2 factors). The roots are 1 & 2. Therefore the factors are (x-1) and (x-2). Therefore x²-3x+2 = (x-1)\*(x-2) .

The Fundamental Theorem of Algebra is foundational. If it seems false, then the situation is reinterpreted to make it true.

For example, x²-2x+1 only appears to have one solution (i.e. root) of x=1. No other solution seems to work. It seems to only have 1 root. Naively, applying the Fundamental Theorem of Algebra would yield x²-2x+1 = (x-1) . This is false. So, we seek a saving interpretation. Well, the Fundamental Theorem of Algebra says since our expression x²-2x+1 is quadratic (i.e. the highest power is 2) then the factored form must be (x-r₁)\*(x-r₂) for some r₁ & r₂. We know r₁=1. We know that no other root works because if we graph x²-2x+1 we see that it touches the axis at only 1 point. Well, r₂ cannot be anything other than 1. Perhaps r₂ is 1. We try r₁=r₂=1. This makes the factors (x-1),(x-1) . This makes the factored form (x-1)\*(x-1). We can multiply out to check. (x-1)\*(x-1) = x\*x + (-1)\*x + x\*(-1) + (-1)\*(-1) = x²-x-x+1 = x²-2x+1. This is the same polynomial that we started with so it checks out. x²-2x+1 = (x-1)\*(x-1) . So, if it seems like there's not enough roots, then we repeat them.

We now look at a harder example. x²+1 is a quadratic polynomial (i.e. the highest power is 2). The Fundamental Theorem of Algebra states that it should have 2 roots. If we graph x²+1 , then we notice that it never touches the x-axis , and appears to have no roots at all. We remember the last example, where the Fundamental Theorem of Algebra appeared to fail, we made it work. We try that approach (of making it work) here. We recall the quadratic formula. The roots of ax²+bx+c = -b ± √(b²-4ac)/2a . Our a,b,c = 1,0,1 . We plug in . -0 ± √(0²-4\*1\*1)/2\*1 = 0 ± √(-4)/2 = ± 2√(-1)/2 = ± √(-1) . So the 2 roots are +√(-1) and -√(-1) . If we only knew what √(-1) was we could solve the problem. √(-1) means what number times itself it negative 1. If the number is positive, then positive times positive is positive. If the number is negative, then negative times negative is positive. If the number is zero then zero times zero is zero. A number times itself is never negative. We can't find √(-1). Well, if we can't find it then we create it. Let i = √(-1). What does this mean? We imagine some number such that i²=-1. Then we have two roots +i and -i. This seems an awful stretch to save the Fundamental Theorem of Algebra. However, if we believe in the theorem strong enough, then we imagine whatever it takes. In this case the imaginary number i.. If r₁=i and r₂=-i then the factored form should be (x-i)(x-(-i)) or (x-i)(x+i). We now check. (x-i)(x+i) = x\*x + (-i)\*x + x\*(+i) + (-i)\*i = x²+x-x-i² = x²-i² = x²-(-1) = x²+1. Since x²+1 is the polynomial we started with, our solution checks (if such imaginarium can be called a check). So, x²+1 = (x-i)(x+i). The Fundamental Theorem of Algebra is saved again. We only needed to imagine complex numbers. We now must consider numbers of the form a+b\*i , for roots.

We now look at an even harder example. x²+1 is a quadratic polynomial (i.e. the highest power is 2). The Fundamental Theorem of Algebra states that it should have 2 roots. Earlier we created complex numbers to solve this with i²=-1. We might also consider quaternions. Originally we might consider a root like a. After complex we consider roots of the form a+b\*i. Quaternions are of the form a+b\*i+c\*j+d\*k. What are i, j, and k. They are more square roots of -1. Before we saw i²=-1. Now we also have j²=-1 and k²=-1. But i≠j, and i≠k, and j≠k . Earlier we factored x²+1 uniquely as (x-i)(x+i). Now we can also factor it as (x-j)(x+j). Also (x-k)(x+k). What about the Fundamental Theorem of Algebra that states the factorization is unique? It seems that we accidentally imagined to many solutions. What do we do? Well, we say quaternions don't count. In fact, we say nothing else counts, no other number system. Complex numbers of the form a+b\*i work. Others don't work. So, we just disallow them by fiat. Only complex numbers. That works. That saves the Fundamental Theorem of Algebra. So, that's the rules.

We now look at a still harder example. We revisit x²-3x+2. We saw the only factoring was (x-1)\*(x-2). But is this true. Is (x-1) and (x-2) the only 2 things we can multiply to get x²-3x+2 ? Well, we know we must stick to complex; otherwise we break everything. However, can we stick to complex and yet still get an issue. What if one factor is (x-1) if x≠5 else 3. This would be look just like x-1 except at x=5 instead of being x-1=5-1=4, the value at x=5 would be 3. If we graph x-1 if x≠5 else 3, we see a hole in the graph of x-1 at x=5. This would appear as a point discontinuity. Instead of taking the value 4 at x=5 , it would take the value 3. This would be a rather queer expression. However, it would still be a complex number so no broken rules. Most of the time it is x-1, but sometime it isn't. If this is one of our factors, then what would the other be? For simplicity, we will use the guess-check method, with the first guess being correct. The other factor is (x-2) if x≠5 else 4. If we multiply them we get (x-1)(x-2) if x≠5 else 3\*4. Simplifying (x-1)(x-2) if x≠5 else 12. We can simplifying this further by noting that (x-1)(x-2) evaluated at 5 is (5-1)(5-2)=4\*3=12. That mean that the express (x-1)(x-2) if x≠5 else 12 , as well as the expression (x-1)(x-2) , have the same value for all x , so they are the same. This means (x-1 if x≠5 else 3)\*(x-2 if x≠5 else 4) = (x-1)(x-2) . We created an alternate factorization of x²-3x+2 . This violates the Fundamental Theorem of Algebra, which states that polynomial factorization is unique. What to do? Well, whatever it takes to save the Fundamental Theorem of Algebra. When we create factors, we simply can't allow them to have point discontinuities in them. If we allow for point discontinuities, we can create all sorts of new factors. So, we can't allow it. Just like we couldn't allow any numbers other than complex, we just can't allow any point discontinuities in factors.

The moral of the story is that if we insist on enough fiats, we can save the Fundamental Theorem of Algebra. We must be dogmatic about these fiats. Otherwise, the Fundamental Theorem of Algebra won't hold.

With this understanding (of precisely what the fiats are that must be held) we attempt to use the Fundamental Theorem of Algebra to solve a problem (an actual problem of actual interest).

We consider secants of the function f(x)=x² at the point x=1. We will use the letter h to represent delta x. The delta y will be f(x+h)-f(x). At x=1 this is f(1+h)-f(1). We will call the slope of the secant m. Earlier we were keen to write this m as M indicating it was a variable. In this context we may be keen to write it as m(h) to indicate the slope is a function of h. It is not clearly important how we notate just yet. We pick one notation. Now we have it that the slope times the delta-x is the delta-y. We write m(h) * h = f(1+h)-f(1) . Plugging in for f we get m(h) * h = (1+h)²-(1)² . Expanding we get m(h) * h = h²+2h+1-1 . Combining like terms we get m(h)\*h = h²+2h. We see the r.h.s. (right hand side) is a polynomial. So, the l.h.s. must be a polynomial also. We use the Fundamental Theorem of Algebra to uniquely factor the r.h.s. m(h)\*h = h\*(h+2) . The r.h.s. has two roots 0,-2 . The l.h.s. being identical must also. Since the l.h.s. has two roots 0,-2 then the factor m(h) must have root -2. Therefore m(h) = h+2. All of this was a forced choice give all the constraints imposed by the Fundamental Theorem of Algebra.

Now, that we have the slope of all secants m(h) = h+2 , we can plug any h in to find the slope of that secant. When h=0 we have a special secant, which is also a tangent. We plug in h=0. m(0) = 0+2. We get m(0)=2. The slope of the tangent of f(x)=x² at the point x=1 is 2. This is the same answer that is ordinarily gotten with calculus, but we got it with algebra.

The analyst might say hold on. m(h)\*h = h\*(h+2) when h=0 reduces to m(0)\*0=0. This means m(0) could be anything, because anything times 0 is 0.

So what the analyst is saying is that m(h) is (h+2) if h≠0 else 4. This is exactly the case we saw earlier when factoring x²-3x+2. Someone tried to violate the Fundamental Theorem of Algebra claiming (x-1)(x-2) is not the unique factorization of x²-3x+2 because another factor might be (x-1) if x≠5 else 3. We save the Fundamental Theorem of Algebra by disallowing such imaginative answers. The answers are allowed to be just imaginative enough to save the Fundamental Theorem of Algebra, not imaginative enough to destroy it. If we couldn't allow such imaginative solutions that would break the Fundamental Theorem of Algebra earlier, then we can't allow them now. Also, what is to be gained by disallowing such imaginative solutions earlier but allowing them now. The only gain appears to be creating an exception to the Fundamental Theorem of Algebra so that algebra is insufficiently powerful to answers questions in calculus. What kind of gain is this? Create an exception to hobble a theory from giving the correct answer. That is a lose-lose. A lose-lose is worse than a win-win. By keeping the Fundamental Theorem of Algebra intact without exception, we can correctly answer questions that would otherwise require calculus.

## Dependencies

<a href='https://github.com/TonyRipa/Leibniz'>Leibniz</a>
