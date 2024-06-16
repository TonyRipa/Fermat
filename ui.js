
/*
	Author:	Anthony John Ripa
	Date:	6/15/2024
	UI:	A user interface library
*/

class ui {

	static makenet() {
		$('#net').empty()
		let net = $('#netstr').val()
		let ids = ui.net2ids(net)
		let dag = ui.str2dag(net)
		let fs = []
		for (let i = 0 ; i < ids.length ; i++) {
			fs.push(...ui.makes(dag,ids[i]))
			ui.makebrs()
		}
		ui.makego(fs)
	}

	static net2ids(str) {
		let ids = []
		let nodes = str2nodes(str)
		let graph = ui.str2dag(str)
		if (nodes.length < 2) return nodes
		while (nodes.length > 1) {
			let nodeskids = nodes.map(node=>graph.kid[node])
			let node
			for (let i = 0; i < nodes.length ; i++) {
				if (nodeskids[i]==undefined || nodeskids[i].length==0) {
					node = nodes[i]
					ids.unshift(node)
					nodes = nodes.filter(n=>n!=node)
					let pars = graph.par[node]
					if (pars != undefined) pars.map(function(par){graph.kid[par]=graph.kid[par].filter(k=>k!=node)})
				}
			}
		}
		ids = [...nodes,...ids]
		return ids
		function str2nodes(str) {
			let paths = str.split(';')
			paths.reverse()
			let nodes = paths.map(path=>path.split('→')).flat()
			return [...new Set(nodes)]
		}
	}

	static str2dag(str) {
		let par = {}
		let kid = {}
		let edges = str.split(';')
		for (let edge of edges) {
			let ids = edge.split('→')
			for (let i = 0 ; i < ids.length ; i++) {
				if (i != 0) {
					if (par[ids[i]] == undefined) par[ids[i]] = [ids[i-1]]
					else {par[ids[i]].push([ids[i-1]])}
				}
				if (i != ids.length-1) {
					if (kid[ids[i]] == undefined) kid[ids[i]] = [ids[i+1]]
					else kid[ids[i]].push([ids[i-1]])
				}
			}
		}
		return {par,kid}
	}

	static makes(ids,me) {
		return me.split(',').map(id=>ui.make(ids,id))
	}

	static make(ids,id) {
		switch(id) {
			case 'input': return ui.makeinput(ids,id)
			case 'inputbig': return ui.makeinputbig(ids,id)
			case 'filter': return ui.makefilter(ids,id)
			case 'plot': return ui.makeplot(ids,id)
			case 'plot2': return ui.makeplot2(ids,id)
			case 'plot23': return ui.makeplot23(ids,id)
			case 'plot2layer': return ui.makeplot2layer(ids,id)
			case 'plots': return ui.makeplots(ids,id)
			case 'trigpoly': return ui.makef(ids,id,Newton.trig2poly)
			case 'polytrig': return ui.makef(ids,id,Newton.poly2trig)
			case 'gf': return ui.makef(ids,id,Newton.gf)
			case 'igf': return ui.makef(ids,id,Newton.igf)
			case 'egf': return ui.makef(ids,id,Newton.egf)
			case 'iegf': return ui.makef(ids,id,Newton.iegf)
			case 'solve': return ui.makef(ids,id,Lisp.solve)
			case 'prob2oddstable': return ui.makeprob2oddstable(ids,id)
			case 'oddschain2oddstable': return ui.makeoddschain2oddstable(ids,id)
			case 'sample': return ui.makef(ids,id,Newton.sample)
			case 'regress': return ui.makef(ids,id,Newton.regress)
			case 'probdata': return ui.makeinput(ids,id,Data.prob())
			case 'oddsdata': return ui.makeinput(ids,id,Data.odds())
			case 'econdata': return ui.makeinputbig(ids,id,Data.econ())
			case 'econ0data': return ui.makeinputbig(ids,id,Data.econ0())
			case 'exprdata': return ui.makeselect(ids,id,Data.expr())
			case 'eqndata': return ui.makeselect(ids,id,Data.eqn())
			case 'symdata': return ui.makeselect(ids,id,Data.sym())
			case 'wagedata': return ui.makeinputbig(ids,id,Data.wage())
			case 'agedata': return ui.makeinputbig(ids,id,Data.age())
			case 'hiredata': return ui.makeinputbig(ids,id,Data.hire())
			case 'killdata': return ui.makeinputbig(ids,id,Data.kill())
			case 'gapdata': return ui.makeinputbig(ids,id,Data.gap())
		}
		alert(`ui.make() : id ${id} not found`)
	}

