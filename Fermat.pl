
%	Author:		Anthony John Ripa
%	Date:		2021.06.15
%	Fermat:		A Rule System for Constraints


:- ['Leibniz'] .

op(*).
op(+).

elem('0',0).
elem('1',1).
elem('+',+).
elem('*',*).
elem('(','(').
elem(')',')').

simps(InputString,Result) :- atom_chars(InputString,Atoms) , map(elem,Atoms,Terms) , simp(Terms,Result) .

simp(Input,Result) :- OperatorStack=[] , ValueStack=[] , sim(Input,OperatorStack,ValueStack,Result) . 

sim(I,O,V,R) :- I=[     ] , O=[]                                                    ,         =(V,R) .	%	Halt

sim(I,O,V,R) :- I=[N1|IT] , number(N1),                  not(O=[+|_])  , V2=[N1|V]  , sim(IT,O,V2,R) .	%	Push Num
sim(I,O,V,R) :- I=[O1|IT] , op(O1)    , not(V=[_,_|_]) , O2 = [O1|O]                , sim(IT,O2,V,R) .	%	Push Op

sim(I,O,V,R) :- I=['('|IT], O2=['('|O]                                              , sim(IT,O2,V,R) .	%	Push (
sim(I,O,V,R) :- I=[')'|IT], O=['('|O2], V=[V1|V2]      , I2=[V1|IT]                 , sim(I2,O2,V2,R).	%	Pop (

sim(I,O,V,R) :- I=[+ |IT]             , V = [N1,N2|VT] , N3 <- N1 + N2 , V2=[N3|VT] , sim(IT,O,V2,R) .	%	Add
sim(I,O,V,R) :- I=[N3|IT] , O=[+|O2]  , V = [N2|V2]    , N1 <- N3 - N2 , V3=[N1|V2] , sim(IT,O2,V3,R).	%	Sub
sim(I,O,V,R) :- I=[* |IT]             , V = [N1,N2|VT] , N3 <- N1 * N2 , V2=[N3|VT] , sim(IT,O,V2,R) .	%	Mul
sim(I,O,V,R) :- I=[N3|IT] , O=[*|O2]  , V = [N2|V2]    , N1 <- N3 / N2 , V3=[N1|V2] , sim(IT,O2,V3,R).	%	Div
