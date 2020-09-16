function GraphMode(graphData, darkMode) {
    const y_dataA = graphData.map(obj => 100 * (obj.gained / obj.total));
    const y_dataOT = graphData.map((_, index) => {
        return (graphData.slice(0, index + 1).map(a => a.gained).reduce((acc, curr) => acc + curr) / graphData.slice(0, index + 1).map(a => a.total).reduce((acc, curr) => acc + curr)) * 100;
    });
    var x_data = graphData.map(obj => obj.name);
    var child_nodes = document.querySelector(".tab-content.with-charts").childNodes
    for (var i = 0; i < child_nodes.length; i++) {
        child_nodes[0].remove();
    }
    const chart = document.querySelector(".tab-content.with-charts")
    chart.id = "container";
    chart.style.width = "100%";
    let progressChart = document.querySelectorAll("h3");
    for (let i = 0; i < progressChart.length; i++) {
        if (progressChart[i].innerHTML === "Progress Chart") {
            progressChart[i].remove();
            break;
        }

    }
    let chart_script_location = document.querySelectorAll("div");
    for (let i = 0; i < chart_script_location.length; i++) {
        if (chart_script_location[i].id == "container") {
            chart_script_location = chart_script_location[i];
            break;
        }
    }
    document.querySelectorAll(".nav.nav-tabs")[1].remove();
    if (darkMode) {
        Highcharts.theme = {
            colors: ['#7798BF', '#aaeeee'],
            chart: {
                backgroundColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 1,
                        y2: 1
                    },
                    stops: [
                        [0, '#2a2a2b'],
                        [1, '#3e3e40']
                    ]
                },
                style: {
                    fontFamily: '\'Unica One\', sans-serif'
                },
                plotBorderColor: '#606063'
            },
            title: {
                style: {
                    color: '#E0E0E3',
                    textTransform: 'uppercase',
                    fontSize: '20px'
                }
            },
            subtitle: {
                style: {
                    color: '#E0E0E3',
                    textTransform: 'uppercase'
                }
            },
            xAxis: {
                gridLineColor: '#707073',
                labels: {
                    style: {
                        color: '#E0E0E3'
                    }
                },
                lineColor: '#707073',
                minorGridLineColor: '#505053',
                tickColor: '#707073',
                title: {
                    style: {
                        color: '#A0A0A3'
                    }
                }
            },
            yAxis: {
                gridLineColor: '#707073',
                labels: {
                    style: {
                        color: '#E0E0E3'
                    }
                },
                lineColor: '#707073',
                minorGridLineColor: '#505053',
                tickColor: '#707073',
                tickWidth: 1,
                title: {
                    style: {
                        color: '#A0A0A3'
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                style: {
                    color: '#F0F0F0'
                }
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        color: '#F0F0F3',
                        style: {
                            fontSize: '13px'
                        }
                    },
                    marker: {
                        lineColor: '#333'
                    }
                },
                boxplot: {
                    fillColor: '#505053'
                },
                candlestick: {
                    lineColor: 'white'
                },
                errorbar: {
                    color: 'white'
                }
            },
            legend: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                itemStyle: {
                    color: '#E0E0E3'
                },
                itemHoverStyle: {
                    color: '#FFF'
                },
                itemHiddenStyle: {
                    color: '#606063'
                },
                title: {
                    style: {
                        color: '#C0C0C0'
                    }
                }
            },
            credits: {
                style: {
                    color: '#666'
                }
            },
            labels: {
                style: {
                    color: '#707073'
                }
            },
            drilldown: {
                activeAxisLabelStyle: {
                    color: '#F0F0F3'
                },
                activeDataLabelStyle: {
                    color: '#F0F0F3'
                }
            },
            navigation: {
                buttonOptions: {
                    symbolStroke: '#DDDDDD',
                    theme: {
                        fill: '#505053'
                    }
                }
            },
            rangeSelector: {
                buttonTheme: {
                    fill: '#505053',
                    stroke: '#000000',
                    style: {
                        color: '#CCC'
                    },
                    states: {
                        hover: {
                            fill: '#707073',
                            stroke: '#000000',
                            style: {
                                color: 'white'
                            }
                        },
                        select: {
                            fill: '#000003',
                            stroke: '#000000',
                            style: {
                                color: 'white'
                            }
                        }
                    }
                },
                inputBoxBorderColor: '#505053',
                inputStyle: {
                    backgroundColor: '#333',
                    color: 'silver'
                },
                labelStyle: {
                    color: 'silver'
                }
            },
            navigator: {
                handles: {
                    backgroundColor: '#666',
                    borderColor: '#AAA'
                },
                outlineColor: '#CCC',
                maskFill: 'rgba(255,255,255,0.1)',
                series: {
                    color: '#7798BF',
                    lineColor: '#A6C7ED'
                },
                xAxis: {
                    gridLineColor: '#505053'
                }
            },
            scrollbar: {
                barBackgroundColor: '#808083',
                barBorderColor: '#808083',
                buttonArrowColor: '#CCC',
                buttonBackgroundColor: '#606063',
                buttonBorderColor: '#606063',
                rifleColor: '#FFF',
                trackBackgroundColor: '#404043',
                trackBorderColor: '#404043'
            }
        };
        Highcharts.setOptions(Highcharts.theme)
    };
    Highcharts.chart('container', {
        chart: {
            zoomType: 'xy'
        },
        title: {
            text: 'Progress Chart'
        },
        xAxis: [{
            categories: x_data,
            crosshair: true
        }],
        yAxis: [{
            labels: {
                format: '{value}%',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            max: 100,
            min: 0,
            tickInterval: 10,
            minorTickInterval: 2.5,
            type: 'linear',
            title: {
                text: 'Grade Percent',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            }
        }, {
            opposite: true,
            labels: {
                format: '{value}%'
            },
            title: {
                text: null
            }
        }],
        tooltip: {
            shared: true
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            x: 0,
            verticalAlign: 'top',
            y: 0,
            floating: true,
            backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || // theme
                'rgba(255,255,255,0.25)'
        },
        series: [{
            name: 'Assignment Grade',
            type: 'column',
            data: y_dataA,
            yAxis: 0,
            tooltip: {
                valueSuffix: '%'
            }

        }, {
            name: 'Grade Over Time',
            type: 'spline',
            data: y_dataOT,
            tooltip: {
                valueSuffix: '%'
            }
        }]
    });
}
function Grader_Tasks(){
    //Gather Mangebacs data
    const scores = Array.from(document.querySelectorAll(".line")).filter(line => isNaN(line.querySelector(".label-score"))).reverse();
    if(scores.length === 0){return;}
    const data = scores.map(score => {
        let obj = {};
        obj.name = score.querySelector(".title").innerText;
        let temp = score.querySelector("a").href.split("/");
        obj.id = temp[temp.length - 1];
        obj.date = `${score.querySelector(".month").innerHTML}. ${score.querySelector(".day").innerText}`;
        if (score.querySelector(".label.label-score").innerText.search("/") == -1) {
            obj.gained = Number(score.childNodes[1]);
            obj.total = Number(scores.childNodes[3]);
        } else {
            let lm = score.querySelector(".label.label-score").innerText.split("/");
            obj.gained = Number(lm[0]);
            obj.total = Number(lm[1]);
        }
        return obj;
    });
    const dataScoreSort = data.slice();
    dataScoreSort.sort(function (a, b) {
        a = a.total - a.gained;
        b = b.total - b.gained;
        if (a > b) {
            return -1;
        } else if (a < b) {
            return 1;
        }
        return 0;
    });
    let total_score = (data.map(a => a.gained)).reduce((acc, curr) => acc + curr);
    let total_potential = data.map(a => a.total).reduce((acc, curr) => acc + curr);
    let percentage = `${(total_score / total_potential) * 100}%`;
    if (!isNaN(total_score / total_potential)) {
        //fing out upcoming content to insert code before
        const after = document.querySelector('.agenda').childNodes[0];
        //create element for percent and information
        const percentage_html = document.createElement("h3");
        //add content
        percentage_html.innerHTML = total_score < total_potential ? `${percentage} (${total_score}/${total_potential})` : "100% Good Job";
        percentage_html.id = "percentage-text";
        document.querySelector('.agenda').insertBefore(percentage_html, after);
        if (total_score !== total_potential) {
            const greatest_effect_assignment = document.createElement("p");
            greatest_effect_assignment.id = "greatest-effect";
            greatest_effect_assignment.innerHTML = `Most Important Assignment: ${dataScoreSort[0].name}\n(Was Due on: ${dataScoreSort[0].date}, Affects Grade: ${total_score / total_potential - (dataScoreSort[0].total-data[0].gained +total_score) / total_potential}%)`;
            //Create List of assignments with points lost
            const assignment_list = document.createElement("p");
            let assignment_list_string = "Assignments in order of greatest effect:<br/>".bold();
            scores.forEach((element) => {
                let id = element.querySelector("a").href.split("/");
                element.id = id[id.length - 1];
            });
            dataScoreSort.filter(part => part.gained < part.total).forEach(pointlost => {
                assignment_list_string += `${pointlost.name} (Was Due on: ${pointlost.date}, Affects Grade: ${(total_score / total_potential - (pointlost.total - pointlost.gained + total_score) / total_potential) * 100}%)<br/>`;
            });
            assignment_list.innerHTML = assignment_list_string;
            assignment_list.style.display = "none";
            assignment_list.id = "assignment-list";
            document.querySelector('.agenda').insertBefore(greatest_effect_assignment, after);

            //create button
            const button = document.createElement('button');
            button.innerText = "List of Assignments";
            button.id = 'get_list';
            button.onclick = function () {
                let displayed = document.getElementById("assignment-list");
                if (displayed.style.display === "none") {
                    displayed.style.display = "block";
                    button.innerText = "Hide";
                } else {
                    displayed.style.display = "none";
                    button.innerText = "List of Assignments";
                }
            };
            button.style = "background-color:#4b8efa;color: white;border-radius: 5px;";
            document.querySelector('.agenda').insertBefore(button, after);
            document.querySelector('.agenda').insertBefore(assignment_list, after)
        }
        chrome.storage.sync.get({
                darkMode: false,
                graphMode: true
            },
            function (items) {
                if (items.graphMode) {
                    GraphMode(data, items.darkMode);
                }
            });

    }
    return;
}
var targetNode = document.querySelector("head");
var observer = new MutationObserver(function (mutations) {
    if (document.querySelectorAll(".nav li.active").length > 0){
        if (window.location.href.search('core_tasks') != -1 &&
            document.querySelector(".nav li.active").innerText == "Tasks & Units" &&
            document.querySelectorAll("#percentage-text").length === 0 &&
            document.querySelectorAll(".line").length > 0) {Grader_Tasks();}
    }
});
var config = {
    attributes: false,
    childList: true,
    subtree: true,
    characterData: false
};
observer.observe(targetNode, config);
