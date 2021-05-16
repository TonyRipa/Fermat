
%	Author:		Anthony John Ripa
%	Date:		2021.05.15
%	Fermat:		A Rule System for Constraints


:- ['Leibniz'] .

simps(InputString,Output) :- atom_chars(InputString,Atoms) , map(atom_string,Atoms,Strings) , map(string_term,Strings,Terms) , simp(Terms,Output) .

simp(Input,Output) :- Stack=[] , sim(Input,Stack,Output) . 

sim(I,S,O) :- I=[     ]                                                               ,       =(S,O) .	%	Halt
sim(I,S,O) :- I=[I1  |IT] , not(op(I1))                                  , S2=[I1|S]  , sim(IT,S2,O) .	%	Push Num
sim(I,S,O) :- I=[+   |IT]               , S = [N1,N2|ST] , N3 <- N1 + N2 , S2=[N3|ST] , sim(IT,S2,O) .	%	Add
sim(I,S,O) :- I=[+,N3|IT] , not(op(N3)) , S = [   N2|[]] , N1 <- N3 - N2 , S2=[N1]    , sim(IT,S2,O) .	%	Sub
sim(I,S,O) :- I=[*   |IT]               , S = [N1,N2|ST] , N3 <- N1 * N2 , S2=[N3|ST] , sim(IT,S2,O) .	%	Mul
sim(I,S,O) :- I=[*,N3|IT] , not(op(N3)) , S = [   N2|[]] , N1 <- N3 / N2 , S2=[N1]    , sim(IT,S2,O) .	%	Div

op(*).
op(+).

string_term(S,T) :- term_string(T,S) .
