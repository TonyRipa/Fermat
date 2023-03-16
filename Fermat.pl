
%	Author:		Anthony John Ripa
%	Date:		2023.03.15
%	Fermat:		A Rule System for Constraints

:- use_module(library(clpfd)).

:- redefine_system_predicate(integer(_)) .

integer(X)        :- int(X)                                                          , ! .

int(V)            :- var(V) ,                                   V in inf..sup        , ! .
int(I)            :-          integer(I)                                             , ! .

simp(V = I)       :- var(V) , integer(I)                ,       V =  I               , ! .
simp(V + I1 = I2) :- var(V) , integer(I1) , integer(I2) ,       V is I2 - I1             .
simp(X * 0  = 0)  :- int(X)                                                          , ! .
simp(V * 0  = I)  :- var(V) , integer(I)                ,       V =  I / 0           , ! .
simp(V * I1 = I2) :- var(V) , integer(I1) , integer(I2) , catch(V is I2 / I1,_,fail)     .
