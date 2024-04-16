
/*
	Author:	Anthony John Ripa
	Date:	4/15/2024
	Stats:	A statistics library
*/

class Stats {

	static p(query,data) {
		let [colindex,condition] = query.split('|')
		if (condition == undefined) {
			return Stats.pcol(colindex,data)
		} else if (condition?.includes('=')) {
			let [conditioncolindex,conditioncolvalue] = condition.split('=')
			data = Stats.filter(data,[conditioncolindex])[conditioncolvalue]
			return Stats.pcol(colindex,data)
		} else {
			return Stats.pcols(data,condition,colindex).sort((r1,r2)=>isNaN(r1[1])?+1:isNaN(r2[1])?-1:r2[1]-r1[1]).map(xy=>[JSON.parse(xy[0]),xy[1]])
		}
	}
	static pcol(colindex,data) {
		let s = 0;
		let count = 0
		for (let r = 0 ; r < data.length ; r++ ) {
			let row = data[r]
			s += Number(row[colindex])
			count += Number(row[0])
		}
		return s / count
	}
	static pcols(data,condition,output_index) {
		let colindexes = condition.split(',').map(Number)
		let filtered = Stats.filter(data,colindexes)
		let valsi = colindexes.map(colindex=>colvals(data,colindex))
		let cp = cartesianProductOf(...valsi)
		let groups = cp.map(val=>Stats.pcol(output_index,filtered[JSON.stringify(val)]))
		return math.transpose([cp.map(JSON.stringify),groups])
	}
	static filter(data,colindexes) {
		if (!colindexes) return data
		let valsi = colindexes.map(colindex=>colvals(data,colindex))
		let cp = cartesianProductOf(...valsi)
		let ret = {}
		for (let val of cp)
			ret[JSON.stringify(val)] = []
		for (let r = 0 ; r < data.length ; r++ ) {
			let row = data[r]
			let val = '[' + colindexes.map(colindex=>quoteifmust(row[colindex])).join(',') + ']'
			ret[val].push(row)
		}
		return ret
	}
	static average(list) {
		let unit = list.every(e=>e.endsWith('‰')) ? '‰' : ''
		if (unit=='‰') list = list.map(e=>e.slice(0,-1))
		let mean = math.mean(list)
		mean = math.round(mean,2)
		return mean + unit
	}
	static oddschain2oddstable(r) {
		let ret = ''
		for (let i = 0 ; i <= r.length ; i++) {
			for (let j = 0 ; j <= r.length ; j++) {
				let odds
				if (i==j) {
					odds = 1
				} else if (i==j-1) {
					odds = r[i]
				} else if (i==j-2) {
					odds = r[i]*r[i+1]
				} else if (i==j-3) {
					odds = r[i]*r[i+1]*r[i+2]
				} else if (i==j+1) {
					odds = 1/r[j]
				} else if (i==j+2) {
					odds = 1/(r[j]*r[j+1])
				} else if (i==j+3) {
					odds = 1/(r[j]*r[j+1]*r[j+2])
				}
				odds = isNaN(odds) ? '%' : odds
				odds = odds==1/0 ? '∞' : odds
				odds = odds==-1/0 ? '-∞' : odds
				ret += odds
				if (j<r.length) ret += '\t'
			}
			if (i<r.length) ret += '\n'
		}
		return ret
	}

}
