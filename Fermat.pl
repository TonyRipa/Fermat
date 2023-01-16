
%	Author:		Anthony John Ripa
%	Date:		2023.1.15
%	Fermat:		A Rule System for Constraints

:- use_module(library(clpfd)).

simp(V = I)       :- var(V) , integer(I)                , V =  I        , ! .
simp(V + I1 = I2) :- var(V) , integer(I1) , integer(I2) , V is I2 - I1      .
simp(V * 0  = 0)  :- var(V) ,                             V in inf..sup , ! .
simp(_ * 0  = 0)                                                            .
simp(V * 0  = I)  :- var(V) , integer(I)                , V =  I / 0    , ! .
simp(V * I1 = I2) :- var(V) , integer(I1) , integer(I2) , V is I2 / I1      .
