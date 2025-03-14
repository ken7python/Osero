var kuro_kazu = 0;
var siro_kazu = 0;
var zi = document.getElementById("zi");

var tan = 2;
var aite = 1;

var masu = [
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,2,1,0,0,0],
    [0,0,0,1,2,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
];
var main = document.getElementById("main");
var ti = [];
var tis = [];

var View = new Vue({
    el: "#zi",
    data: {
        message: "",
        black: 2,
        white: 2,
    }
});

const show = new Audio("sound/show.mp3");

const BGM = new Audio("sound/BGM.mp3");

var size = 70;
function sakusei(){
    kuro_kazu = 0;
    siro_kazu = 0;
    main.innerHTML = " ";
    for (var j = 0;j < masu.length; j++){
        for (var i = 0;i < masu[j].length;i++){
            if (masu[j][i] == 1){
                kuro_kazu++;
            }
            if (masu[j][i] == 2){
                siro_kazu++;
            }
            
            main.innerHTML += "<img class="+ j.toString() + i.toString() +" src='img/" + masu[j][i] +".png' style='position:absolute;top:"+ j * size +"px;left:"+ i * size +"px;width: "+ size + "px; '>";
        }
    }

    //zi.innerHTML += "<p>黒の石の数："+ kuro_kazu+"</p>";
    //zi.innerHTML += "<p>白の石の数："+ siro_kazu+"</p>";

    View.black = kuro_kazu;
    View.white = siro_kazu;
    

    //console.log(masu);
    /*
    console.log(BlackPut() );
    console.log(WhitePut() );
    */
    var p = PutPlace().value;
    //console.log(p);
    for (var i=0;i<p.length;i++){
        var t = document.getElementsByClassName(p[i].toString() )[0];
        t.src = "img/yellow.png"
    }
}

function th(){
    //console.log("th");
    if (tan == 1 && WhitePut().count != 0 ){
        tan = 2;
        aite = 1;
        //zi.innerHTML = "<p>白の順番です。</p>";
    }
    else if(tan == 2 && BlackPut().count != 0 ){
        tan = 1;
        aite = 2;
        //zi.innerHTML = "<p>黒の順番です。</p>";
    }
    //console.log(tan);
    TurnView();

    if (tan == 2){
        //console.log("ai")
        ai();
    }
}

th();

function TurnView(){
    if (tan == 1){
        //zi.innerHTML = "<p>黒の順番です。</p>";
        View.message = "黒の順番です";
    }
    else if (tan == 2){
        //zi.innerHTML = "<p>白の順番です。</p>";
        View.message = "白の順番です";
    }

}

function toreru(tp,h1,h2){
    ti = [];
    var j = Number(tp[0]);
    var i = Number(tp[1]);
    var kabe = false;
        while(true){
            j += h1-0;
            i += h2-0;
            
            if (i == 8 || i == -1 || j == -1 || j == 8){
                kabe = true
            }
            if (kabe){
                break
            }
            else{
                tp_isi = masu[j][i];
                if (tp_isi == tan){
                    tis = tis.concat(ti);
                    ti = [];
                                
                    break
                }
                else{
                    if (tp_isi == 0){
                        break
                    }
                    else{
                        if (tp_isi == aite){
                            ti.push([j,i]);
                            if (tan == 1){
                                   kuro_okeru++;
                            }
                            if(tan == 2){
                                siro_okeru++;
                            }
                        }
                    }
                }
            }
        }
    }

var tiss = [];
var kuro_okeru = 0;
var siro_okeru = 0;
            
function toru(tp,h1,h2){
    tis = [];
    toreru(tp,h1,h2);
    if (tis.length != 0){
        masu[tp[0]][tp[1]] = tan;
        for(var i = 0;i < tis.length;i++){
            tiss.push(tis[i]);
            masu[tis[i][0]][tis[i][1]] = tan;
        }
    }
}

