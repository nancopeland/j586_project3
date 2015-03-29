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
            //console.log("once for every person");
            var $point = $(this); 
            var name = $point.attr("name");
            //var totalPopulation = $data.find('population').text();
            //var imageurl = $data.attr('imageurl');
            totalPopulation.push(parseInt($point.find('population').text())); //parseInt is a function that says turn this text into an integer. Push adds the data to the back of each one so that order makes sense. Pop goes to the front.
    
            /*var html = '<dt> <img class="bioImage" alt="" src="' + imageurl + '" /> </dt>';
            //html += '<dd> <span class="loadingPic" alt="Loading" />';
            html += '<p class="name">' + name + '</p>';
            html += '<p> ' + totalPopulation + '</p>' ;
            html += '</dd>';*/
    
            /*$('dl').append($(html));*/
            
            
        });
    
    console.log(totalPopulation);
    buildChart();
    buildPiechart();//finally builds chart -- needs to be inside function but outside loop so it won't try to write the chart 100 times, etc.
    }
    
});

    
function buildChart(xml){ //tells how to build chart, but need to add buildChart blah blah in document ready above
    
    var chart1 = new Highcharts.Chart({
        colors: ['#8B9FBB, #DCE3E8'],
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
                color: 'rgba(202, 139, 121, .25)'
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
    $('#race-chart').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: 'Browser market shares at a specific website, 2014'
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
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Browser share',
            data: [
                ['Firefox',   45.0],
                ['IE',       26.8],
                {
                    name: 'Chrome',
                    y: 12.8,
                    sliced: true,
                    selected: true
                },
                ['Safari',    8.5],
                ['Opera',     6.2],
                ['Others',   0.7]
            ]
        }]
    });
};

    