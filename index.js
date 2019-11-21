// const arr =[11,22,12,44,45,66,77,99,110,130,150,170,200,230,250,270,290,300,350,380,400,430,450,500,510,530,550,590,620,640,660,700];

let height = 500;
let width = 1000;
let barwidth = 50;
let offset = 5;
const svg = d3.select("body").append("div").classed("svg-container", true).attr("preserveAspectRatio", "xMinYMin meet")
              .attr("viewBox", "0 0 600 400")
              .append("svg")
              .attr("class","svg-content-responsive")
              .attr("width","100%")
              .attr("height",2500)
              // .style("background-color","black");
function color(){
  var letters = "0123456789ABCDEF"
  var color = "#"
    for(var  i = 0; i<6; i++){
      color += letters[Math.floor(Math.random() * 16)]
    }
  return color;
}
// function colors(){
//   let letters = "FEDCBA9876543210";
//   var color = "#"
//   for(var i = 0; i<6; i++){
//     color += letters[Math.floor(Math.random() * 16 )]
//   }
//   return color;
// }
let colors = d3.scaleOrdinal(d3['schemeSet3'])

let myCol = d3.scaleDiverging(d3.interpolateSpectral);
let tooltips = d3.select("body").append("div").attr("class","tootips");


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
    colors.domain(data)
    date.sort((a,b)=> new Date(a.date) - new Date(b.date))
    const db  = d3.pie().sort(null).value(d=>d)(data);
    const segment1 = d3.arc().innerRadius(181).outerRadius(315).padAngle(10).padRadius(2);
    const segment2 = d3.arc().innerRadius(281).outerRadius(515).padAngle(10).padRadius(2);
    let seg = svg.append("g").attr("transform","translate(999,700)").attr("class","node")
    let graph =  seg.append("g").attr("transform","translate(-444,290)").attr("class","pie")
                  graph.selectAll("path").data(db).enter().append("path")
                  .attr("d",segment1)
                  .attr("fill",(d,i)=>{
                    return color(i)
                  })
.on("mouseover",function(d,i,n){
                    tooltips.html("<p>The value of this bar is::"+data[i]+"</p>")
                            .style("top",function(d,i){
                              return d3.event.pageY - 105 + "px"
                            })
                            .style("left",function(d,i){
                              return d3.event.pageX - 30 + "px"
                            })
                            .transition()
                            .duration(i*30)
                            .delay(i * 20)
                            .style("opacity",.9)
                  })
                  .on("mouseout",function(d,i,n){
                    tooltips.html("")
                  })
                  .attr("fill",function(d,i){
                    return colors(i)
                  })

                  .transition()
                  .duration( (d,i) => i*10)
                  .delay(    (d,i) => i*5)
                  .attr("fill",function(d,i){
                    return color(i)
                  })

graph.selectAll("text").data(data).enter().append("text")
     .attr("x",1500)
     .attr("y",1000)
     .text((d,i)=>i)
     .style("color","#fff")
// ---------------------------------END PIe chart------------------------------------------
                  let yScale = d3.scaleLinear().domain([0,d3.max(data)]).range([height,0])
                  let xScale = d3.scaleBand().domain(data).range([0,width]);
                  let yAxis = d3.axisLeft(yScale).ticks(5)
                  let xValues = d3.scaleTime().domain([date[0], date[date.length - 1 ]]).range([0,width])
                  let xAxis = d3.axisBottom(xValues).ticks(25)

