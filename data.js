
/*
	Author:	Anthony John Ripa
	Date:	6/15/2024
	Data:	A data library
*/

class Data {

	static get(x) {
		switch (x) {
			case 'probdata': return Data.prob()
			case 'oddsdata': return Data.odds()
			case 'econdata': return Data.econ()
			case 'econ0data': return Data.econ0()
			case 'exprdata': return Data.expr()
			case 'eqndata' : return Data.eqn()
			case 'symdata' : return Data.sym()
			case 'wagedata': return Data.wage()
			case 'agedata' : return Data.age()
			case 'hiredata': return Data.hire()
			case 'killdata': return Data.kill()
			case 'gapdata': return Data.gap()
		}
	}

	static expr() {
		return [0,1,2,12/8,'x','x*x','x/x','(x^2-1)/(x-1)','(x-1)/(x^2-1)','2+h','(2+h)^2','(2+h)^2-2^2','((2+h)^2-2^2)/h','((2+h)^2-2^2)/h|0','exp(x)','exp(2x)','sin(x)','sin(3x)','cos(x)','cos(4x)','sinh(x)','sinh(5x)','cosh(x)','cosh(6x)']
	}

	static eqn() {
		return ['X=0','X=1','X+0=0','X+0=1','X+1=0','X+1=1','X*0=0','X*0=1','X*1=0','X*1=1','X*2=1','M*h=(2*x+h)*h','h*M=(2*x+h)*h','X=e-e','Y=2*3','Y=x*3',              '0*1=0','0*X=0','(2*x+h)*h=M*h',                                        'X=2*X','X=X*2','X*2=X','2*X=X',        'X=X',              'Y*X=1']
	}

	static eqn2() {
		return ['X=0','X=1','X+0=0','X+0=1','X+1=0','X+1=1','X*0=0','X*0=1','X*1=0','X*1=1','X*2=1','M*h=(2*x+h)*h','h*M=(2*x+h)*h','X=e-e','Y=2*3','Y=x*3','X*y*g=y*3*g','0*1=0','0*X=0','(2*x+h)*h=M*h','(2*x+H)*H=M*H','M*H=(2*x+H)*H','Y=X*3','X=2*X','X=X*2','X*2=X','2*X=X','X=Y*X','X=X','Y=(2*x+H)*H','Y*X=1']
	}

	static prob() {
		return '.5,.5,0,0'
	}

	static odds() {
		return '1,0,.5'
	}

	static age() {
		return `Age,Population %,Congress %
<65,83,46
>=65,17,54
`
	}