function toruTest(tp,h1,h2){
    tis = [];
    toreru(tp,h1,h2);
    if (tis.length != 0){
        //masu[tp[0]][tp[1]] = tan;
        for(var i = 0;i < tis.length;i++){
            tiss.push(tis[i]);
            //masu[tis[i][0]][tis[i][1]] = tan;
        }
    }
}

var okeru = false;

const ton = new Audio("sound/ton.mp3");

function oku(tp){
    tiss = [];
    okeru = false;
    tp_isi = masu[tp[0]][tp[1]];
    if(tp_isi == 0){
        toru(tp,0,1);
        toru(tp,0,-1);
        toru(tp,1,0);
        toru(tp,1,1);
        toru(tp,1,-1);
        toru(tp,-1,0);
        toru(tp,-1,-1);
        toru(tp,-1,1);

        //console.log(tiss)

        if (tiss.length != 0){
            console.log("Put");
            oba.push(tp);
            oke++;
            okeru = true;
            ton.play();
            th();

            sakusei();
                    
            if (kuro_kazu+siro_kazu == 64 || kuro_kazu == 0 || siro_kazu == 0 || (BlackPut().count == 0 && WhitePut().count == 0 ) ){
                BGM.pause();
                show.play();

                var a = document.getElementById("alertDiv");
                a.style.display = "block";

                var al = document.getElementById("alert");

                if (kuro_kazu > siro_kazu){
                    al.src = "img/BlackWin.png";
                }
                if (siro_kazu > kuro_kazu){
                    al.src = "img/WhiteWin.png";
                }
                if (kuro_kazu == siro_kazu){
                    al.src = "img/引き分け.png"
                }
            }
            else{
                setTimeout(ks,20);
            }
        }
    }
                
}

function okuTest(tp,tan_k,aite_k,masu_k){
    tiss = [];
    okeru = false;
    tp_isi = masu[tp[0]][tp[1]];
    if(tp_isi == 0){
        toruTest(tp,0,1);
        toruTest(tp,0,-1);
        toruTest(tp,1,0);
        toruTest(tp,1,1);
        toruTest(tp,1,-1);
        toruTest(tp,-1,0);
        toruTest(tp,-1,-1);
        toruTest(tp,-1,1);

        //console.log(tiss)

        if (tiss.length != 0){
            oba.push(tp);
            oke++;
            okeru = true;
            //th();
        }
    }
    
    tan = tan_k;
    aite = aite_k;
    masu = masu_k.concat() ;
    
}

function ks(){
    $("img").click(function(){
        var tp = $(this).attr("class");
        if (tan == 1){
            oku(tp);
        }
    });
            }
var oke = 0;
var oba = [];
            
function ob(masus){
    //console.log(masus);
    
    oke = 0;
    oba = [];
    
    for(j = 0;j < 8;j++){
        for(i = 0;i < 8;i++){
            okuTest(j.toString() + i.toString(),tan,aite,masus);
        }
    }

    masu = masus;

    //console.log(oke);
    //console.log(oba);

    //console.log(masu);
    return {"count": oke,"value": oba};
    
}


function BlackPut(){
    var t = tan;
    var a = aite;

    tan = 1;
    aite = 2;

    //console.log(masu);
    
    var v = ob(masu);

    tan = t;
    aite = a;
    return v;
}

function WhitePut(){
    var t = tan;
    var a = aite;

    tan = 2;
    aite = 1;

    //console.log(masu);
    
    var v = ob(masu);

    tan = t;
    aite = a;
    return v;
}

function PutPlace(){
    if (tan == 1){
        return BlackPut();
    }
    else if (tan == 2){
        return WhitePut();
    }
}

function start(){
    document.getElementById("start").style.display = "none"
    document.getElementById("zi").style.display = "block"

    BGM.play();
    BGM.loop = true;
    
    sakusei();
    //$("#zi").offset({ top: 50, left: 400 })
    ks();
}

//start();