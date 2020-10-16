
%	Author:		Anthony John Ripa
%	Date:		2020.10.15
%	Fermat:		A Rule System for Constraints


:- ['Leibniz'] .

:- redefine_system_predicate(=(_,_)) .

=(X  , Y) :- var(X) , ground(Y) ,			  X <- Y   , ! .
=(Y  , X) :- var(X) , ground(Y) ,			  X <- Y   , ! .
=(X+C, Y) :- var(X) , ground(Y) , ground(C) , X <- Y-C , ! .
=(Y, X+C) :- var(X) , ground(Y) , ground(C) , X <- Y-C , ! .
=(C+X, Y) :- var(X) , ground(Y) , ground(C) , X <- Y-C , ! .
=(Y, C+X) :- var(X) , ground(Y) , ground(C) , X <- Y-C , ! .
=(_*X,M*X):- var(M) ,    var(X)             , X =  0       .
=(Y*X,M*X):- var(M) ,    var(X)             , M =  Y   , ! .
=(M*X,_*X):- var(M) ,    var(X)             , X =  0       .
=(M*X,Y*X):- var(M) ,    var(X)             , M =  Y   , ! .
=(X*C, Y) :- var(X) , ground(Y) , ground(C) , X <- Y/C , ! .
=(Y, X*C) :- var(X) , ground(Y) , ground(C) , X <- Y/C , ! .
=(C*X, Y) :- var(X) , ground(Y) , ground(C) , X <- Y/C , ! .
=(Y, C*X) :- var(X) , ground(Y) , ground(C) , X <- Y/C , ! .

=(X, Y) :- =(X,Y) , ! .
=(X, Y) :- write(X),write(' ≟ '),write(Y) , ! .
