var d3 = require( 'd3' );
var fs = require( 'fs' );
var json = require( './params.json' )
var csv = fs.readFileSync( 'bubbleChart/bubbleChart.csv' , 'utf8' ).toString();
var csv = d3.csvParse( csv );

var data = csv.map( ( i ) => 
    { 
        return { 'x' : parseFloat( i.x ) , 
        'y' : parseFloat( i.y ) , 
        'r' : parseFloat( i.r ) , 
        'id' : i.id , 
        'name' : i.name } 
    });

var xlabel = json.xlabel;
var ylabel = json.ylabel;
var title = json.title;
var xtipformat = json.xtipformat;
var ytipformat = json.ytipformat;
var xunit = json.xunit;
var yunit = json.yunit;
var xdescr = json.xdescr;
var ydescr = json.ydescr;
var rdescr = json.rdescr;
var subtitle = json.subtitle;
var tooltip = '<tr><th colspan="2"><h3>{point.name}</h3></th></tr>' +
                '<tr><th>' + xdescr + ':</th><td>{point.x}' + xunit + '</td></tr>' +
                '<tr><th>' + ydescr + ':</th><td>{point.y}' + yunit + '</td></tr>' +
                '<tr><th>' + rdescr + ':</th><td>{point.r}%</td></tr>';

plot = {

        chart: {
            type: 'bubble',
            plotBorderWidth: 1,
            zoomType: 'xy'
        },

        legend: {
            enabled: false
        },

        title: {
            text: title
        },

        subtitle: {
            text: subtitle
        },

        xAxis: {
            gridLineWidth: 1,
            title: {
                text: xlabel
            },
            labels: {
                format: xtipformat
            }
        },

        yAxis: {
            startOnTick: false,
            endOnTick: false,
            title: {
                text: ylabel
            },
            labels: {
                format: ytipformat
            },
            maxPadding: 0.2
        },

        tooltip: {
            useHTML: true,
            headerFormat: '<table>',
            pointFormat: tooltip,
            footerFormat: '</table>',
            followPointer: true
        },

        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.id}'
                }
            }
        },

        series: [{
            data: data
        }]

    };

    