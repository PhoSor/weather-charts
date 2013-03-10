$(function() {
  var chart;
  $(document).ready(function() {
    $.getJSON('/temp', function(data) {
      console.log(data);
      chart = new Highcharts.Chart({
        chart: {
          renderTo: 'container',
          type: 'area',
          marginRight: 130,
          marginBottom: 25
        },
        title: {
          text: 'Daily Temperature',
          x: -20 //center
        },
        subtitle: {
          text: 'Forecast for 5 days',
          x: -20
        },
        xAxis: {
          type: 'datetime'
        },
        yAxis: {
          title: {
            text: 'Temperature (°C)'
          },
          plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
          }]
        },
        tooltip: {
          formatter: function() {
            return '<b>' + this.series.name + '</b><br/>' +
                this.x + ': ' + this.y + '°C';
          }
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          x: -10,
          y: 100,
          borderWidth: 0
        },
        series: [
          {
            name: 'Temp',
            data: data.temperature.max,
            pointInterval: 6 * 3600 * 1000,
            pointStart: data.time[0]
          }
          /* {
            name: 'Min',
            data: data.temperature.min
          },
          {
            name: 'Max',
            data: data.temperature.max
          } */
        ]
      });
    });
  });

});

