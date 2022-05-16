
%	Author:		Anthony John Ripa
%	Date:		2022.05.14
%	Fermat:		A Rule System for Constraints


:- ['Leibniz'] .

r( X,FX ,Y,FY)	:- FY <- FX @ X = Y .
r((X,FX),Y,FY)	:- FY <- FX @ X = Y .
