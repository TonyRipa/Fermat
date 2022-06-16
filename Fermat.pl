
%	Author:		Anthony John Ripa
%	Date:		2022.06.15
%	Fermat:		A Rule System for Constraints


:- ['Leibniz'] .

r( X,FX ,Y,FY)	:- FY <- FX @ X = Y .
r((X,FX),Y,FY)	:- FY <- FX @ X = Y .
r(FX,(X,Y),FY)	:- FY <- FX @ X = Y .