	static gap0() {
		return `Sex,Source,Pay
F,https://www.forbes.com/sites/elissasangster/2021/03/24/the-pay-gap-is-real-dont-let-anyone-convince-you-otherwise/,.81
F,https://blog.soroptimist.org/blog/equal-pay-day-what-is-the-gender-gap,.83
F,https://blog.dol.gov/2023/03/14/5-fast-facts-the-gender-wage-gap,.837
F,https://www.statista.com/chart/13182/where-the-gender-pay-gap-is-widest/,.831
F,https://www.vantagecircle.com/en/blog/gender-pay-gap/,.74
F,https://thehill.com/changing-america/respect/equality/3878062-the-gender-pay-gap-has-stayed-largely-unchanged-for-20-years-what-will-it-take-to-close-it/,.82
F,https://www.cnbc.com/2023/03/14/the-wage-gap-gets-worse-when-women-hit-their-30s-heres-why.html,.84
F,https://hbr.org/2019/11/how-to-close-the-gender-pay-gap-in-u-s-medicine,.75
F,https://www.aauw.org/resources/research/simple-truth/,.84
F,https://blog.dol.gov/2024/03/12/what-you-need-to-know-about-the-gender-wage-gap,.84
F,https://i4di.org/pubs/gender-pay-gap-in-the-united-states/,.92
F,https://www.wosu.org/npr-news/npr-news/2023-03-14/its-equal-pay-day-the-gender-pay-gap-has-hardly-budged-in-20-years-what-gives,.82
F,https://www.businessinsider.com/gender-wage-pay-gap-charts-2017-3,.83
F,https://manoa.hawaii.edu/careercenter/women-and-the-gender-pay-gap/,.62
F,https://goodfaithmedia.org/minimal-progress-on-u-s-gender-pay-gap-since-2002/,.82
F,https://www.britannica.com/money/gender-wage-gap,.623
F,https://www.pewresearch.org/short-reads/2023/03/01/gender-pay-gap-facts/,.82
F,https://www.pewresearch.org/short-reads/2023/03/01/gender-pay-gap-facts/,.87
F,https://www.statista.com/chart/4279/the-gender-pay-gap-in-developed-nations-visualised/,.634
F,https://obamawhitehouse.archives.gov/blog/2015/04/14/five-facts-about-gender-pay-gap,.78
F,https://www.washingtonpost.com/business/2024/01/16/gender-pay-gap-women-discussing-wages/,.84
F,https://www.pewresearch.org/short-reads/2023/03/01/gender-pay-gap-facts/,.82
F,https://venngage.com/templates/infographics/the-gender-pay-gap-in-different-industries-and-professions-b5cf3e1a-c72d-495b-9f73-85fa40a93702,.80
F,https://www.payanalytics.com/resources/articles/the-unadjusted-pay-gap-vs-the-adjusted-pay-gap,.90
F,https://www.forbesindia.com/article/rotman/principled-consumption-how-gender-pay-gaps-affect-perpetrators/88697/1,.57
F,https://www.nytimes.com/2021/07/01/business/salary-transparency-pay-gap.html,.96
F,https://news.cornell.edu/stories/2019/02/gender-pay-gap-shrinks-when-companies-disclose-wages,.811
F,https://www.bankrate.com/banking/savings/how-women-can-shrink-the-gender-pay-gap/,.84
F,https://www.countyhealthrankings.org/reports/gender-pay-gap,.77
M,https://www.forbes.com/sites/elissasangster/2021/03/24/the-pay-gap-is-real-dont-let-anyone-convince-you-otherwise/,1
M,https://blog.soroptimist.org/blog/equal-pay-day-what-is-the-gender-gap,1
M,https://blog.dol.gov/2023/03/14/5-fast-facts-the-gender-wage-gap,1
M,https://www.statista.com/chart/13182/where-the-gender-pay-gap-is-widest/,1
M,https://www.vantagecircle.com/en/blog/gender-pay-gap/,1
M,https://thehill.com/changing-america/respect/equality/3878062-the-gender-pay-gap-has-stayed-largely-unchanged-for-20-years-what-will-it-take-to-close-it/,1
M,https://www.cnbc.com/2023/03/14/the-wage-gap-gets-worse-when-women-hit-their-30s-heres-why.html,1
M,https://hbr.org/2019/11/how-to-close-the-gender-pay-gap-in-u-s-medicine,1
M,https://www.aauw.org/resources/research/simple-truth/,1
M,https://blog.dol.gov/2024/03/12/what-you-need-to-know-about-the-gender-wage-gap,1
M,https://i4di.org/pubs/gender-pay-gap-in-the-united-states/,1
M,https://www.wosu.org/npr-news/npr-news/2023-03-14/its-equal-pay-day-the-gender-pay-gap-has-hardly-budged-in-20-years-what-gives,1
M,https://www.businessinsider.com/gender-wage-pay-gap-charts-2017-3,1
M,https://manoa.hawaii.edu/careercenter/women-and-the-gender-pay-gap/,1
M,https://goodfaithmedia.org/minimal-progress-on-u-s-gender-pay-gap-since-2002/,1
M,https://www.britannica.com/money/gender-wage-gap,1
M,https://www.pewresearch.org/short-reads/2023/03/01/gender-pay-gap-facts/,1
M,https://www.pewresearch.org/short-reads/2023/03/01/gender-pay-gap-facts/,1
M,https://www.statista.com/chart/4279/the-gender-pay-gap-in-developed-nations-visualised/,1
M,https://obamawhitehouse.archives.gov/blog/2015/04/14/five-facts-about-gender-pay-gap,1
M,https://www.washingtonpost.com/business/2024/01/16/gender-pay-gap-women-discussing-wages/,1
M,https://www.pewresearch.org/short-reads/2023/03/01/gender-pay-gap-facts/,1
M,https://venngage.com/templates/infographics/the-gender-pay-gap-in-different-industries-and-professions-b5cf3e1a-c72d-495b-9f73-85fa40a93702,1
M,https://www.payanalytics.com/resources/articles/the-unadjusted-pay-gap-vs-the-adjusted-pay-gap,1
M,https://www.forbesindia.com/article/rotman/principled-consumption-how-gender-pay-gaps-affect-perpetrators/88697/1,1
M,https://www.nytimes.com/2021/07/01/business/salary-transparency-pay-gap.html,1
M,https://news.cornell.edu/stories/2019/02/gender-pay-gap-shrinks-when-companies-disclose-wages,1
M,https://www.bankrate.com/banking/savings/how-women-can-shrink-the-gender-pay-gap/,1
M,https://www.countyhealthrankings.org/reports/gender-pay-gap,1
`
	}

