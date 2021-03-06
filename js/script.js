//STEPS
//DOM Ready
//load XML 
//parseXML
//build HML
//build charts
//build table

var totalPopulation = [];
var conLib = [];
var mostLib = [];
var mix = [];
var mostCons = [];
var conCons = [];
var homosexuality = [];
var immigration = [];
var environment = []; 
    
    
$(document).ready(function(){
    
    $.ajax({ //loads in xml file
        type: "GET",
        url: "total-population.xml",
        dataType: "xml",
        success: parseXML
    });
    
    $.ajax({ //loads in xml file
        type: "GET",
        url: "political-views.xml",
        dataType: "xml",
        success: parseXML
    });
    
    function parseXML(xml) { 
         
        $(xml).find('point').each(function(){ //starts loop to find all people, etc
            var $point = $(this); 
            var name = $point.attr("name");
            totalPopulation.push(parseInt($point.find('population').text())); //parseInt is a function that says turn this text into an integer. 
            
        });
         
        $(xml).find('generation').each(function(){ //starts loop to find all people, etc
            var $generation = $(this); 
            var name = $generation.attr("name");
            conLib.push(parseInt($generation.find('con-lib').text())); //parseInt is a function that says turn this text into an integer. 
            mostLib.push(parseInt($generation.find('most-lib').text()));
            mix.push(parseInt($generation.find('mix').text()));
            mostCons.push(parseInt($generation.find('most-cons').text()));
            conCons.push(parseInt($generation.find('con-cons').text()));
            homosexuality.push(parseInt($generation.find('homosexuality').text()));
            immigration.push(parseInt($generation.find('immigration').text()));
            environment.push(parseInt($generation.find('environment').text()));
    });
    
    buildChart();
    buildPiechart();
    buildPiechart2();
    buildBargraph();
    buildBargraphTwo(); 
    }
    
});

    
function buildChart(xml){ //tells how to build chart, but need to add buildChart blah blah in document ready above
    
    var chart1 = new Highcharts.Chart({
        colors: ['#BCADD0'],
        chart: {
            renderTo: 'chart',
            type: 'areaspline',
            style: {
                fontFamily:'"Ubuntu", sans-serif',
                fontWeight:'300'
            }
        },
        legend: {
            enabled: false
        },
        title: {
            text: 'MILLENNIALS VS. TOTAL POPULATION (JUNE 2014)'
        },
        xAxis: {
            categories:
                ['0-10 years old', '11-20 years old', '21-30 years old', '31-40 years old', '41-50 years old', '51-60 years old', '61-70 years old', '71-80 years old', '81-90 years old', '91-100 years old'],
            plotBands: [{ 
                from: .8, 
                to: 2.9,
                color: 'rgba(246, 186, 79, .5)'
            }]
        },
        yAxis: {
            title: {
                text: 'Population'
            }
        },
        series: [{
            name: 'Other',
            data: totalPopulation
        }]
         
    })
};
    

function buildPiechart() {
    var chart2 = new Highcharts.Chart({ 
        colors: ['#8D76AE', '#BCADD0', '#E5DDED', '#F6BA4F', '#FADA85', '#F8E6BA'],
        chart: {
            renderTo: 'race-chart',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            style: {
                fontFamily:'"Ubuntu", sans-serif',
                fontWeight:'300'
            }
        },
        title: {
            text: 'Diversity: Millennials'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            type: 'pie',
            name: 'percentage',
            data: [
                ['White',   74.45],
                ['Black',       14.94],
                ['Asian American',    5.84],
                ['American Indian',     1.47],
                ['Native Hawaiian/Pacific Islander',   .29],
                ['Two or more races',   3.00]
            ]
        }]
    });
};


function buildPiechart2() {
    var chart3 = new Highcharts.Chart({ 
        colors: ['#8D76AE', '#BCADD0', '#E5DDED', '#F6BA4F', '#FADA85', '#F8E6BA'],
        chart: {
            renderTo: 'race-chart-two',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            style: {
                fontFamily:'"Ubuntu", sans-serif',
                fontWeight:'300'
            }
        },
        title: {
            text: 'Diversity: Total Population'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            type: 'pie',
            name: 'percentage',
            data: [
                ['White',   77.46],
                ['Black',       13.20],
                ['Asian American',    5.36],
                ['American Indian',     1.24],
                ['Native Hawaiian/Pacific Islander',   .23],
                ['Two or more races',   2.50]
            ]
        }]
    });
};


$(document).ready(function() {
    
  $('#table').dataTable( {
        "ajax": 'table.json', 
        responsive: true
    } );  
   
} );


function buildBargraph() {
    var chart4 = new Highcharts.Chart({
        colors: ['#F6BA4F', '#FADA85', '#E5DDED', '#BCADD0', '#8D76AE'],
        chart: {
            renderTo: 'politics-graph',
            type: 'bar',
            style: {
                fontFamily:'"Ubuntu", sans-serif',
                fontWeight:'300'
            }
        },
        title: {
            text: 'U.S. Political Views by Generation'
        },
        xAxis: {
            categories: ['Total', 'Silent', 'Baby Boomers', 'Generation X', 'Millennials']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Percentage (%)'
            }
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b> {point.percentage:.1f} %',
                    style: {
                        fontFamily:'"Ubuntu", sans-serif',
                        fontWeight:'300'
                    }
                }
            },
            series: {
                stacking: 'normal'
            }
        },
        series: [{
            name: 'Consistently Conservative',
            data: conCons
        }, {
            name: 'Mostly Conservative',
            data: mostCons
        }, {
            name: 'Mixed',
            data: mix
        }, {
            name: 'Mostly Liberal',
            data: mostLib
        }, {
            name: 'Consistently Liberal',
            data: conLib            
        }]
    });
};

function buildBargraphTwo() {
    var chart5 = new Highcharts.Chart({
        colors: ['#E5DDED', '#BCADD0', '#8D76AE'],
        chart: {
            renderTo: 'politics-graph-two',
            type: 'bar',
            style: {
                fontFamily:'"Ubuntu", sans-serif',
                fontWeight:'300'
            }
        },
        title: {
            text: 'Republican Support for Liberal Issues by Generation'
        },
        xAxis: {
            categories: ['All Republicans/<br>Republican Leaning', 'Silent', 'Baby Boomers', 'Generation X', 'Millennials'],
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Percentage that supports issue (%)',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true,
                    style: {
                        fontFamily:'"Ubuntu", sans-serif',
                        fontWeight:'300'
                    }
                }
            }
        },
        legend: {
            reversed: true
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Homosexuality should be accepted by society',
            data: homosexuality
        }, {
            name: 'Immigrants strengthen our country',
            data: immigration
        }, {
            name: 'Environmental regulations are worth the cost',
            data: environment
        }]
    });
};


    