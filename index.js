// const arr =[11,22,12,44,45,66,77,99,110,130,150,170,200,230,250,270,290,300,350,380,400,430,450,500,510,530,550,590,620,640,660,700];

let height = 500;
let width = 1000;
let barwidth = 50;
let offset = 5;
const svg = d3.select("body").append("div").classed("svg-container", true).attr("preserveAspectRatio", "xMinYMin meet")
              .attr("viewBox", "0 0 600 400")
              .append("svg")
              .attr("class","svg-content-responsive")
              .attr("width",2000)
              .attr("height",1500)
              // .style("background-color","black");
function color(){
  var letters = "0123456789ABCDEF"
  var color = "#"
    for(var  i = 0; i<6; i++){
      color += letters[Math.floor(Math.random() * 16)]
    }
  return color;
}
function colors(){
  let letters = "FEDCBA9876543210";
  var color = "#"
  for(var i = 0; i<6; i++){
    color += letters[Math.floor(Math.random() * 16 )]
  }
  return color;
}

// let yScale = d3.scaleLinear().domain([0,d3.max(arr)]).range([height,0])
// let xScale = d3.scaleBand().domain(arr).range([0,width]);
// let yAxis = d3.axisLeft(yScale).ticks(5)
//
// let graph = svg.append("g").attr("transform",'translate(70,110)')
//    graph.selectAll("rect").attr("class","barchart").data(arr).enter().append("rect")
//    .attr("height",function(d,i){
//      return yScale(d);
//    })
//    .attr("width",function(d,i){
//      return xScale.bandwidth();
//    })
//    .attr("x",function(d,i){
//      return xScale(d)
//    })
//    .attr("y",function(d,i){
//       return  height -  yScale(d)
//    })
//    .attr("fill",function(d,i){
//      return color(i)
//    })
//
//   d3.select(".svg-container svg").append("g").attr("transform","translate(61,110)")
//                   .call(yAxis)



  d3.json("data.json").then(d=>{

    let data =  d.map(d=>parseInt(d.close))
    let date =  d.map(d=>new Date(d.date))

    const db  = d3.pie().sort(null).value(d=>d)(data);

    const segment1 = d3.arc().innerRadius(21).outerRadius(315).padAngle(20).padRadius(20);

    let seg = svg.append("g").attr("transform","translate(999,700)").attr("class","node")
     let graph =seg.append("g").attr("transform","translate(510,-250)").attr("class","pie")
                  graph.selectAll("path").data(db).enter().append("path")
                  .attr("d",segment1)
                  .attr("fill",(d,i)=>{
                    return color(i)
                  })
                  .transition()
                  .duration(function(d,i){
                    return i;
                  })
                  .attr("fill",function(d,i){
                    return colors(i)
                  })

                  let yScale = d3.scaleLinear().domain([0,d3.max(data)]).range([height,0])
                  let xScale = d3.scaleBand().domain(data).range([0,width]);
                  let yAxis = d3.axisLeft(yScale).ticks(5)
                  let xValues = d3.scaleTime()
                                  .domain([date[0],date[(date.length - 1)]])
                                  .range([0,width])
                  let xAxis   = d3.axisBottom(xValues).ticks(d3.timeDay.every(1))

let code = svg.append("g").attr("transform","translate(70,110)").attr("class","db")
                     code.selectAll("rect").attr("class","barchart").data(data).enter().append("rect")
                     .attr("height",function(d,i){
                       return yScale(d);
                     })
                     .attr("width",function(d,i){
                       return xScale.bandwidth();
                     })
                     .attr("x",function(d,i){
                       return xScale(d)
                     })
                     .attr("y",function(d,i){
                        return  height -  yScale(d)
                     })
                     .attr("fill",function(d,i){
                       return color(i)
                     })

                    d3.select(".svg-container svg").append("g").attr("transform","translate(61,110)")
                                    .call(yAxis)
                    d3.select(".svg-container svg").append("g").attr("transform",`translate(61,${height}+50)`)
                    .call(xAxis)

  })
