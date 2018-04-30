$( document ).ready(function() {

  $('#day').click(function() {
    show_day();
  })
  $('#week').click(function() {
    show_week();
  })

  $('#month').click(function() {
    show_month();
  })

  $('#year').click(function() {
    show_year();
  })


});

anychart.onDocumentReady(function() {
   anychart.theme(anychart.themes.monochrome);
   var data;
   var chart = anychart.column();;
   show_current();
   show_day();

});

function show_people() {

  personsData = {
    datasets: [{
        data: [57]
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
        'People'
        // 'Yellow',
        // 'Blue'
    ]
  };


  var ctx = $("#people-graph");
  var pplChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [10, 20, 30]
      }],

      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: [
      'Red',
      'Yellow',
      'Blue'
      ]
    }

  })
};


 function show_current()
 {
   // document.getElementById("currentCapacity").innerHTML = "Current Capacity";
 }

 function show_day()
 {
   document.getElementById("graph").innerHTML = "";
	 // set the data
  data = {
    header: ["Name", "People"],
    rows: [
    ["7", number7],
    ["8", number8],
    ["9", number9],
    ["10", number10],
    ["11", number11],
    ["12", number12],
    ["13", number13],
    ["14", number14],
    ["15", number15],
    ["16", number16],
    ["17", number17],
    ["18", number18],
    ["19", number19],
    ["20", number20],
    ["21", number21],
    ["22", number22],
    ]};

        // create the chart
        chart = anychart.column();

        // add the data
        chart.data(data);

        // set the chart title
        chart.title("Number of people in gym");

        // draw
        chart.container("graph");
        chart.draw();
      }

      function show_week()
      {
       document.getElementById("graph").innerHTML = "";
	 // set the data
  data = {
    header: ["Name", "People"],
    rows: [
    ["Mon", week1],
    ["Tue", week2],
    ["Wed", week3],
    ["Thu", week4],
    ["Fri", week5],
    ["Sat", week6],
    ["Sun", week7]
    ]};

        // create the chart
        chart = anychart.column();

        // add the data
        chart.data(data);

        // set the chart title
        chart.title("Number of people in gym");

        // draw
        chart.container("graph");
        chart.draw();
      }

      function show_month()
      {
       document.getElementById("graph").innerHTML = "";
	 // set the data
  data = {
    header: ["Name", "People"],
    rows: [
    ["Jan", month1],
    ["Feb", month2],
    ["Mar", month3],
    ["Apr", month4],
    ["May", month5],
    ["Jun", month6],
    ["Jul", month7],
    ["Aug", month8],
    ["Sep", month9],
    ["Oct", month10],
    ["Nov", month11],
    ["Dec", month12],
    ]};

        // create the chart
        chart = anychart.column();

        // add the data
        chart.data(data);

        // set the chart title
        chart.title("Number of people in gym");

        // draw
        chart.container("graph");
        chart.draw();
      }

      function show_year()
      {
       document.getElementById("graph").innerHTML = "";
	 // set the data
  data = {
   header: ["Name", "People"],
   rows: [
   ["2018", year1],
   ]};

        // create the chart
        chart = anychart.column();

        // add the data
        chart.data(data);

        // set the chart title
        chart.title("Number of people in gym");

        // draw
        chart.container("graph");
        chart.draw();
      }