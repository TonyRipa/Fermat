
/*
	Author:	Anthony John Ripa
	Date:	2023.11.15
	Lisp:	A Constraint Solver
*/

class Lisp {

	static toinfix(lisp) {
		let ret = ''
		switch(Lisp.type(lisp)) {
			case 'ConstantNode': return lisp.toString()
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

	static simplify(lisp, type) {
		if (Lisp.type(lisp)!='OperatorNode') return lisp
		let op = lisp[0]
		let left = Lisp.simplify(lisp[1], type)
		let right = Lisp.simplify(lisp[2], type)
		if (type == 'Boolean') {
			if (op=='+') return math.max(left,right)
			if (op=='*') return math.min(left,right)
			if (op=='/') {
				if (left==0 && right==0) return 0/0
				return math.simplify(left + '/' + right)
			}
			if (op=='-') {
				if (left==0 && right==0) return 0/1
				if (left==0 && right==1) return 1/0
				if (left==1 && right==0) return 1/1
				if (left==1 && right==1) return 0/0
			}
		}
		return math.simplify(left + op + right)
	}

	static solve(lisp, symboltable) {
		console.log(lisp,symboltable)
		if (type(lisp) != 'OperatorNode') return lisp
		if (op(lisp) != '=') return math.simplify(Lisp.toinfix(lisp)).toString()
		let [l,r] = args(lisp)
		if (ground(l) && !ground(r)) return Lisp.solve(['=',r,l], symboltable)
		if (ground(l) &&  ground(r)) return (math.simplify(Lisp.toinfix(l)).toString() == math.simplify(Lisp.toinfix(r))).toString()
		if ( isvar(l) &&  ground(r)) {
			var myvar = l
			var mytype = symboltable[myvar]
			var ret = Lisp.simplify(r, mytype)
		}
		if (type(l)=='OperatorNode' && ground(r)) {
			let anti = {'+': '-', '*': '/'}[op(l)]
			let [L,R] = args(l)
			if ( ground(L) && !ground(R)) return Lisp.solve(['=',[op(l),R,L],r], symboltable)
			if (!ground(L) &&  ground(R)) {
				var myvar = L
				var mytype = symboltable[myvar]
				var ret = Lisp.simplify([anti, r, R], mytype)
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
			} else if (mytype == 'Boolean') {
				if (math.typeOf(ret)=='OperatorNode') {
					return '{ }'
				} else if (1/ret==0) {
					return '{ }'
				}
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
