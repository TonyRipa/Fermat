
%	Author:		Anthony John Ripa
%	Date:		2020.09.01
%	Fermat:		A Rule System for Constraints


:- ['Leibniz'] .

l(X  , Y) :- var(X) , ground(Y) ,			  X <- Y   , ! .
l(X+C, Y) :- var(X) , ground(Y) , ground(C) , X <- Y-C , ! .
l(C+X, Y) :- var(X) , ground(Y) , ground(C) , X <- Y-C , ! .
l(X*C, Y) :- var(X) , ground(Y) , ground(C) , X <- Y/C , ! .
l(C*X, Y) :- var(X) , ground(Y) , ground(C) , X <- Y/C , ! .

e(X, Y) :- l(X,Y) , ! .
e(X, Y) :- l(Y,X) , ! .
e(X, Y) :- =(X,Y) , ! .
e(X, Y) :- write(X),write(' ≟ '),write(Y) , ! .

:- redefine_system_predicate(=(_,_)) .

=(X,Y) :- e(X,Y).
