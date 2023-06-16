
// Author:	Anthony John Ripa
// Date:	2023.06.15
// Lisp:	A Constraint Solver


class Lisp {

	static toinfix(lisp) {
		let ret = ''
		switch(math.typeOf(lisp)) {
			case 'number': return lisp
			case 'string': return lisp
			case 'Array' : return lisp.length==2 ? lisp[0] + '(' + lisp[1] + ')' : Lisp.toinfix(lisp[1]) + ' ' + lisp[0] + ' ' + Lisp.toinfix(lisp[2])
		}
		return ret
	}

	static strto(strexp, infer) {
		if (strexp.includes('=')) {
			let [l,r] = strexp.split('=')
			l = mathto(math.parse(l),infer)
			r = mathto(math.parse(r),infer)
			return ['=',l,r]
		} else {
			return mathto(math.parse(strexp),infer)
		}
		function mathto(mathexp, infer) {
			if (mathexp.type=="ConstantNode") {
				return mathexp.value
			} else if (mathexp.type=="SymbolNode") {
				return infer ? [mathexp.name,'Any'] : mathexp.name
			} else if (mathexp.type=="OperatorNode") {
				if (mathexp.op=='-' && mathexp.args.length==1 && mathexp.args[0].type=="ConstantNode")
					return -mathexp.args[0].value
				return [mathexp.op,...mathexp.args.map(x=>mathto(x,infer))]
			} else if (mathexp.type=="FunctionNode") {
				return [mathexp.fn,...mathexp.args.map(x=>mathto(x,infer))]
			}
		}
	}

	static solve(lisp) {
		if (type(lisp) != 'OperatorNode') return lisp
		if (!op(lisp) == '=') return lisp
		let [l,r] = args(lisp)
		if (type(l)=='TypedSymbolNode' && type(r)=='ConstantNode') {
			var [myvar,[mytype]] = opargs(l)
			var ret = value(r)
		} else if (type(l)=='OperatorNode' && type(r)=='ConstantNode') {
			if (op(l)=='+') {
				if (type(args(l)[0])=='SymbolNode' && type(args(l)[1])=='ConstantNode') {
					var [myvar, ret] = [name(args(l)[0]), (value(r)-value(args(l)[1]))]
				}
				if (type(args(l)[0])=='TypedSymbolNode' && type(args(l)[1])=='ConstantNode') {
					var [myvar,[mytype]] = opargs(args(l)[0])
					var ret = value(r) - value(args(l)[1])
				}
			}
			if (op(l)=='*') {
				let [L,R] = args(l)
				if (type(L) == 'SymbolNode' && type(R) == 'ConstantNode') {
					var [myvar, ret] = [name(args(l)[0]), (value(r)/value(args(l)[1]))]
				}
				if ((type(L) == 'TypedSymbolNode' && type(R) == 'ConstantNode') || (type(L) == 'ConstantNode' && type(R) == 'TypedSymbolNode'))  {
					var [con,sym] = (type(L) == 'ConstantNode') ? [L,R] : [R,L]
					var [myvar,[mytype]] = opargs(sym)
					if (mytype == 'Generic') {
						return (math.simplify(myvar + ' * ' + con) == value(r)).toString()
					} else {
						var ret = value(r) / value(con)
					}
				}
				if (type(L) == 'TypedSymbolNode' && type(R) == 'TypedSymbolNode') {
					var [myvar,[mytype]] = opargs(L)
					var [myvar2,[mytype2]] = opargs(R)
					if (mytype == 'Generic' && mytype2 != 'Generic') {
						[myvar,mytype,myvar2,mytype2] = [myvar2,mytype2,myvar,mytype]
					}
					if (mytype != 'Generic' && mytype2 == 'Generic') {
						var ret = math.simplify(value(r) + ' / ' + name(myvar2))
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
		function type(lisp) { return Lisp.type(lisp) }
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
				alert('Error: space = ' + space)
			}
			return '{ ' + solution + ' }'
		}
	}

	static type(lisp) {
		switch(math.typeOf(lisp)) {
			case "number": return "ConstantNode"
			case "string": return "SymbolNode"
			case "Array": return lisp.length==2 && ['IEEE754','Real','Generic','Any'].includes(lisp[1]) ? "TypedSymbolNode" : "OperatorNode"
		}
		alert('type unknown')
	}

}
