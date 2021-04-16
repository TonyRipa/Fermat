
%	Author:		Anthony John Ripa
%	Date:		2021.04.15
%	Fermat:		A Rule System for Constraints


:- ['Leibniz'] .

eval(X@X=Y  , _ ,  X ) :- show(('ev',X@ X =Y)) , 0/0 <- Y                          , ! .
eval(X@C*X=Y, _ , Ans) :- show(('ev',X@C*X=Y)) ,   R <- Y/C , eval(X@X=R, _ , Ans) , ! .
eval(X@X*C=Y, _ , Ans) :- show(('ev',X@X*C=Y)) ,   R <- Y/C , eval(X@X=R, _ , Ans) , ! .
eval(X@Z*C=Y, _ , Ans) :- show(('ev',X@Z*C=Y)) ,   R <- Y/C , eval(X@Z=R, _ , Ans) , ! .
eval(X@C*Z=Y, _ , Ans) :- show(('ev',X@C*Z=Y)) ,   R <- Y/C , eval(X@Z=R, _ , Ans) , ! .

eval(A@X=Y,N,E):- show(('ev',A@X=Y)) , if(is0(Y),norder(exp(X),N,R),R=exp(Y)) , replace(exp(X),R,A,B), go(B,C) , replace(X,Y,C,D) , go(D,E) , succ(('ev',E)) , ! .
