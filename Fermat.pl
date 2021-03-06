
%	Author:		Anthony John Ripa
%	Date:		2021.07.15
%	Fermat:		A Rule System for Constraints


:- ['Leibniz'] .

elem('0',0).
elem('1',1).
elem('+',+).
elem('*',*).
elem('(','(').
elem(')',')').
elem(X,X) :- is_alpha(X) .

simps(InputString,Result) :- atom_chars(InputString,Atoms) , map(elem,Atoms,Terms) , simp(Terms,Result) .

simp(Input,Result) :- Stack=[] , sim(Input,Stack,Result) .

op(*).
op(+).

arg(X) :- number(X)  , ! .
arg(X) :- atom(X), is_alpha(X), ! .
arg(X) :- compound(X), ! .

args(N1,N2) :- arg(N1) , arg(N2) .

sim(I,S,R) :- I=[     ]                                                             ,       =(S,R) .	%	Halt

sim(I,S,R) :- I=[N1|IT]  , arg(N1) ,  not(S=[+|_])     , not(S=[*|_])  , S2=[N1|S]  , sim(IT,S2,R) .	%	Push Num
sim(I,S,R) :- I=[O1|IT]  , op(O1)  ,  not((S=[N1,N2|_] , args(N1,N2))) , S2=[O1|S]  , sim(IT,S2,R) .	%	Push Op

sim(I,S,R) :- I=['('|IT], S2=['('|S]                                                , sim(IT,S2,R) .	%	Push (
sim(I,S,R) :- I=[')'|IT], S=[S1|ST]      , I2=[S1|IT]                  , ST=['('|S2], sim(I2,S2,R) .	%	Pop (

sim(I,S,R) :- I=[+ |IT] , S = [N1,N2|ST] , args(N1,N2) , N3 <- N2 + N1 , S2=[N3|ST] , sim(IT,S2,R) .	%	Add
sim(I,S,R) :- I=[N3|IT] , S = [ +,N2|ST] , args(N3,N2) , N1 <- N3 - N2 , S2=[N1|ST] , sim(IT,S2,R) .	%	Sub
sim(I,S,R) :- I=[* |IT] , S = [N1,N2|ST] , args(N1,N2) , N3 <- N2 * N1 , S2=[N3|ST] , sim(IT,S2,R) .	%	Mul
sim(I,S,R) :- I=[N3|IT] , S = [ *,N2|ST] , args(N3,N2) , N1 <- N3 / N2 , S2=[N1|ST] , sim(IT,S2,R) .	%	Div
