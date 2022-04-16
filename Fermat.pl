
%	Author:		Anthony John Ripa
%	Date:		2022.04.15
%	Fermat:		A Rule System for Constraints


:- ['Leibniz'] .

r(X,FX,Y,FY) :- FY <- FX @ X = Y .