	static makebr() { $('#net').append(`<br>`) }
	static makebrs() { $('#net').append(`<br><br>`) }

	static me2parkid(ids,me) {
		let par = ids.par[me]
		let kid = ids.kid[me]
		par = par?.join()
		kid = kid?.join()
		return {par,kid}
	}

	static makeinputbig(ids,me,data) {
		let {par,kid} = ui.me2parkid(ids,me)
		$('#net').append(`<textarea id='${me}' cols='180' rows='7'>${data}</textarea>`)
		return ()=>{}
	}

	static makeselect(ids,me,data) {
		let {par,kid} = ui.me2parkid(ids,me)
		$('#net').append(`<select id='${me}' onchange="putval('${kid}',$(this).val())">`+data.map(d=>'<option>'+d+'</option>')+`</select>`)
		return ()=>{}
	}

	static makeinput(ids,me,data='') {
		let {par,kid} = ui.me2parkid(ids,me)
		$('#net').append(`<input id='${me}' value='${data}' placeholder='${me}'>`)
		return ()=>{}
	}

	static makefilter(ids,me) {
		let {par,kid} = ui.me2parkid(ids,me)
		$('#net').append(`<textarea id='${me}' cols='50' rows='7' placeholder='${me}'></textarea>`)
		return ()=>set_textarea(me,Stats.p(get_input(par.split(',')[0]),id2array(par.split(',')[1])))
	}

	static makeoddschain2oddstable(ids,me) {
		let {par,kid} = ui.me2parkid(ids,me)
		$('#net').append(`<textarea id='${me}' cols='50' rows='10' placeholder='${me}'></textarea>`)
		return ()=>{
			let r = id2array(par,',')[0]
			let ret = Stats.oddschain2oddstable(r)
			set_textarea(me,ret)
		}
	}

	static makeprob2oddstable(ids,me) {
		let {par,kid} = ui.me2parkid(ids,me)
		$('#net').append(`<textarea id='${me}' cols='30' rows='10' placeholder='${me}'></textarea>`)
		return ()=>{
			let ret = ''
			let p = id2array(par,',')[0]
			for (let i = 0 ; i < p.length ; i++) {
				for (let j = 0 ; j < p.length ; j++) {
					let odds = p[i] / p[j]
					if (isNaN(odds)) odds =  '%'
					if (odds == 1/0) odds =  '∞'
					if (odds ==-1/0) odds = '-∞'
					ret += odds
					if (j<p.length-1) ret += '\t'
				}
				if (i<p.length-1) ret += '\n'
			}
			set_textarea(me,ret)
		}
	}

	static makeplot(ids,me) {
		let {par,kid} = ui.me2parkid(ids,me)
		$('#net').append(`<div id='${me}' style='border:thin solid black;width:100px;height:50px;color:#999'>${me}</div>`)
		return () => {
			let results = id2array(par,',').map(row=>[row.slice(0,row.length-1),row.slice(-1)[0]])
			if (Array.isArray(results)) {
				$('#'+me).empty()
				$('#'+me).removeAttr('style')
				if (results[0][0].length==1) Plot.factory(results).plot1 (me)
				if (results[0][0].length==2) Plot.factory(results).table2(me)
				if (results[0][0].length==3) Plot.factory(results).table3(me)
			}			
		}
	}