	static gap() {
		return `Sex,Source,Pay
F,forbes,.81
F,soroptimist,.83
F,dol,.837
F,statista,.831
F,vantagecircle,.74
F,thehill,.82
F,cnbc,.84
F,hbr,.75
F,aauw,.84
F,dol,.84
F,i4di,.92
F,wosu,.82
F,businessinsider,.83
F,hawaii,.62
F,goodfaithmedia,.82
F,britannica,.623
F,pewresearch,.82
F,pewresearch,.87
F,statista,.634
F,obamawhitehouse,.78
F,washingtonpost,.84
F,pewresearch,.82
F,venngage,.80
F,payanalytics,.90
F,forbesindia,.57
F,nytimes,.96
F,cornell,.811
F,bankrate,.84
F,countyhealthrankings,.77
M,forbes,1
M,soroptimist,1
M,dol,1
M,statista,1
M,vantagecircle,1
M,thehill,1
M,cnbc,1
M,hbr,1
M,aauw,1
M,dol,1
M,i4di,1
M,wosu,1
M,businessinsider,1
M,hawaii,1
M,goodfaithmedia,1
M,britannica,1
M,pewresearch,1
M,pewresearch,1
M,statista,1
M,obamawhitehouse,1
M,washingtonpost,1
M,pewresearch,1
M,venngage,1
M,payanalytics,1
M,forbesindia,1
M,nytimes,1
M,cornell,1
M,bankrate,1
M,countyhealthrankings,1
`
	}

	static kill() {
		return `Icecream,Temp,Homicide
10,10,10
20,20,20
30,30,30
40,40,40
50,50,50
60,60,60
70,70,70
80,80,80
90,90,90
`
	}

	static sym() {
		return [Data.sym2(), Data.sym1()].map(data=>data.replace(/\n/g,'\\n'))
	}

