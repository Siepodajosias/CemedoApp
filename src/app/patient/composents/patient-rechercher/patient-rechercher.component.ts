import { Component, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexNonAxisChartSeries } from 'ng-apexcharts';
import { ThemeOption } from 'ngx-echarts';

export const CoolTheme = {

  color: [
    '#b21ab4',
    '#6f0099',
    '#2a2073',
    '#0b5ea8',
    '#17aecc',
    '#b3b3ff',
    '#eb99ff',
    '#fae6ff',
    '#e6f2ff',
    '#eeeeee'
  ],

  title: {
    textStyle: {
      fontWeight: 'normal',
      color: '#00aecd'
    }
  },

  visualMap: {
    color: ['#00aecd', '#a2d4e6']
  },

  toolbox: {
    color: ['#00aecd', '#00aecd', '#00aecd', '#00aecd']
  },

  tooltip: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    axisPointer: {
      // Axis indicator, coordinate trigger effective
      type: 'line', // The default is a straight line： 'line' | 'shadow'
      lineStyle: {
        // Straight line indicator style settings
        color: '#00aecd',
        type: 'dashed'
      },
      crossStyle: {
        color: '#00aecd'
      },
      shadowStyle: {
        // Shadow indicator style settings
        color: 'rgba(200,200,200,0.3)'
      }
    }
  },

  // Area scaling controller
  dataZoom: {
    dataBackgroundColor: '#eee', // Data background color
    fillerColor: 'rgba(144,197,237,0.2)', // Fill the color
    handleColor: '#00aecd' // Handle color
  },

  timeline: {
    lineStyle: {
      color: '#00aecd'
    },
    controlStyle: {
      color: '#00aecd',
      borderColor: '00aecd'
    }
  },

  candlestick: {
    itemStyle: {
      color: '#00aecd',
      color0: '#a2d4e6'
    },
    lineStyle: {
      width: 1,
      color: '#00aecd',
      color0: '#a2d4e6'
    },
    areaStyle: {
      color: '#b21ab4',
      color0: '#0b5ea8'
    }
  },

  chord: {
    padding: 4,
    itemStyle: {
      color: '#b21ab4',
      borderWidth: 1,
      borderColor: 'rgba(128, 128, 128, 0.5)'
    },
    lineStyle: {
      color: 'rgba(128, 128, 128, 0.5)'
    },
    areaStyle: {
      color: '#0b5ea8'
    }
  },

  graph: {
    itemStyle: {
      color: '#b21ab4'
    },
    linkStyle: {
      color: '#2a2073'
    }
  },

  map: {
    itemStyle: {
      color: '#c12e34'
    },
    areaStyle: {
      color: '#ddd'
    },
    label: {
      color: '#c12e34'
    }
  },

  gauge: {
    axisLine: {
      lineStyle: {
        color: [
          [0.2, '#dddddd'],
          [0.8, '#00aecd'],
          [1, '#f5ccff']
        ],
        width: 8
      }
    }
  }
};

@Component({
  selector: 'app-patient-rechercher',
  templateUrl: './patient-rechercher.component.html',
  styleUrls: ['./patient-rechercher.component.scss']
})
export class PatientRechercherComponent implements OnInit {

  theme: string | ThemeOption;
  coolTheme = CoolTheme;
  options:any = {
    title: {
      text: 'Diagramme des patients',
      subtext: 'Patologie',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      x: 'center',
      y: 'bottom',
      data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
    },
    calculable: true,
    series: [
      {
        name: 'pourcentage',
        type: 'pie',
        radius: [30, 110],
        roseType: 'area',
        data: [
          { value: 60, name: 't' },
          { value: 60, name: 'z' },
          { value: 60, name: 'x' },
          { value: 5, name: 'rose2' },
          { value: 15, name: 'rose3' },
          { value: 25, name: 'russie' },
          { value: 20, name: 'espagne' },
          { value: 35, name: 'angletterre' },
          { value: 30, name: 'france' },
          { value: 40, name: 'cote ivoire' }
        ]
      }
    ]
  };


  //
  options1: any;
  serie: ApexAxisChartSeries;
  serie2:ApexNonAxisChartSeries;
  chart: ApexChart;

  constructor() { }

  ngOnInit(): void {
    const xAxisData = [];
    const data1 = [];
    const data2 = [];

    for (let i = 0; i < 100; i++) {
      xAxisData.push('category' + i);
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }

    this.options1 = {
      legend: {
        data: ['bar', 'bar2'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: 'bar',
          type: 'bar',
          data: data1,
          animationDelay: (idx) => idx * 10,
        },
        {
          name: 'bar2',
          type: 'bar',
          data: data2,
          animationDelay: (idx) => idx * 10 + 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
    };



    this.serie = [
      {
        name: "diaby",
        data: [12, 10, 19]
      },
      {
        name: "ibo",
        data: [11, 4, 29]
      },
     
    ]
  
    this.chart = {
      height: 350,
      width: 300,
      type: 'bar',
      toolbar: {
        show: false,
      }
    }
  }

}
