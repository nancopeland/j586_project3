//STEPS
//DOM Ready
//load XML 
//parseXML
//build HML
//build charts
//build table

var totalPopulation = [];
    
    
$(document).ready(function(){
    
    $.ajax({ //loads in xml file
        type: "GET",
        url: "total-population.xml",
        dataType: "xml",
        success: parseXML
    });
    
    function parseXML(xml) { 
         
        $(xml).find('point').each(function(){ //starts loop to find all people, etc
            var $point = $(this); 
            var name = $point.attr("name");
            totalPopulation.push(parseInt($point.find('population').text())); //parseInt is a function that says turn this text into an integer. 
            
        });
    
    console.log(totalPopulation);
    buildChart();
    buildPiechart();
    buildPiechart2(); 
    }
    
});

    
function buildChart(xml){ //tells how to build chart, but need to add buildChart blah blah in document ready above
    
    var chart1 = new Highcharts.Chart({
        colors: ['#DCE3E8'],
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
                color: 'rgba(139, 159, 187, .5)'
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
        colors: ['#8B9FBB', '#BFCFDA', '#C0CCD1', '#CBD5DB', '#DCE3E8', '#EAF3F7'],
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
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        fontFamily:'"Ubuntu", sans-serif',
                        fontWeight:'300'
                    }
                }
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
        colors: ['#8B9FBB', '#BFCFDA', '#C0CCD1', '#CBD5DB', '#DCE3E8', '#EAF3F7'],
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
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        fontFamily:'"Ubuntu", sans-serif',
                        fontWeight:'300'
                    }
                }
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



var conLib = [];
var mostLib = [];
var mix = [];
var mostCons = [];
var conCons = []; 

$(document).ready(function(){
    
    $.ajax({ //loads in xml file
        type: "GET",
        url: "political-views.xml",
        dataType: "xml",
        success: parseXML
    });
    
    function parseXML(xml) { 
         
        $(xml).find('generation').each(function(){ //starts loop to find all people, etc
            var $generation = $(this); 
            var name = $generation.attr("name");
            conLib.push(parseInt($generation.find('con-lib').text())); //parseInt is a function that says turn this text into an integer. 
            mostLib.push(parseInt($generation.find('most-lib').text()));
            mix.push(parseInt($generation.find('mix').text()));
            mostCons.push(parseInt($generation.find('most-cons').text()));
            conCons.push(parseInt($generation.find('con-cons').text()));
        });
    
    console.log(conCons); 
    buildBargraph(); 
    }
    
});

function buildBargraph() {
    var chart5 = new Highcharts.Chart({
        colors: ['#CA8B79', '#E7D2CA', '#C0CCD1', '#BFCFDA', '#8B9FBB'],
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
                text: 'Percentage'
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

    