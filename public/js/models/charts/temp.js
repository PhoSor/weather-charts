define(['highcharts'], function(Highcharts) {
  var Temp = function(data) {
    return {
      chart: {
        renderTo: 'temp',
        type: 'area',
        marginRight: 128,
        marginBottom: 30
      },
      title: {
        text: data.city.name,
        x: -42 //center
      },
      subtitle: {
        text: 'Forecast for 5 days',
        x: -42 //center
      },
      xAxis: {
        type: 'datetime',
        tickInterval: 3 * 3600 * 1000,
        tickPositions: data.time,
        labels: {
          formatter: function() {
            var label = '',
                date = new Date(this.value);
            if (date.getUTCHours() == 3) {
              label = Highcharts.dateFormat('%H:%M<br /><b>%B %e</b>', date);
            } else {
              label = Highcharts.dateFormat('%H:%M', date);
            }
            return label;
          }
        }
      },
      yAxis: [{
        title: {
          text: 'Temperature (°C)'
        },
        tickInterval: 4,
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
        }]
      }],
      tooltip: {
        formatter: function() {
          return '<b>' + this.series.name + '</b><br/>' +
              Highcharts.dateFormat('%B %e, %H:%M', this.x) +
              ': <b>' + this.y + '°C</b>';
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
          name: 'Temperature',
          data: data.temperature.min,
          pointStart: data.time[1],
          pointInterval: 6 * 3600 * 1000
        }]
    };
  };

  return Temp;
});

