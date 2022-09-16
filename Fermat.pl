
%	Author:		Anthony John Ripa
%	Date:		2022.09.15
%	Fermat:		A Rule System for Constraints


:- ['Leibniz'] .

r( X,FX ,Y,FY)	:- FY <- FX @ X = Y .
r( X,FX ,Y,FY)	:- var(Y) , Y <- X@FX=FY .
r((X,FX),Y,FY)	:- FY <- FX @ X = Y .
r(FX,(X,Y),FY)	:- FY <- FX @ X = Y .

simp(r(X,FX,Y,FY),true       ) :- r(X, FX, Y, FY   ) .

simp(r(X,FX,Y,?) ,r(A,B,C,?) ) :- r(X, FX, Y, B@A=C) , ! .
simp(r(X,FX,Y,?) ,FY         ) :- r(X, FX, Y, FY   )     .

simp(r(X,FX,?,FY),r(A,B,?,C) ) :- r(X, FX, Y, FY   ) , Y = (A@B=C) , ! .
simp(r(X,FX,?,FY),Y          ) :- r(X, FX, Y, FY   )     .
