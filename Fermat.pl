
%	Author:		Anthony John Ripa
%	Date:		2022.01.14
%	Fermat:		A Rule System for Constraints


:- ['Leibniz'] .

elem('+',+).
elem('*',*).
elem('^',^).
elem('↦',↦).
elem('(','(').
elem(')',')').
elem(' ',' ').
elem(X,X) :- is_alpha(X) .
elem(X,Y) :- atom_number(X,Y) .

simps(InputString,Result) :- atom_chars(InputString,Atoms) , map(elem,Atoms,Terms) , simp(Terms,Result) .

simp(Input,Result) :- Stack=[] , sim(Input,Stack,Result) .

op(*).
op(+).
op(^).
op(↦).

arg(X) :- number(X)  , ! .
arg(X) :- atom(X), is_alpha(X), ! .
arg(X) :- compound(X), ! .

args(N1,N2) :- arg(N1) , arg(N2) .

nums(N1,N2) :- number(N1) , number(N2) .

nth(N,I,Root) :- nth_integer_root_and_remainder(N,I,Root,_).

lg(Base,I,Power) :- log(I,LogI), log(Base,LogBase) , Power is round(LogI/LogBase) .

div(N,D,Q) :- not(D=0) , divmod(N,D,Q,0).	%	+2022.01

sim(I,S,R) :- I=[     ]                                                             ,       =(S,R) .	%	Halt

sim(I,S,R) :- I=[' '|IT] ,												 S2=[' '|S] , sim(IT,S2,R) .	%	Push Spc
sim(I,S,R) :- I=[N1|IT]  , arg(N1) ,  not((S=[H|_]     ,   op(H)    )) , S2=[N1|S]  , sim(IT,S2,R) .	%	Push Num
sim(I,S,R) :- I=[O1|IT]  , op(O1)  ,  not((S=[N1,N2|_] , args(N1,N2))) , S2=[O1|S]  , sim(IT,S2,R) .	%	Push Op

sim(I,S,R) :- I=['('|IT], S2=['('|S]                                                , sim(IT,S2,R) .	%	Push (
sim(I,S,R) :- I=[')'|IT], S=[S1|ST]      , I2=[S1|IT]                  , ST=['('|S2], sim(I2,S2,R) .	%	Pop (

sim(I,S,R) :- I=[+ |IT] , S = [N2,N1|ST] , args(N1,N2) , N3 <- N1 + N2 , S2=[N3|ST] , sim(IT,S2,R) .	%	Add
sim(I,S,R) :- I=[N3|IT] , S = [ +,N2|ST] , args(N3,N2) , N1 <- N3 - N2 , S2=[N1|ST] , sim(IT,S2,R) .	%	Sub
sim(I,S,R) :- I=[* |IT] , S = [N2,N1|ST] , args(N1,N2) , N3 <- N1 * N2 , S2=[N3|ST] , sim(IT,S2,R) .	%	Mul
sim(I,S,R) :- I=[N3|IT] , S = [ *,N2|ST] , nums(N3,N2) , div(N3,N2,N1) , S2=[N1|ST] , sim(IT,S2,R),!.	%	Div
sim(I,S,R) :- I=[N3|IT] , S = [ *,N2|ST] , args(N3,N2) , N1 <- N3 / N2 , S2=[N1|ST] , sim(IT,S2,R) .	%	Div
sim(I,S,R) :- I=[^ |IT] , S = [N2,N1|ST] , nums(N2,N1) , pow(N1,N2,N3) , S2=[N3|ST] , sim(IT,S2,R),!.	%	Pow	%	+2022.01
sim(I,S,R) :- I=[^ |IT] , S = [N2,N1|ST] , args(N2,N1) , N3 <- N1 ^ N2 , S2=[N3|ST] , sim(IT,S2,R) .	%	Pow
sim(I,S,R) :- I=[N3|IT] , S = [ ^,N2|ST] , nums(N3,N2) , nth(N2,N3,N1) , S2=[N1|ST] , sim(IT,S2,R) .	%	Rot
sim(I,S,R) :- I=[N3|IT] , S=[^,' ',N2|ST], nums(N3,N2) ,  lg(N2,N3,N1) , S2=[N1|ST] , sim(IT,S2,R) .	%	Log
sim(I,S,R) :- I=[↦ |IT] , S = [N2,N1|ST] , args(N1,N2) , N3 <- N1 = N2 , S2=[N3|ST] , sim(IT,S2,R) .	%	Eva
sim(I,S,R) :- I=[N3|IT] , S = [ ↦,N2|ST] , args(N3,N2) , N1 <- N3 @ N2 , S2=[N1|ST] , sim(IT,S2,R) .	%	Fun