let code = svg.append("g").attr("transform","translate(70,110)").style("class","db")
                     code.selectAll("rect")
                         .attr("class","barchart")
                         .data(data).enter()
                         .append("rect")
                     .attr("height",function(d,i){
                      return yScale(d);
                     })
                     .attr("width",0)
                     .on("mouseover",function(d,i){
                           tooltips.html("<p>The value of this bar is::"+d+"</p>")
                                   .style("top",function(d,i){
                                     return d3.event.pageY - 105 + "px"
                                   })
                                   .style("left",function(d,i){
                                     return d3.event.pageX - 30 + "px"
                                   })
                                   .transition()
                                   .duration(30)
                                   .delay(i * 20)
                                   .style("opacity",.9)

                                   .attr("fill",function(d,i){
                                     return color(i)
                                   })


                     })
                     .on("mouseout",function(d,i,n){
                           tooltips.html("<p style='display:none;' ></p>")
                           .attr("fill",function(d,i){
                             return colors(i)
                           })
                           d3.select(n[i]).transition("otherout").duration(5).attr("fill",colors(i))
                     })
                     .on("click",function(d,i){
                       svg.append("g").attr("transform","translate(70,110)").style("class","db")
                       .selectAll("rect")
                               .attr("class","barchart")
                               .data(data).enter()
                               .append("rect")
                           .attr("height",function(d,i){
                            return yScale(d);
                           })
                           .attr("width",0)
                           .on("mouseover",function(d,i,n){
                                 tooltips.html("<p>The value of this bar is::"+d+"</p>")
                                         .style("top",function(d,i){
                                           return d3.event.pageY - 105 + "px"
                                         })
                                         .style("left",function(d,i){
                                           return d3.event.pageX - 30 + "px"
                                         })
                                         .transition()
                                         .duration(30)
                                         .delay(i * 20)
                                         .style("opacity",.9).attr("fill",color(i))
                                 d3.select(n[i]).transition("other").duration(5).attr("fill","grey")
                           })
                           .on("mouseout",function(d,i,n){
                                 tooltips.html("<p style='display:none;' ></p>")
                                 d3.select(n[i]).transition("otherout").duration(5).attr("fill",colors(i))
                           })
                           .attr("x",function(d,i){
                             if(i < 500){
                               return -1200
                             }else{
                              return 200
                             }
                           })
                           .attr("y",function(d,i){
                            if(i <= 200){
                              return 500
                            }else if(i <= 400 && i >= 200 ){
                             return -400
                            }
                            else if(i <= 600 && i >= 400 ){
                              return 700
                            }
                            else if(i <= 800 && i >= 600 ){
                              return -900
                           }
                           else if(i <= 1000 && i >= 800 ){
                            return 200
                           }
                           else if(i >=1000 ){
                            return -1000;
                           }
                          })
                           .attr("fill",function(d,i){
                             return color(i)
                            })
                          .transition()
                              .attr("y",function(d,i){
                                return  height -  yScale(d)
                              })
                            .attr("x",function(d,i){
                              return xScale(d)
                            })
                            .attr("width",function(d,i){
                              return xScale.bandwidth();
                             })
                            .duration((d,i)=>d*5)
                            .delay((d,i)=>d*5);
                     })
                     .attr("x",function(d,i){
                       if(i < 500){
                         return 200
                       }else{
                        return -1200
                       }
                     })
                     .attr("y",function(d,i){
                      if(i <= 200){
                        return 200
                      }else if(i <= 400 && i >= 200 ){
                       return -400
                      }
                      else if(i <= 600 && i >= 400 ){
                        return 400
                      }
                      else if(i <= 800 && i >= 600 ){
                        return 600
                     }
                     else if(i <= 1000 && i >= 800 ){
                      return -600
                     }
                     else if(i >=1000 ){
                      return -1000;
                     }
                    })
                     .attr("fill",function(d,i){
                       return colors(i)
                      })
                    .transition()
                        .attr("y",function(d,i){
                          return  height -  yScale(d)
                        })
                      .attr("x",function(d,i){
                        return xScale(d)
                      })
                      .attr("width",function(d,i){
                        return xScale.bandwidth();
                       })
                      .duration(d=>d*20)
                      .delay(60);
                      d3.select(".svg-container svg").append("g").attr("transform","translate(61,110)")
                      .call(yAxis)
                    d3.select(".svg-container svg").append("g").attr("transform",`translate(60,619)`)
                    .call(xAxis);

const areaGroup = code.append("g").attr("transform","translate(0,1300)").attr("class","group")
const yScaleA = d3.scaleLinear().domain([0, d3.max(data)]).range([height,0])
const xScaleA = d3.scaleBand().domain(data).range([0,width]);
const  area = d3.area().x(
                function(d,i){
                  return xScaleA((data[i]))
                })
                .y0(height)
                .y1(function(d,i){return yScaleA(d);});

                areaGroup.append("path").attr("d",area(data)).attr("fill",function(d,i){
                  return "none"
                }).style("stroke",(d,i)=>color(i)).style("stroke-width",4);
                d3.select(".svg-container svg").append("g").attr("transform","translate(65,1413)")
                .call(yAxis)
                d3.select(".svg-container svg").append("g").attr("transform",`translate(67,1914)`)
                .call(xAxis);
})

// just a simple logic browser relod every 30 seconds
// setTimeout(function() {
//   location.reload();
// }, 30000);
