var body=d3.select("body");
var svg=body.append("svg");
svg.attr({"width":"650px","height":"600px"});
svg.attr("class","Reds")
var path = d3.geo.path();
var projection = d3.geo.conicConformal()
    .center([2.454071, 46.279229])
    .scale(3000)
    .translate([300,300]);
path.projection(projection);
d3.json("departments.json", function(geoJSON) {
	var map=svg.selectAll("path").data(geoJSON.features)
   map.enter()
        .append("path")
        .attr("stroke","black")
        .attr('id', function(d) {return "d" + d.properties.CODE_DEPT;})
        .attr("d", path);
   d3.csv("population.csv", function(csv) {
			var quantile = d3.scale.quantile().domain([0, d3.max(csv, function(e) { return +e.POP; })]).range(d3.range(9));
			legend = svg.append('g')
        		.attr('transform', 'translate(525, 150)')
        		.attr('id', 'legend');
        	var lg=legend.selectAll('.colorbar').data(d3.range(9))
      	lg.enter().append('svg:rect')
        		.attr('y', function(d) { return d * 20 + 'px'; })
        		.attr('height', '20px')
        		.attr('width', '20px')
        		.attr('x', '0px')
        		.attr("class", function(d) { return "q" + d + "-9"; });
        	legendScale = d3.scale.linear()
    			.domain([0, d3.max(csv, function(e) { return +e.POP; })])
    			.range([0, 9 * 20]);
    		legendAxis = d3.svg.axis()
    			.scale(legendScale)
    			.orient('right')
    			.tickSize(6)
    			.ticks(9);
    		legendLabels = svg.append('g')
    			.attr('transform', 'translate(550, 150)')
    			.style({"font-family": "sans-serif","font-size": "8px"})
    			.attr({"fill": "none","stroke": "black"})
    			.call(legendAxis);
			csv.forEach(function(e,i) {
    			d3.select("#d" + e.CODE_DEPT)
        			.attr("class", function(d) { return "q" + quantile(+e.POP) + "-9"; })
    		});
    });
});

