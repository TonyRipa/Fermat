
// Author:	Anthony John Ripa
// Date:	2023.05.15
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
				return infer ? [mathexp.name,'IEEE754'] : mathexp.name
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
				if (type(args(l)[0])=='SymbolNode' && type(args(l)[1])=='ConstantNode') {
					var [myvar, ret] = [name(args(l)[0]), (value(r)/value(args(l)[1]))]
				}
				if (type(args(l)[0])=='TypedSymbolNode' && type(args(l)[1])=='ConstantNode') {
					var [myvar,[mytype]] = opargs(args(l)[0])
					var ret = value(r) / value(args(l)[1])
				}
			}
		}
		if (ret == undefined) return Lisp.toinfix(lisp)
		if (isNaN(ret)) ret = name(mytype)
		else if (name(mytype) == 'Real') {
			if (1/ret==0) ret = '{ }'
		}
		if (math.typeOf(ret) != 'string') ret = '{ ' + ret + ' }'
		return myvar + ' ∈ ' + ret
		function value(lisp) { return lisp }
		function name(lisp) { return lisp }
		function opargs(lisp) { return [op(lisp),args(lisp)] }
		function args(lisp) { return lisp.slice(1) }
		function op(lisp) { return lisp[0] }
		function type(lisp) { return Lisp.type(lisp) }
	}

	static type(lisp) {
		switch(math.typeOf(lisp)) {
			case "number": return "ConstantNode"
			case "string": return "SymbolNode"
			case "Array": return lisp.length==2 && ['IEEE754','Real'].includes(lisp[1]) ? "TypedSymbolNode" : "OperatorNode"
		}
		alert('type unknown')
	}

}