	static sym1() {
		return `Sex,Hours,Pay
F,40.65,55659.85
F,41.02,56188.58
F,41.26,56531.54
F,41.46,56817.34
F,41.63,57060.27
F,41.78,57274.62
F,41.91,57460.39
F,42.05,57660.45
F,42.17,57831.93
F,42.30,58017.70
F,42.43,58203.47
F,42.55,58374.95
F,42.69,58575.01
F,42.82,58760.78
F,42.97,58975.13
F,43.14,59218.06
F,43.34,59503.86
F,43.58,59846.82
F,43.95,60375.55
M,42.05,57660.45
M,42.42,58189.18
M,42.66,58532.14
M,42.86,58817.94
M,43.03,59060.87
M,43.18,59275.22
M,43.31,59460.99
M,43.45,59661.05
M,43.57,59832.53
M,43.70,60018.30
M,43.83,60204.07
M,43.95,60375.55
M,44.09,60575.61
M,44.22,60761.38
M,44.37,60975.73
M,44.54,61218.66
M,44.74,61504.46
M,44.98,61847.42
M,45.35,62376.15
`
	}

	static sym2() {
		let data = Frame.str2frame(Data.sym1())
		data.get(0,'F').apply(2,x=>x+2000)
		return data.toString()
	}

	static hire() {
		return `Sex,Race,Job
F,B,0
F,W,1
M,B,1
M,W,0
`
	}

