function ten(n){
    return Math.floor(n / 10);
}
function one(n){
    return n % 10;
}

function countMasu(){
    var kuro_ka = 0;
    var siro_ka = 0;
    for (var j = 0;j < masu_kari.length; j++){
        for (var i = 0;i < masu_kari[j].length;i++){
            if (masu_kari[j][i] == 1){
                kuro_ka++;
            }
            if (masu_kari[j][i] == 2){
                siro_ka++;
            }
        }
    }

    return {"black": kuro_ka,"white": siro_ka};
}
//AI
var ai = function(){
    console.log("ai");
    var p = PutPlace();
    var v = p.value;
    //console.log(p);
    var scores = [];
    if (p.count > 0){
        for (var i=0;i<v.length;i++){
            var score = 0;
            vi = v[i];
            //console.log(vp);
            var vt = ten(vi)
            var vo = one(vi);

            console.log(vt,vo)
            //端好き
            if (vt == 0 || vt == 7){
                score += 500;
            }
            if (vo == 0 || vo == 7){
                score += 500;
            }

            //端を取られないように
            if( ( vt == 1 && (vo < 2 || vo > 5) )  || ( vt == 6 && (vo < 2 || vo > 5) )  ){
                score = -500;
            }
            if( ( vo == 1 && (vt < 2 || vt > 5)  ) || ( vo == 6 && (vt < 2 || vt > 5)  ) ){
                score = -500;
            }

            scores.push( {"place": vi,"score": score} );
        }

        console.log(scores);

        var high = scores[0].score;
        var highData;
        for (var i=0;i<scores.length;i++){
            if(scores[i].score >= high ){
                high = scores[i].score;
                highData = scores[i];
            }
        }

        console.log(highData);


        setTimeout(function(){
            oku( highData.place );
        } ,500);
    }
}