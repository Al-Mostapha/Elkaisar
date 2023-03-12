var BoxMid = {};

BoxMid.box = function (title, navBar, content){
    
    
    var navBarList = "";
    
    for(var iii in navBar){
        
        navBarList += `<li class="font-2" data-nav-tag="${navBar[iii].title}">${navBar[iii].txt}</li>`;
        
    }
    
    
    var box = ` <div id="Box-mid">
                    <div class="title font-2">
                        ${title}
                    </div>
                    <div class="box-close">
                        <button></button>
                    </div>
                    <div class="nav-bar">
                        <ul>
                            ${navBarList}
                        </ul>
                    </div>
                    <div class="content-wrapper">  
                        ${content}
                    </div>
                </div>`;
    
    $("body").append(box);
    
};

BoxMid.close = function (){
    $("#Box-mid").remove();
};


$(document).on("click", "#Box-mid .box-close button" , BoxMid.close);




$(document).on("click", "#Box-mid .nav-bar ul li", function (){
    
    $("#Box-mid .nav-bar ul .selected").removeClass("selected");
    $(this).addClass("selected");
    
    var navTag = $(this).attr("data-nav-tag");
    
    
    if(navTag === "god-gate-1")
        GodGate.rank("gate_1", 0);
    else if(navTag === "god-gate-2")
        GodGate.rank("gate_2", 0);
    else if(navTag === "god-gate-3")
        GodGate.rank("gate_3", 0);
    else if(navTag === "god-gate-4")
        GodGate.rank("gate_4", 0);
    
});