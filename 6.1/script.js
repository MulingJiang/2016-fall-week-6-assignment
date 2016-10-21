console.log('6.1');

//First, append <svg> element and implement the margin convention
var m = {t:50,r:50,b:50,l:50};
var outerWidth = document.getElementById('canvas').clientWidth,
    outerHeight = document.getElementById('canvas').clientHeight;
var w = outerWidth - m.l - m.r,
    h = outerHeight - m.t - m.b;

var plot = d3.select('.canvas')
    .append('svg')
    .attr('width',outerWidth)
    .attr('height',outerHeight)
    .append('g')
    .attr('transform','translate(' + m.l + ',' + m.t + ')');


//2, Import and parse  3, Mine the data
//d3.csv('../data/olympic_medal_count.csv',parse,dataLoaded);



d3.csv('../data/olympic_medal_count.csv',parse,function(err,rows){

    console.table(rows);
   
    var minMedal = d3.min(rows,function(d){return d.count2012}),
        maxMedal = d3.max(rows,function(d){return d.count2012});
    console.log(minMedal,maxMedal);

//4, Sort data
    rows.sort(function(a,b){
    	return b.count2012 - a.count2012;

    });
     
    console.log(rows);
  
//5, Pick up top five
    var topFive = rows.slice(0,5);
    console.log(topFive);




//6, Set up scale
//6.1, Set up X

var x = topFive.map(function(d){return d.country})

var scaleX = d3.scaleBand()
           .domain(x)
           .range([0,w])
           .padding(.7);


//6.2, Set up Y

var scaleY = d3.scaleLinear()
           .domain([minMedal,maxMedal])
           .range([h,0]);// from bottom to top



//7, Create the axis function
var axisY = d3.axisLeft()
    .scale(scaleY)
    .tickSize(-w);
plot.append("g").attr("class", "axis")
    .call(axisY)
   // .attr("transform", "translate(0," + h + ")");
   // scaleY(axisNode);
var axisX = d3.axisBottom()
    .scale(scaleX)
    .tickSize(-w);


plot.append("g")
    .attr("class", "country")
    .attr("transform", "translate(0," + h + ")")
    .call(axisX)


//8, Create Barchart
var barChart = plot.selectAll("rect")
            .data(topFive)
            .enter()
            .append('rect')
        
            .attr("x",function(d){return scaleX(d.country)})
            .attr("y",function(d){return scaleY(d.count2012)})
            .style("width",scaleX.bandwidth())
            .style("height",function(d){return h - scaleY(d.count2012)})




})

//Parse data

function parse(d){
 	return{
 		country:d['Country'],// property name cannot begin with numbers
 		count1900:+d['1900'],
		count1960:+d['1960'],
 		count2012:+d['2012'],
 	};
 }
	