	static makeplots(ids,me) {
		let {par,kid} = ui.me2parkid(ids,me)
		$('#net').append(`<div id='${me}' style='border:thin solid black;width:100px;height:50px;color:#999'>${me}</div>`)
		return () => {
			let results = id2array(par,',').map(row=>[row.slice(0,row.length-1),row.slice(-1)[0]])
			let results1 = results.map(row=>[[row[0][0]],row[1]])
			let results2 = results.map(row=>[[row[0][1]],row[1]])
			console.log(results)
			console.log(results1)
			console.log(results2)
			if (Array.isArray(results)) {
				$('#'+me).empty()
				$('#'+me).removeAttr('style')
				$('#'+me).append(`<table><tr><td id='${me}1' width='500px'></td><td id='${me}2' width='500px'></td></tr></table>`)
				Plot.factory(results1).plot1(me+1)
				Plot.factory(results2).plot1(me+2)
			}			
		}
	}

	static makeplot2(ids,me) {
		let {par,kid} = ui.me2parkid(ids,me)
		$('#net').append(`<div id='${me}' style='border:thin solid black;width:100px;height:50px;color:#999'>${me}</div>`)
		return () => {
			let results = id2array(par,',').map(row=>[row.slice(0,row.length-1),row.slice(-1)[0]])
			let results1 = results.map(row=>[[row[0][0]],row[1]])
			let results2 = results.map(row=>[[row[0][1]],row[1]])
			if (Array.isArray(results)) {
				$('#'+me).empty()
				$('#'+me).removeAttr('style')
				$('#'+me).append(`<table><tr><td id='${me}1' width='500px'></td><td id='${me}2' width='500px'></td><td id='${me}3' width='500px'></td></tr></table>`)
				Plot.factory(results1).plot1(me+1)
				Plot.factory(results ).plot2(me+2)
				Plot.factory(results2).plot1(me+3)
			}			
		}
	}

	static makeplot23(ids,me) {
		let {par,kid} = ui.me2parkid(ids,me)
		$('#net').append(`<div id='${me}' style='border:thin solid black;width:100px;height:50px;color:#999'>${me}</div>`)
		return () => {
			let results = id2array(par,',').map(row=>[row.slice(0,row.length-1),row.slice(-1)[0]])
			let results1 = results.map(row=>[[row[0][0]],row[1]])
			let results2 = results.map(row=>[[row[0][1]],row[1]])
			if (Array.isArray(results)) {
				$('#'+me).empty()
				$('#'+me).removeAttr('style')
				$('#'+me).append(`<table><tr><td id='${me}1' width='500px'></td><td id='${me}2' width='500px'></td><td id='${me}3' width='500px'></td></tr></table>`)
				Plot.factory(results1).plot1(me+1)
				Plot.factory(results ).plot23(me+2)
				Plot.factory(results2).plot1(me+3)
			}			
		}
	}

	static makeplot2layer(ids,me) {
		let {par,kid} = ui.me2parkid(ids,me)
		$('#net').append(`<div id='${me}' style='border:thin solid black;width:100px;height:50px;color:#999'>${me}</div>`)
		return () => {
			let results = id2array(par,',').map(row=>[row.slice(0,row.length-1),row.slice(-1)[0]])
			let results1 = results.map(row=>[[row[0][0]],row[1]])
			let results2 = results.map(row=>[[row[0][1]],row[1]])
			if (Array.isArray(results)) {
				$('#'+me).empty()
				$('#'+me).removeAttr('style')
				$('#'+me).append(`<table><tr><td id='${me}1' width='500px'></td><td id='${me}2' width='500px'></td><td id='${me}3' width='500px'></td></tr></table>`)
				// Plot.factory(results1).plot1(me+1)
				Plot.factory(results ).plot2layer(me+2)
				// Plot.factory(results2).plot1(me+3)
			}			
		}
	}

	static makef(ids,me,f) {
		let {par,kid} = ui.me2parkid(ids,me)
		$('#net').append(`<textarea id='${me}' placeholder='${me}'></textarea>`)
		return ()=>$('#'+me).text(f($('#'+par).val()))
	}

	static makego(fs) {
		let id = math.randomInt(1,9999)
		$('#net').prepend(`<button id='${id}'>Go</button>`)
		$('#'+id).on('click',()=>{fs.map(f=>f())})
	}

}
