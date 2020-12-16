
%	Author:		Anthony John Ripa
%	Date:		2020.12.15
%	Fermat:		A Rule System for Constraints


:- ['Leibniz'] .

:- redefine_system_predicate(=(_,_)) .

l(X  , Y) :- var(X) , ground(Y) ,             X <- Y   , ! .
l(X+C, Y) :- var(X) , ground(Y) , ground(C) , X <- Y-C , ! .
l(C+X, Y) :- var(X) , ground(Y) , ground(C) , X <- Y-C , ! .
l(X*C, Y) :- var(X) , ground(Y) , ground(C) , X <- Y/C , ! .
l(C*X, Y) :- var(X) , ground(Y) , ground(C) , X <- Y/C , ! .

l(M*X, Y) :- var(X) ,    \+dif(X,Y)         ,(M=1;X=0;X=1/0).
l(X*M, Y) :- var(X) ,    \+dif(X,Y)         ,(M=1;X=0;X=1/0).

l(Y*X,M*X):- var(M) ,    var(X)             ,(Y=M;X=0;X=1/0).

=(X, Y) :- l(X,Y) .
=(X, Y) :- l(Y,X) .
=(X, Y) :- \+l(X,Y) , \+l(Y,X) , =(X,Y) , ! .
=(X, Y) :- \+l(X,Y) , \+l(Y,X) , write(X),write(' ≟ '),write(Y) , ! .
