/*
#91badb
#3fd755
#fb6eff

#8338ec
#0c2722
#40dff4

#db396a
#eda03c
#d31111

#14BEA0
#1534be
*/
function initTokenChart() {
    console.log("init token chart");
    const pieData = [
{
"category": "Pre-seed sale",
"ML": "2500000",
"color": "#91badb"
},{
"category": "Seed sale",
"ML": "54600000",
"color": "#3fd755"
},{
"category": "Strategic sale - Long Vesting",
"ML": "52000000",
"color": "#fb6eff"
},{
"category": "Strategic sale - Short Vesting",
"ML": "26000000",
"color": "#8338ec"
},{
"category": "Marketing and Listing",
"ML": "48000000",
"color": "#0c2722"
},{
"category": "Protocol Development",
"ML": "40000000",
"color": "#40dff4"
},{
"category": "Community Incentives",
"ML": "20000000",
"color": "#db396a"
},{
"category": "Team and Advisors",
"ML": "50000000",
"color": "#eda03c"
},{
"category": "Company Reserve",
"ML": "106900000",
"color": "#d31111"
}
];

// We could use also a csv as data input
    const unlockChartData = [
//##############################
{
"category":"TGE",
"Marketing and listing":5760000,
"Seed":5460000,
"Strategic-Short":2600000,
"Community incentives":2000000,
"Team and advisors":0,
"Protocol Development":0,
"Pre-Seed":0,
"Company reserves":0,
"Strategic-Long":0
},{
"category":"2 months",
"Marketing and listing":9600000,
"Seed":8736000,
"Strategic-Short":4160000,
"Community incentives":3000000,
"Team and advisors":0,
"Protocol Development":0,
"Pre-Seed":0,
"Company reserves":0,
"Strategic-Long":0
},{
"category":"3 months",
"Marketing and listing":13440000,
"Seed":12012000,
"Strategic-Short":5720000,
"Community incentives":4000000,
"Team and advisors":0,
"Protocol Development":0,
"Pre-Seed":0,
"Company reserves":0,
"Strategic-Long":0
},{
"category":"4 months",
"Marketing and listing":17280000,
"Seed":15288000,
"Strategic-Short":7280000,
"Community incentives":5000000,
"Team and advisors":0,
"Protocol Development":0,
"Pre-Seed":0,
"Company reserves":0,
"Strategic-Long":0
},{
"category":"5 months",
"Marketing and listing":21120000,
"Seed":18564000,
"Strategic-Short":8840000,
"Community incentives":6000000,
"Team and advisors":2500000,
"Protocol Development":2000000,
"Pre-Seed":125,
"Company reserves":2138000,
"Strategic-Long":1040000
},{
"category":"6 months",
"Marketing and listing":24960000,
"Seed":21840000,
"Strategic-Short":10400000,
"Community incentives":7000000,
"Team and advisors":5000000,
"Protocol Development":4000000,
"Pre-Seed":250,
"Company reserves":4276000,
"Strategic-Long":2080000
},{
"category":"7 months",
"Marketing and listing":28800000,
"Seed":25116000,
"Strategic-Short":11960000,
"Community incentives":8000000,
"Team and advisors":7500000,
"Protocol Development":6000000,
"Pre-Seed":375,
"Company reserves":6414000,
"Strategic-Long":3120000
},{
"category":"8 months",
"Marketing and listing":32640000,
"Seed":28392000,
"Strategic-Short":13520000,
"Community incentives":9000000,
"Team and advisors":10000000,
"Protocol Development":8000000,
"Pre-Seed":500,
"Company reserves":8552000,
"Strategic-Long":4160000
},{
"category":"9 months",
"Marketing and listing":36480000,
"Seed":31668000,
"Strategic-Short":15080000,
"Community incentives":10000000,
"Team and advisors":12500000,
"Protocol Development":10000000,
"Pre-Seed":625,
"Company reserves":10690000,
"Strategic-Long":5200000
},{
"category":"10 months",
"Marketing and listing":40320000,
"Seed":34944000,
"Strategic-Short":16640000,
"Community incentives":11000000,
"Team and advisors":15000000,
"Protocol Development":12000000,
"Pre-Seed":750,
"Company reserves":12828000,
"Strategic-Long":6240000
},{
"category":"11 months",
"Marketing and listing":44160000,
"Seed":38220000,
"Strategic-Short":18200000,
"Community incentives":12000000,
"Team and advisors":17500000,
"Protocol Development":14000000,
"Pre-Seed":875,
"Company reserves":14966000,
"Strategic-Long":7280000
},{
"category":"12 months",
"Marketing and listing":48000000,
"Seed":41496000,
"Strategic-Short":19760000,
"Community incentives":13000000,
"Team and advisors":20000000,
"Protocol Development":16000000,
"Pre-Seed":1000000,
"Company reserves":17104000,
"Strategic-Long":8320000
},{
"category":"13 months",
"Marketing and listing":48000000,
"Seed":44772000,
"Strategic-Short":21320000,
"Community incentives":14000000,
"Team and advisors":22500000,
"Protocol Development":18000000,
"Pre-Seed":1125000,
"Company reserves":19242000,
"Strategic-Long":9360000
},{
"category":"14 months",
"Marketing and listing":48000000,
"Seed":48048000,
"Strategic-Short":22880000,
"Community incentives":15000000,
"Team and advisors":25000000,
"Protocol Development":20000000,
"Pre-Seed":1250000,
"Company reserves":21380000,
"Strategic-Long":10400000
},{
"category":"15 months",
"Marketing and listing":48000000,
"Seed":51324000,
"Strategic-Short":24440000,
"Community incentives":16000000,
"Team and advisors":27500000,
"Protocol Development":22000000,
"Pre-Seed":1375000,
"Company reserves":25656000,
"Strategic-Long":12480000
},{
"category":"16 months",
"Marketing and listing":48000000,
"Seed":54600000,
"Strategic-Short":26000000,
"Community incentives":17000000,
"Team and advisors":30000000,
"Protocol Development":24000000,
"Pre-Seed":1500000,
"Company reserves":29932000,
"Strategic-Long":14560000
},{
"category":"17 months",
"Marketing and listing":48000000,
"Seed":54600000,
"Strategic-Short":26000000,
"Community incentives":18000000,
"Team and advisors":32500000,
"Protocol Development":26000000,
"Pre-Seed":1625000,
"Company reserves":34208000,
"Strategic-Long":16640000
},{
"category":"18 months",
"Marketing and listing":48000000,
"Seed":54600000,
"Strategic-Short":26000000,
"Community incentives":19000000,
"Team and advisors":35000000,
"Protocol Development":28000000,
"Pre-Seed":1750000,
"Company reserves":38484000,
"Strategic-Long":18720000
},{
"category":"19 months",
"Marketing and listing":48000000,
"Seed":54600000,
"Strategic-Short":26000000,
"Community incentives":20000000,
"Team and advisors":37500000,
"Protocol Development":30000000,
"Pre-Seed":1875000,
"Company reserves":42760000,
"Strategic-Long":20800000
},{
"category":"20 months",
"Marketing and listing":48000000,
"Seed":54600000,
"Strategic-Short":26000000,
"Community incentives":20000000,
"Team and advisors":40000000,
"Protocol Development":32000000,
"Pre-Seed":2000000,
"Company reserves":47036000,
"Strategic-Long":22880000
},{
"category":"21 months",
"Marketing and listing":48000000,
"Seed":54600000,
"Strategic-Short":26000000,
"Community incentives":20000000,
"Team and advisors":42500000,
"Protocol Development":34000000,
"Pre-Seed":2125000,
"Company reserves":51312000,
"Strategic-Long":24960000
},{
"category":"22 months",
"Marketing and listing":48000000,
"Seed":54600000,
"Strategic-Short":26000000,
"Community incentives":20000000,
"Team and advisors":45000000,
"Protocol Development":36000000,
"Pre-Seed":2250000,
"Company reserves":55588000,
"Strategic-Long":27040000
},{
"category":"23 months",
"Marketing and listing":48000000,
"Seed":54600000,
"Strategic-Short":26000000,
"Community incentives":20000000,
"Team and advisors":47500000,
"Protocol Development":38000000,
"Pre-Seed":2375000,
"Company reserves":59864000,
"Strategic-Long":29120000
},{
"category":"24 months",
"Marketing and listing":48000000,
"Seed":54600000,
"Strategic-Short":26000000,
"Community incentives":20000000,
"Team and advisors":50000000,
"Protocol Development":40000000,
"Pre-Seed":2500000,
"Company reserves":64140000,
"Strategic-Long":31200000
}
//##############################
];
    const chartGraph = [
    {
        "valueField": "Pre-Seed",
        "balloonText": "[[title]]: [[value]] ML",
        "fillAlphas": 0,
        "fillColors": "#11967f",
        "lineColor": "#11967f",
        "lineThickness": 2,
        "tabIndex": 0,
        "title": "Pre-seed"
    },{
        "valueField": "Seed",
        "balloonText": "[[title]]: [[value]] ML",
        "fillAlphas": 0,
        "fillColors": "#156CBE",
        "lineColor": "#156CBE",
        "lineThickness": 2,
        "title": "Seed"
    },{
        "valueField": "Marketing and listing",
        "balloonText": "[[title]]: [[value]] ML",
        "fillAlphas": 0,
        "fillColors": "#3FD755",
        "lineColor": "#3FD755",
        "lineThickness": 2,
        "title": "Marketing and Listing"
    },{
        "valueField": "Protocol Development",
        "balloonText": "[[title]]: [[value]] ML",
        "fillAlphas": 0,
        "fillColors": "#8315BE",
        "lineColor": "#8315BE",
        "lineThickness": 2,
        "title": "Protocol Development"
    },{
        "valueField": "Community incentives",
        "balloonText": "[[title]]: [[value]] ML",
        "fillAlphas": 0,
        "fillColors": "#DB396A",
        "lineColor": "#DB396A",
        "lineThickness": 2,
        "title": "Community Incentives"
    },{
        "valueField": "Company reserves",
        "balloonText": "[[title]]: [[value]] ML",
        "fillAlphas": 0,
        "fillColors": "#EDA03C",
        "lineColor": "#EDA03C",
        "lineThickness": 2,
        "title": "Company reserve"
    },{
        "valueField": "Team and advisors",
        "balloonText": "[[title]]: [[value]] ML",
        "fillAlphas": 0,
        "fillColors": "#ADE862",
        "lineColor": "#ADE862",
        "lineThickness": 2,
        "title": "Team and Advisors"
    },{
        "valueField": "Strategic-Short",
        "balloonText": "[[title]]: [[value]] ML",
        "fillAlphas": 0,
        "fillColors": "#1534BE",
        "lineColor": "#1534BE",
        "lineThickness": 2,
        "title": "Strategic-Short"
    },{
        "valueField": "Strategic-Long",
        "balloonText": "[[title]]: [[value]] ML",
        "fillAlphas": 0,
        "fillColors": "#14BEA0",
        "lineColor": "#14BEA0",
        "lineThickness": 2,
        "title": "Strategic-Long"
    },{
        "valueField": "Launchpool-Seed UNUSED",
        "balloonText": "[[title]]: [[value]] ML",
        "fillAlphas": 0,
        "fillColors": "#3fd755",
        "lineColor": "#3fd755",
        "fixedColumnWidth": 0,
        "lineThickness": 2,
        "title": "Fair Launch"
    },{
        "valueField": "Website presale  UNUSED",
        "balloonText": "[[title]]: [[value]] ML",
        "fillAlphas": 0,
        "fillColors": "#11967f",
        "lineColor": "#11967f",
        "lineThickness": 2,
        "title": "Public sale"
    }
];
    // if ( typeof hasAmChart !== 'undefined' && hasAmChart ){
        // CLONING DATA FOR MOBILE GRAPH WITHOUT OBJECT REFERENCE
        const chartGraphM = JSON.parse(JSON.stringify(chartGraph));

        AmCharts.makeChart("chartdivPie", {
            "responsive": {
                "enabled": true
            },
            "type": "pie",
            "balloonText": "[[title]]<br>[[percents]]%<br>[[value]] ML",
            "innerRadius": "65%",
            "labelRadius": 0,
            "pullOutRadius": "10%",
            //"colors": pieColors,
            "groupedAlpha": 0,
            "groupedColor": "undefined",
            "groupedDescription": "",
            "labelColorField": "#0C2722",
            "labelsEnabled": false,
            "labelTickColor": "#0C2722",
            "marginBottom": 0,
            "marginTop": 0,
            "outlineAlpha": 1,
            "outlineColor": "#ECF3F2",
            "outlineThickness": 4,
            "pullOutDuration": 0.2,
            "pullOutEffect": "easeOutSine",
            "pullOutOnlyOne": true,
            "startDuration": 0.5,
            "startEffect": "easeOutSine",
            "titleField": "category",
            "valueField": "ML",
            "accessibleTitle": "",
            "fontFamily": "Inter",
            "fontSize": 12,
            "allLabels": [],
            "balloon": {
                "borderThickness": 0,
                "color": "#FFFFFF",
                "fillAlpha": 0.85,
                "fillColor": "#0C2722",
                "horizontalPadding": 12,
                "verticalPadding": 12
            },
            "titles": [],
            "dataProvider": pieData,
            "colorField": "color",
        });

        AmCharts.makeChart("chartdiv", {
            "responsive": {
                "enabled": true
            },
            "type": "serial",
            "usePrefixes": true,
            "categoryField": "category",
            "marginBottom": 0,
            "plotAreaBorderColor": "#0C2722",
            "startDuration": 0.1,
            "startEffect": "easeInSine",
            "backgroundAlpha": 0,
            "color": "currentColor",
            "fontFamily": "Gilroy",
            "fontSize": 12,
            "theme": "default",
            "hideCredits": true,
            "legend": {
                "markerSize": 0,
                "fontSize": 0,
                "position": "absolute",
                valueFunction: (i) => {
                    if (!i.index) return;
                    Object.keys(unlockChartData[i.index]).map((key) => {
                        if ($(`[data-chart-legend="${key.toLocaleLowerCase()}"]`).length === 0) return;
                        $(`[data-chart-legend="${key.toLocaleLowerCase()}"] [data-chart-legend-val]`).text(unlockChartData[i.index][key].toLocaleString('en-US'))
                    })
                },
            },
            "categoryAxis": {
                "autoRotateAngle": 0,
                "classNameField": "category-axis-class",
                "gridPosition": "start",
                "startOnAxis": true,
                "axisAlpha": 0,
                "axisColor": "#A5C0BD",
                "color": "currentColor",
                "firstDayOfWeek": 0,
                "fontSize": 12,
                "gridColor": "#A5C0BD",
                "gridThickness": 0,
                "labelOffset": 16,
                "labelRotation": 90,
                "minHorizontalGap": 72,
                "minVerticalGap": 33
            },
            "chartCursor": {
                "enabled": true,
                "animationDuration": 0,
                "bulletsEnabled": true,
                "categoryBalloonAlpha": 0.87,
                "categoryBalloonColor": "#0C2722",
                "cursorAlpha": 0.8,
                "cursorColor": "#A5C0BD",
                "cursorPosition": "mouse",
                "graphBulletAlpha": 0,
                "leaveAfterTouch": false,
                "selectionAlpha": 0,
                "valueLineAlpha": 0,
                "zoomable": false
            },
            "trendLines": [],
            "graphs": chartGraph,
            "guides": [],
            "valueAxes": [
                {
                    "id": "ValueAxis-1",
                    "maximum": 400000000,
                    "stackType": "regular",
                    "autoGridCount": false,
                    "axisColor": "#A5C0BD",
                    "axisThickness": 0,
                    "gridColor": "#A5C0BD",
                    "labelOffset": 16,
                    "tickLength": 0,
                    "title": "",
                    "titleRotation": 0
                }
            ],
            "allLabels": [],
            "balloon": {
                "animationDuration": 0,
                "borderAlpha": 0,
                "borderThickness": 0,
                "color": "currentColor",
                "disableMouseEvents": false,
                "fadeOutDuration": 0,
                "fillAlpha": 0.86,
                "fillColor": "#0C2722",
                "fixedPosition": false,
                "fontSize": 12,
                "horizontalPadding": 12,
                "pointerOrientation": "left",
                "shadowAlpha": 0,
                "showBullet": true,
                "textAlign": "left",
                "verticalPadding": 6
            },
            "titles": [],
            "dataProvider": unlockChartData
        });

        AmCharts.makeChart("chartdivMobile", {
            "type": "serial",
            "categoryField": "category",
            "marginBottom": 0,
            "startDuration": 0.1,
            "startEffect": "easeInSine",
            "backgroundAlpha": 0,
            "color": "currentColor",
            "fontFamily": "Gilroy",
            "fontSize": 12,
            "theme": "default",
            "usePrefixes": true,
            "hideCredits": true,
            "categoryAxis": {
                "autoRotateAngle": 0,
                "classNameField": "category-axis-class",
                "gridPosition": "start",
                "startOnAxis": true,
                "axisAlpha": 0,
                "axisColor": "#A5C0BD",
                "color": "currentColor",
                "firstDayOfWeek": 0,
                "fontSize": 12,
                "gridColor": "#A5C0BD",
                "gridThickness": 0,
                "labelOffset": 16,
                "labelRotation": 90
            },
            "legend": {
                "markerSize": 0,
                "fontSize": 0,
                "position": "absolute",
                valueFunction: (i) => {
                    if (!i.index) return;
                    Object.keys(unlockChartData[i.index]).map((key) => {
                        if ($(`[data-chart-legend="${key.toLocaleLowerCase()}"]`).length === 0) return;
                        $(`[data-chart-legend="${key.toLocaleLowerCase()}"] [data-chart-legend-val]`).text(unlockChartData[i.index][key].toLocaleString('en-US'))
                    })
                },
            },
            "chartCursor": {
                "enabled": true,
                "animationDuration": 0,
                "bulletsEnabled": true,
                "categoryBalloonAlpha": 0.87,
                "categoryBalloonColor": "#0C2722",
                "cursorAlpha": 0.8,
                "cursorColor": "#A5C0BD",
                "cursorPosition": "mouse",
                "graphBulletAlpha": 0,
                "leaveAfterTouch": false,
                "selectionAlpha": 0,
                "valueLineAlpha": 0,
                "zoomable": false
            },
            "trendLines": [],
            "graphs": chartGraphM,
            "guides": [],
            "valueAxes": [
                {
                    "id": "ValueAxis-1",
                    "maximum": 400000000,
                    "stackType": "regular",
                    "autoGridCount": false,
                    "axisColor": "#A5C0BD",
                    "axisThickness": 0,
                    "gridColor": "#A5C0BD",
                    "labelOffset": 16,
                    "tickLength": 0,
                    "title": "",
                    "titleRotation": 0
                }
            ],
            "allLabels": [],
            "balloon": {
                "animationDuration": 0,
                "borderAlpha": 0,
                "borderThickness": 0,
                "color": "currentColor",
                "disableMouseEvents": false,
                "fadeOutDuration": 0,
                "fillAlpha": 0.86,
                "fillColor": "#0C2722",
                "fixedPosition": false,
                "fontSize": 12,
                "horizontalPadding": 12,
                "pointerOrientation": "left",
                "shadowAlpha": 0,
                "showBullet": true,
                "textAlign": "left",
                "verticalPadding": 6
            },
            "titles": [],
            "dataProvider": unlockChartData
        });

        chartGraph.map((item) => {
            Object.keys(item).map((key) => {
                if (key === "valueField") {
                    if ($(`[data-chart-legend="${item[key].toLocaleLowerCase()}"]`).length === 0) return;
                    $(`[data-chart-legend="${item[key].toLocaleLowerCase()}"] .dot`).css('background-color', item["lineColor"])
                }
            })
        })
};
