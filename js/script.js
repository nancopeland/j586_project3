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
    buildChart(); //finally builds chart -- needs to be inside function but outside loop so it won't try to write the chart 100 times, etc.
    }
    
});

    
function buildChart(xml){ //tells how to build chart, but need to add buildChart blah blah in document ready above
    
    var chart1 = new Highcharts.Chart({
    colors: ["#DCE3E8"],
    chart: {
        renderTo: 'chart',
        type: 'areaspline',
        style: {
            fontFamily:'"Ubuntu", sans-serif',
            fontWeight:'300'}
    },
    title: {
        text: 'MILLENNIALS VS. TOTAL POPULATION'
    },
    xAxis: {
        categories:
            ['0-10 years old', '11-20 years old', '21-30 years old', '31-40 years old', '41-50 years old', '51-60 years old', '61-70 years old', '71-80 years old', '81-90 years old', '91-100 years old'],
        plotBands: [{ // visualize the weekend
            from: .8,
            to: 2.9,
            color: 'rgba(202, 139, 121, .2)'
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
    
     
})};
    
/*$(function () {
    $('#chart-two').highcharts({
        chart: {
            type: 'areaspline'
        },
        title: {
            text: 'Average fruit consumption during one week'
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 150,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        xAxis: {
            categories: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday'
            ],
            plotBands: [{ // visualize the weekend
                from: 4.5,
                to: 6.5,
                color: 'rgba(68, 170, 213, .2)'
            }]
        },
        yAxis: {
            title: {
                text: 'Fruit units'
            }
        },
        tooltip: {
            shared: true,
            valueSuffix: ' units'
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.5
            }
        },
        series: [{
            name: 'John',
            data: [3, 4, 3, 5, 4, 10, 12]
        }, {
            name: 'Jane',
            data: [1, 3, 4, 3, 3, 5, 4]
        }]
    });
});*/

    