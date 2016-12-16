var d3 = require( 'd3' );
var fs = require( 'fs' );
var json = require( './params.json' )

$(function () {
    /**
     * Create a constructor for sparklines that takes some sensible defaults and merges in the individual
     * chart options. This function is also available from the jQuery plugin as $(element).highcharts('SparkLine').
     */
    Highcharts.SparkLine = function (a, b, c) {
        var hasRenderToArg = typeof a === 'string' || a.nodeName,
            options = arguments[hasRenderToArg ? 1 : 0],
            defaultOptions = {
                chart: {
                    renderTo: (options.chart && options.chart.renderTo) || this,
                    backgroundColor: null,
                    borderWidth: 0,
                    type: 'area',
                    margin: [2, 0, 2, 0],
                    width: 120,
                    height: 20,
                    style: {
                        overflow: 'visible'
                    },

                    // small optimalization, saves 1-2 ms each sparkline
                    skipClone: true
                },
                title: {
                    text: ''
                },
                credits: {
                    enabled: false
                },
                xAxis: {
                    labels: {
                        enabled: false
                    },
                    title: {
                        text: null
                    },
                    startOnTick: false,
                    endOnTick: false,
                    tickPositions: []
                },
                yAxis: {
                    endOnTick: false,
                    startOnTick: false,
                    labels: {
                        enabled: false
                    },
                    title: {
                        text: null
                    },
                    tickPositions: [0]
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    backgroundColor: null,
                    borderWidth: 0,
                    shadow: false,
                    useHTML: true,
                    hideDelay: 0,
                    shared: true,
                    padding: 0,
                    positioner: function (w, h, point) {
                        return { x: point.plotX - w / 2, y: point.plotY - h };
                    }
                },
                plotOptions: {
                    series: {
                        animation: false,
                        lineWidth: 1,
                        shadow: false,
                        states: {
                            hover: {
                                lineWidth: 1
                            }
                        },
                        marker: {
                            radius: 1,
                            states: {
                                hover: {
                                    radius: 2
                                }
                            }
                        },
                        fillOpacity: 0.25
                    },
                    column: {
                        negativeColor: '#910000',
                        borderColor: 'silver'
                    }
                }
            };

        options = Highcharts.merge(defaultOptions, options);

        return hasRenderToArg ?
            new Highcharts.Chart(a, options, c) :
            new Highcharts.Chart(options, b);
    };

    var start = +new Date(),
        $tds = $('td[data-sparkline]'),
        fullLen = $tds.length,
        n = 0;

    // Creating 153 sparkline charts is quite fast in modern browsers, but IE8 and mobile
    // can take some seconds, so we split the input into chunks and apply them in timeouts
    // in order avoid locking up the browser process and allow interaction.
    function doChunk() {
        var time = +new Date(),
            i,
            len = $tds.length,
            $td,
            stringdata,
            arr,
            data,
            chart;

        for (i = 0; i < len; i += 1) {
            $td = $($tds[i]);
            stringdata = $td.data('sparkline');
            arr = stringdata.split('; ');
            data = $.map(arr[0].split(', '), parseFloat);
            chart = {};

            if (arr[1]) {
                chart.type = arr[1];
            }
            $td.highcharts('SparkLine', {
                series: [{
                    data: data,
                    pointStart: 1
                }],
                tooltip: {
                    //headerFormat: '<span style="font-size: 10px">' + $td.parent().find('th').html() + ', Q{point.x}:</span><br/>',
                    pointFormat: '<b>{point.y}.000</b> USD'
                },
                chart: chart
            });

            n += 1;

            // If the process takes too much time, run a timeout to allow interaction with the browser
            if (new Date() - time > 500) {
                $tds.splice(0, i + 1);
                setTimeout(doChunk, 0);
                break;
            }

            // Print a feedback on the performance
            if (n === fullLen) {
                $('#result').html('Generated ' + fullLen + ' sparklines in ' + (new Date() - start) + ' ms');
            }
        }
    }
    doChunk();


//data
var headers = [ 1 , 2 , 3 , 4 , 5 , 6 , 7 ].map( ( i ) => { return json[ 'p' + i.toString() ] } );

//setup for html
d3.select( '#container' )
	.append( 'table' )
	.attr( 'id' , 'table-header' );
	
d3.select( '#table-header' )
	.append( 'tbody' )
	.attr( 'id' , 'tbody-sparkline' );

d3.select( '#table-header' )
	.append( 'thead' )
	.append( 'tr' )
	.attr( 'id' , 'header-line' );

//write headers
headers.forEach( function( d ) { 
d3.select( '#header-line' )
	.append( 'th' )
	.text( d ) } )
});

//setup for data fields
d3.select( '#container' )
	.append( 'table' )
	.attr( 'id' , 'data-table' )
	.append( 'tbody' )
	.attr( 'id' , 'tbody-sparkline' );

//helper functions for html
var sum = ( a ) => a.reduce( ( i , j ) => { return i + j } );
var ints = ( i ) => { return parseInt( i ) };
var sumStr = ( s ) => { var b = s.split(', '); b[ b.length - 1 ] = b[ b.length - 1 ].split( ' ' )[ 0 ]; return sum( b.map( ints ) ) };

var datA = fs.readFileSync( 'sparkline/sparkline.csv' , 'utf8' ).toString();
var data = d3.csvParse( datA );

//name of compared parameters in csv file, quarter number omitted as it is mapped later
var p1 = 'incomeq';
var p2 = 'costq';

//helper functions to map data to the formats required by highcharts
var money = ( v ) =>  [ 1 , 2 , 3 , 4 ].map( ( i ) => { return v + i.toString() } );
var moneyVal = ( d , v ) => { return money( v ).map( ( i ) => { return d[ i ] } ) };
var strForm = ( d , v ) => { return moneyVal( d , v ).join( ', ' ) };
var hcStupid = ( d ) => { return moneyVal( d , p1 ).map( parseFloat ).map( ( a , i ) => a - moneyVal( d , p2 )[ i ] ) };

//data on the correct format
var firstCol = data.columns[ 0 ];
var cityData = data.map( ( d ) => { return { 'name' : d[ firstCol ] , 'dat' : [ strForm( d , p1 ) , strForm( d , p2 ) , hcStupid( d ).join( ', ' ) + ' ; column' ] } } );

//helper functions for html
var sum = ( a ) => a.reduce( ( i , j ) => { return i + j } );
var ints = ( i ) => { return parseInt( i ) };
var sumStr = ( s ) => { var b = s.split(', '); b[ b.length - 1 ] = b[ b.length - 1 ].split( ' ' )[ 0 ]; return sum( b.map( ints ) ) };

//append data
cityData.forEach( function ( d ) {
	d3.select( '#tbody-sparkline' )
		.append( 'tr' )
		.attr( 'id' , d.name )
		.append( 'th' )
		.text( d.name );
	d.dat.forEach( function( i ) {   
		var s = d3.selectAll( '#' + d.name );
		s.append( 'td' )
			.text( sumStr( i ) );
        s.append( 'td' )
        	.attr( 'data-sparkline' , i );
    });
});

//fix the broken bits
$( document ).ready( function() {
	$( '#data-table' ).before( $( '#table-header' ) );
	$( 'table' ).contents().unwrap();
	$( 'tbody' ).wrapAll( 'table' );
    $( '.highcharts-button' ).remove()
});
