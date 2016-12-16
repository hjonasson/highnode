var d3 = require( 'd3' );
var fs = require( 'fs' );
var csv = fs.readFileSync( 'stackedColumnChart/stackedColumnChart.csv' , 'utf8' ).toString();
var data = d3.csvParse( csv );
var json = require( './params.json' )

//data formatting
var categories = data.columns.slice( 1 );
var plotData = data.map( ( d ) => { return { 'name' : d.name , 'data' : categories.map( ( i ) => { return parseFloat( d[ i ] ) } ) } } )

//plot labeling
var title = json.title;
var ylabel = json.ylabel;
var type = json.type;
var stacking = json.stacking;

//highcharts plotting
plot = {
        chart: {
            type: type
        },
        title: {
            text: title
        },
        xAxis: {
            categories: categories
        },
        yAxis: {
            min: 0,
            title: {
                text: ylabel
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
            shared: true
        },
        plotOptions: {
            column: {
                stacking: stacking
            }
        },
        series: plotData
    };