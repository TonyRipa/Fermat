
/*
	Author:	Anthony John Ripa
	Date:	2023.09.15
	Lisp:	A Constraint Solver
*/

class Lisp {

	static toinfix(lisp) {
		let ret = ''
		switch(Lisp.type(lisp)) {
			case 'ConstantNode': return lisp
			case 'SymbolNode': return lisp
			case 'OperatorNode' : return '( ' + Lisp.toinfix(lisp[1]) + ' ) ' + lisp[0] + ' ( ' + Lisp.toinfix(lisp[2]) + ' )'
		}
		return ret
	}

	static strto(strexp) {
		if (strexp.includes('=')) {
			let [l,r] = strexp.split('=')
			l = mathto(math.parse(l))
			r = mathto(math.parse(r))
			return ['=',l,r]
		} else {
			return mathto(math.parse(strexp))
		}
		function mathto(mathexp) {
			if (mathexp.type=="ConstantNode") {
				return mathexp.value
			} else if (mathexp.type=="SymbolNode") {
				return mathexp.name
			} else if (mathexp.type=="OperatorNode") {
				if (mathexp.op=='-' && mathexp.args.length==1 && mathexp.args[0].type=="ConstantNode")
					return -mathexp.args[0].value
				return [mathexp.op,...mathexp.args.map(x=>mathto(x))]
			} else if (mathexp.type=="FunctionNode") {
				return [mathexp.fn,...mathexp.args.map(x=>mathto(x))]
			} else if (mathexp.type=="ParenthesisNode") {
				return mathto(mathexp.content)
			}
			alert('Lisp.strto.mathto Error : mathexp = ' + mathexp)
		}
	}

	static solve(lisp,symboltable) {
		console.log(lisp,symboltable)
		if (type(lisp) != 'OperatorNode') return lisp
		if (!op(lisp) == '=') return lisp
		let [l,r] = args(lisp)
		if (type(l)=='OperatorNode' && ground(r)) {
			if (op(l)=='+') {
				if (type(args(l)[0])=='SymbolNode' && type(args(l)[1])=='ConstantNode') {
					var [myvar, ret] = [name(args(l)[0]), (value(r)-value(args(l)[1]))]
					mytype = symboltable[myvar]
				}
			}
			if (op(l)=='*') {
				let [L,R] = args(l)
				if (type(L) == 'SymbolNode' && type(R) == 'ConstantNode') {
					var [con,sym] = (type(L) == 'ConstantNode') ? [L,R] : [R,L]
					var [myvar,[mytype]] = opargs(sym)
					mytype = symboltable[myvar]
					if (mytype == 'Generic') {
						return (math.simplify(myvar + ' * ' + con) == value(r)).toString()
					} else {
						var ret = value(r) / value(con)
					}
				}
				if (type(L) == 'SymbolNode' && type(R) == 'SymbolNode') {
					var [myvar,[mytype]] = opargs(L)
					var [myvar2,[mytype2]] = opargs(R)
					mytype = symboltable[myvar]
					mytype2 = symboltable[myvar2]
					if (mytype == 'Generic' && mytype2 != 'Generic') {
						[myvar,mytype,myvar2,mytype2] = [myvar2,mytype2,myvar,mytype]
					}
					if (mytype != 'Generic' && mytype2 == 'Generic') {
						var ret = math.simplify('( ' + Lisp.toinfix(r) + ') / ' + name(myvar2))
					}
				}
			}
		}
		if (ret == undefined) return Lisp.toinfix(lisp)
		let set = solution_intersect_mytype(ret, mytype)
		return myvar + ' ∈ ' + set
		function value(lisp) { return lisp }
		function name(lisp) { return lisp }
		function opargs(lisp) { return [op(lisp),args(lisp)] }
		function args(lisp) { return lisp.slice(1) }
		function op(lisp) { return lisp[0] }
		function type(lisp) { console.log(lisp); return Lisp.type(lisp) }
		function solution_intersect_mytype(solution, mytype) {
			if (math.typeOf(solution)=='number' && isNaN(solution)) {
				return name(mytype)
			} else if (mytype == 'Real') {
				if (math.typeOf(ret)=='OperatorNode') {
					return '{ }'
				} else if (1/ret==0) {
					return '{ }'
				}
			} else if (mytype == 'IEEE754') {
				if (math.typeOf(ret)=='OperatorNode') {
					return '{ }'
				}
			} else if (mytype == 'Any') {
				//	Accept
			} else {
				alert('Error: mytype = ' + mytype)
			}
			return '{ ' + solution + ' }'
		}
		function compound(lisp) { return type(lisp)=='OperatorNode' }
		function atomic(lisp) { return !compound(lisp) }
		function isvar(lisp) { return type(lisp)=='SymbolNode' && symboltable[lisp]!='Generic' }
		function ground(lisp) { return atomic(lisp) ? !isvar(lisp) : args(lisp).every(ground) }
	}

	static type(lisp) {
		switch(math.typeOf(lisp)) {
			case "number": return "ConstantNode"
			case "string": return "SymbolNode"
			case "Array": return "OperatorNode"
		}
		console.trace()
		alert('type unknown: ' + lisp)
	}

}
