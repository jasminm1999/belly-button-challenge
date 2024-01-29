function buildMetaData(sample) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        let metadata = data.metadata;
        let result = metadata.filter(sampleObj => sampleObj.id == sample)[0];

        let panel = d3.select("#sample-metadata");
        panel.html("")
        for (key in result) {
            panel.append("h6").text(`${key}: ${result[key]}` );
        }
        
}) 

 }

  function buildCharts(sample) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        let samples = data.samples;
        let result = samples.filter(sampleObj => sampleObj.id == sample)[0];
        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_lables;
        let sample_values = result.sample_values;

        // Bubble Chart
        let bubbleLayout = {
            title: "Test Bubble"
        };

        let bubbleData = [
            {
                x: otu_ids,
                y: sample_values,
                text: otu_labels,
                mode: "markers",
                marker: {
                    size: sample_values,
                    color: otu_ids
                }
            }
        ];

        Plotly.newPlot("bubble", bubbleData, bubbleLayout);


        //Bar Chart
        let ytics = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse()
        let barData = [
             {
                y: ytics,
                x: sample_values.slice(0,10).reverse(),
                text: otu_labels.slice(0,10).reverse(),
                type: "bar",
                orientation: "h"
    

            }
        ];

        let barLayout = {
            title: "Top 10 Bacterias",
            margin: { t: 30, 1: 150 }
        };
        Plotly.newPlot("bar", barData, barLayout)
    });
}

 
function init() {
    let selector = d3.select("#selDataset");

   
     d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
      let sampleNames = data.names;

     
      for (i = 0; i < sampleNames.length; i++) {
        selector
            .append("option")
            .text(sampleNames[i])
            .property("value", sampleNames[i]);
      };
     
      let firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetaData(firstSample);
   });
}
function optionChanged(newSample) {
    buildCharts(newSample);
    buildMetaData(newSample);
}
init();