	static wage() {
		return `Sex,Hours,Pay
M,10,001500
M,32,007200
M,40,039600
M,40,015400
F,38,010000
F,15,005600
M,84,054000
M,10,001500
M,40,042000
M,50,029000
M,50,008000
M,40,060000
M,52,037500
M,45,034000
M,40,029000
M,80,000300
M,40,050000
F,40,015000
F,20,008000
M,40,025000
M,25,014000
M,09,072000
M,25,002000
F,72,020000
M,40,036000
M,25,015000
F,40,019000
F,40,019000
M,32,022000
M,40,054000
M,55,030000
F,25,005000
M,22,002400
F,03,000000
M,45,035000
M,30,025000
M,40,019000
M,40,000200
M,10,011800
M,48,015000
M,40,081000
M,40,044000
M,30,020000
M,40,015000
M,50,047000
F,40,050000
M,40,003000
M,40,002100
M,37,010000
F,25,002000
F,12,005000
F,40,050000
F,25,006000
M,40,006200
F,17,003100
M,06,000600
M,30,001100
M,60,000700
M,60,250000
M,40,120000
F,40,040000
M,40,022000
F,45,042000
M,50,080000
M,40,040000
F,40,020000
M,43,030000
M,20,012000
M,40,100000
M,40,100000
M,24,017000
F,40,040000
M,28,019000
M,40,045000
F,45,045000
M,40,060000
F,40,038000
F,40,030000
M,04,001000
M,40,019000
F,45,047000
M,45,165000
M,40,002000
F,30,030500
M,40,037000
M,25,004000
F,25,060000
F,40,040000
F,40,070000
F,50,090000
M,32,024000
F,12,007000
F,12,004000
F,35,005500
F,40,045000
M,10,011500
F,40,130000
M,42,057000
F,30,025200
F,36,080000
M,50,020000
M,40,022900
F,45,091000
F,40,130000
M,20,014000
M,10,000500
F,60,026000
F,60,025000
F,40,027700
F,50,070000
M,50,070000
M,20,020000
M,40,011900
M,40,268000
F,26,002500
M,40,035000
M,40,052000
F,80,426000
M,24,014300
M,40,020000
M,20,000780
M,40,012500
F,36,006000
M,36,020400
F,40,024000
M,35,006500
F,36,036000
M,50,107000
F,35,003000
M,40,062000
M,40,029100
F,30,004200
M,20,001800
F,50,002000
M,71,024600
M,60,026000
M,36,005000
F,16,006000
M,45,028800
M,03,000000
M,86,036700
F,10,009600
F,32,008000
F,20,005000
M,15,000490
F,20,010000
F,25,005000
M,20,003000
M,45,028000
M,25,003800
M,40,022900
M,36,003200
F,20,003000
M,12,002200
M,40,002000
F,40,007500
M,32,000600
F,03,000770
M,40,030000
F,25,000000
M,12,005500
M,20,001400
M,40,005500
F,40,006000
F,25,400000
F,20,007000
F,40,060000
M,44,011000
F,15,022500
M,40,200000
F,40,140000
F,05,017800
F,40,007200
F,06,000000
F,35,022000
F,06,001000
F,30,000000
F,40,015000
F,08,001300
F,40,012000
M,50,090000
F,65,075000
F,25,002500
M,40,009300
F,40,089000
F,40,110000
M,50,017000
M,40,000000
M,40,000000
M,40,250000
F,16,008000
M,40,044000
F,24,018700
M,35,045000
M,25,020000
M,80,020000
F,80,020000
M,40,027000
M,40,027000
M,40,005000
F,40,045000
M,20,000250
M,12,000500
F,08,002000
F,20,003500
F,32,030000
F,25,011700
F,25,009600
M,40,060000
F,40,165000
F,50,150000
M,40,006000
M,15,000800
F,40,005000
F,35,003600
M,40,006500
F,16,008000
M,40,035700
F,40,035000
F,32,020000
M,50,040000
M,30,010000
F,48,000000
M,68,022000
F,40,058000
M,65,114000
F,40,065000
M,60,070000
M,40,043000
F,24,012000
F,10,000400
F,20,020000
F,40,030000
F,40,060000
M,50,687000
F,25,004000
F,40,056000
M,40,030000
M,40,200000
F,36,060000
F,36,080000
M,60,136000
F,16,009800
M,40,025000
M,40,008000
M,50,008000
M,30,015000
F,40,031100
F,40,055000
M,40,065000
F,20,000760
F,30,001000
M,60,008700
M,40,060000
M,40,035000
F,36,056000
M,40,035600
M,45,150000
M,50,019800
M,45,018000
M,45,073000
M,12,003000
F,20,015000
F,50,037000
F,20,015000
F,40,040000
M,16,003500
M,40,060000
M,20,024000
M,30,000000
F,20,072000
M,15,004000
M,15,011500
M,40,070000
F,40,045000
M,36,014500
M,24,010000
M,40,055000
F,04,001700
M,20,006700
F,40,025000
M,30,030000
F,30,025000
F,45,112000
F,12,045000
F,30,018000
M,40,120000
M,40,085000
M,60,070000
F,45,005200
M,40,007200
M,40,058000
M,15,007000
M,40,065000
M,10,000000
F,40,050000
M,60,050000
M,45,050000
M,20,019000
F,30,012400
M,40,025000
F,28,020000
F,40,159000
M,35,024000
F,53,050000
M,28,004800
M,20,034000
M,20,012000
M,46,132000
M,40,114000
M,40,055000
F,40,055000
M,50,042000
M,40,221000
M,40,040000
F,50,080000
M,20,008000
M,40,020000
F,40,100000
F,30,024500
F,40,070000
F,25,014000
F,40,135000
F,40,150000
M,40,050000
M,40,031000
F,30,023900
M,40,000500
M,48,030000
M,40,033000
M,40,030000
F,30,024000
M,40,027900
F,12,005400
M,40,047200
F,23,007000
F,40,075000
M,37,009000
F,10,000000
M,30,009400
F,22,016000
M,40,025000
F,32,010000
M,39,016600
M,40,100000
M,60,030000
F,60,030000
F,10,004000
M,50,110000
M,50,100000
F,36,050000
M,40,054000
M,32,017000
F,32,004800
M,40,020000
M,06,000000
M,40,065000
M,40,074000
F,30,010000
M,20,000400
F,30,054000
M,40,030000
F,40,013000
M,34,030000
F,25,008000
F,06,001000
M,40,030300
F,40,243000
M,40,006800
M,30,000000
M,40,065000
M,40,025000
F,35,000000
`
	}

	static econ() {
		return `V0,V1,V2,Y
Γ,x,A,0
Γ,x,B,1
Γ,x,C,2
Γ,y,A,3
Γ,y,B,4
Γ,y,C,5
`
	}

}
