
%	Author:		Anthony John Ripa
%	Date:		2022.12.15
%	Fermat:		A Rule System for Constraints

:- module(fermat, [simp/1]).

simp(V = I)       :- var(V) , integer(I)                , V =  I                     , ! .
simp(V + I1 = I2) :- var(V) , integer(I1) , integer(I2) , V is I2 - I1                   .
simp(V * 0  = 0)  :- var(V) ,                             put_attr(V,fermat,integer) , ! .
simp(V * 0  = I)  :- var(V) , integer(I)                , V =  I / 0                 , ! .
simp(V * I1 = I2) :- var(V) , integer(I1) , integer(I2) , V is I2 / I1                   .

attribute_goals(X, [X is Domain], []) :- get_attr(X, fermat, Domain)                     .
