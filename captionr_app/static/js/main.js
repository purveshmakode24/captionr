//------Customs-------->

// loading button
function analyzing() {
    // document.getElementById("analyze").innerHTML = "<i  class='fa fa-spin fa-spinner'></i> Analyzing...";
    document.getElementById("analyze").innerHTML = "<i class='fas fa-spinner fa-pulse'></i> Analyzing...";
    document.getElementById("analyze").disabled = true;
    // document.getElementById("analyze").classList.add("no-hover");
    document.getElementById("analyze").style.backgroundColor = "#bbb";
    document.getElementById("analyze").style.color = "black";
    document.getElementById("analyze").style.fontSize = "16px";
    // document.getElementById("analyze").style.fontWeight = "bold";
    document.body.style.backgroundColor = "#ebebeb";

}

// window.onhashchange = function() {
//     document.getElementById("analyze").innerHTML = "<i  class='fa fa-spin'></i> Analyze";
//     document.getElementById("analyze").disabled = true;
//    }


// window.onbeforeunload = function() {
//     document.getElementById("analyze").innerHTML = "<i  class='fa fa-spin'></i> Analyze";
// }