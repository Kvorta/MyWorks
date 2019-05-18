"use strict";
/**************************************************************/
function renderChess() {
    var HTML = '';
    for ( var e=0; e<8; e++ ) {
        for ( var s=0; s<8; s++ ) {
            if ((e+s)%2 === 0 ) {
                HTML += '<div class="cell" ></div>';
            } else {
                HTML += '<div class="cell black" ></div>';
            }
        }
    }
    $('.chess > .chess-board').html(HTML);

    curr_layout = array_copy(start_layout);
    dabartinis_isdestymas();
    
    return;
}
/* ************************************************************/
function array_copy(a1){
    var a2=[];

    for (var i=0; i<a1.length; i++) {
        a2.push(a1[i]);
    }
 return a2;   
}
/**************************************************************/
function dabartinis_isdestymas() {

    //['1.','♙', 'e2', 'e4 ', '♙'], 

    var ka_parodyti = '';
    for ( var e=0; e<64; e++ ) {
        ka_parodyti = '';
        if(curr_layout[e]!=='') {
            ka_parodyti = eval(curr_layout[e]);
        }
        // suformuoju figuros diva
        $('.chess > .chess-board > .cell').eq(e).html('<div class="figura" >'+  ka_parodyti +'</div>'); 
    }
    return;
}
/**************************************************************/
/**************************************************************/
/**************************************************************/
/**************************************************************/
function write_history(){

var fig1= eval(curr_layout[active_cell]);
var fig2= '';
if( curr_layout[target_cell]!==''){fig2=eval(curr_layout[target_cell]);};
var poz1= col_name.substr(s_active , 1) +  row_name.substr(e_active , 1) ;
var poz2= col_name.substr(s_target , 1) +  row_name.substr(e_target , 1) ;

istorija.unshift([(istorija.length + 1) + '.', fig1, poz1, poz2, fig2]);

print_history();

}

/**************************************************************/
function print_history() {
var HTML='';
var HTML_W ='';

    for (var i=0; i<istorija.length; i++) {
        HTML += '<div >';
        for (var j=0; j<5; j++) {
            HTML += '<div >' + istorija[i][j] + '</div>'; 
        }
        HTML +='</div>';
    }
    if (winner!==''){
        if (winner==='w'){
            HTML_W ='<div class="winner" >GAME OVER...WINNER - WHITE</div>'

        } else{
            HTML_W ='<div class="winner" >GAME OVER...WINNER - BLACK</div>'

        }

        HTML=HTML_W + HTML;

    } 

    $('.game_info > .history').html(HTML);

}
/* ************************************************************/
/* ************************************************************/
/* ************************************************************/

function start_stop_game(){
    if (game_on) {
        //STOP GAME
       game_on=false;
       game_pause=false;
       w_clock_val=0;
       b_clock_val=0;

       $('#pause_btn').text('PAUSE');
       $('#go_btn').text('START');
       $('#pause_btn').css("visibility" , "hidden");

       stop_clock_w();
       stop_clock_b();
       ;
    }
    else {
          //START GAME
        game_on=true;
        kieno_ejimas='w';
        curr_layout = array_copy(start_layout);
        dabartinis_isdestymas();

        $('#go_btn').text('STOP');
        $('#pause_btn').css("visibility" , "initial");


        winner='';
        istorija=[];
        print_history();
        start_clock_w();
        $('#black').text("00:00:00");
    }
    return;
}



/* ************************************************************/
function pause_continue_clock(){

    if (game_pause){
        // taip - buvo nuspausta pause
        $('#pause_btn').text('PAUSE');
        game_pause=false;
        if (kieno_ejimas==='w' ){
            start_clock_w();
        } else {    
        start_clock_b();
        }

    } 
    else {
        //ne - tik dabar nusoaudziau
        $('#pause_btn').text('GO ON');
        game_pause=true;
        stop_clock_w();
        stop_clock_b();
    }
    return;
}
/* ************************************************************/

/* ************************************************************/
function swich_kieno_ejimas(){

    if (kieno_ejimas==='w') {
        stop_clock_w();
        start_clock_b();
        kieno_ejimas='b';
    } 
    else {
        stop_clock_b();
        start_clock_w();
        kieno_ejimas='w';
    }
    return;
}
/* ************************************************************/

function stop_clock_w(){
    clearTimeout(taimer_w);
    return;
}
/* ************************************************************/
function start_clock_w(){
    
    var likutis = w_clock_val;  
    var h = 0;
    var m = 0;
    var s = 0;
    
    if(likutis >= 3600)
    {
        h= Math.trunc( likutis / 3600 );
        likutis = likutis % 3600;
    }
    if (likutis >= 60)
    {
        m= Math.trunc(likutis / 60);
        likutis = likutis % 60;
    }
    s = likutis;

    h = ('0' + h).slice(-2);
    m = ('0' + m).slice(-2);
    s = ('0' + s).slice(-2);
    var time_text= h + ":" + m + ":" + s;    
    $('#white').text(time_text);
    w_clock_val = w_clock_val + 1 ;
    //console.log(w_clock_val, time_text);
    taimer_w = setTimeout(function(){ start_clock_w() }, 1000);
    return ;
}
/* ************************************************************/
function stop_clock_b(){
    clearTimeout(taimer_b);
    //console.log(taimer_b);
    return;
}
/* ************************************************************/
function start_clock_b(){

    var likutis = b_clock_val;  
    var h = 0;
    var m = 0;
    var s = 0;
    
    if(likutis >= 3600)
    {
        h= Math.trunc( likutis / 3600 );
        likutis = likutis % 3600;
    }
    if (likutis >= 60)
    {
        m= Math.trunc(likutis / 60);
        likutis = likutis % 60;
    }
    s = likutis;

    h = ('0' + h).slice(-2);
    m = ('0' + m).slice(-2);
    s = ('0' + s).slice(-2);
    var time_text= h + ":" + m + ":" + s;    
    $('#black').text(time_text);
    b_clock_val = b_clock_val + 1 ;
    //console.log(b_clock_val, time_text);
    taimer_b = setTimeout(function(){ start_clock_b() }, 1000);
    return ;
}
/* ************************************************************/
/* ************************************************************/
/* ******************     TAISYKLES     ***********************/
/* ************************************************************/
/* ************************************************************/
/*   PESTININKAS - p   *******************************************/

function pestininkas_eina_kerta (){

    var gali_eiti_e=0;
    var gali_eiti_s=0;
    var gali_kirsti_e=0;
    var gali_kirsti_s=0;   
    var gali_eiti_langelis=0;
    var gali_kirsti_langelis=0;
    var kryptis = 1; 

    if (active_owner_color==='w'){ 
        //balti eina mazejancia kryptimi
        kryptis = -1;
    }

    // eiti
    for(var i=0; i<p_eiti.length; i++) {
        gali_eiti_e = e_active + (p_eiti[i][0] * kryptis); 
        gali_eiti_s = s_active + p_eiti[i][1];

        // jei eilute arba stulpelis yra uz  lentos ribu
        if (gali_eiti_e>7 || gali_eiti_e<0  || gali_eiti_s>7 || gali_eiti_e<0  ) {
            continue;
        }

        // gali eiti i langeli, kurio numeris yra toks
        gali_eiti_langelis=(gali_eiti_e * 8)  +  gali_eiti_s;

        //jei pakeliui yra figura - toliau stop 
        if ( curr_layout[gali_eiti_langelis] !=='' ) {
            break; //contin
        }

        gali_eiti_sar.push(gali_eiti_langelis);

        // jei e_active!==1 && e_active!=6  prasisuks tik si karta,  antro ejimo neleidziu
        if (active_owner_color==='w' && e_active!==6) {
            break;
        } 
        if (active_owner_color==='b' && e_active!==1) {
            break;
        }
    }

    // kirsti
    //var p_kirsti = [[1,1], [1,-1]];

    for(var i=0; i<p_kirsti.length; i++) {
        gali_kirsti_e = e_active + (p_kirsti[i][0] * kryptis);
        gali_kirsti_s = s_active + p_kirsti[i][1];

        // jei eilute arba stulpelis yra uz  lentos ribu
        if (gali_kirsti_e>7 || gali_kirsti_e<0  || gali_kirsti_s>7 || gali_kirsti_s<0  ) {
            continue;;
        }

        // gali eiti i langeli, kurio numeris yra toks
        gali_kirsti_langelis=(gali_kirsti_e * 8)  +  gali_kirsti_s;

        //jei langelis tuscias 
        if ( curr_layout[gali_kirsti_langelis] ==='' ) {
            continue;;
        }
        //jei yra  ne priesininko figura 
        if ( active_owner_color === curr_layout[gali_kirsti_langelis].substr(0,1) ) {
            continue;
        }
        
        gali_kirsti_sar.push(gali_kirsti_langelis);
    }
}

/* ************************************************************/
/*   RIKIS  - b   *******************************************/

function rikis_eina_kerta (){

    var gali_eiti_e=0;
    var gali_eiti_s=0;
    var gali_eiti_langelis=0;

    // eiti ir kirsti
    //[1,1], [2,2], [3,3], [4,4], [5,5], [6,6], [7,7],
    //[-1,1], [-2,2], [-3,3], [-4,4], [-5,5], [-6,6], [-7,7],
    //[-1,-1], [-2,-2], [-3,-3], [-4,-4], [-5,-5], [-6,-6], [-7,-7],
    //[1,-1], [2,-2], [3,-3], [4,-4], [5,-5], [6,-6], [7,-7]

    for(var i=0; i<4; i++) {
        // kryptys yra 4

        for (var j=0; j<7; j++){ 
            // viena kryptimi juda max 7 kartus
            gali_eiti_e = e_active + b_eiti[ (i*7) + j ][0]; 
            gali_eiti_s = s_active + b_eiti[ (i*7) + j ][1];

            // jei eilute arba stulpelis yra uz  lentos ribu
            if (gali_eiti_e>7 || gali_eiti_e<0  || gali_eiti_s>7 || gali_eiti_s<0  ) {
                break; 
            }

            // gali eiti i langeli, kurio numeris yra toks
            gali_eiti_langelis=(gali_eiti_e * 8)  +  gali_eiti_s;
            //jei pakeliui yra figura - toliau stop 
            if ( curr_layout[gali_eiti_langelis] !=='' ) {
                // kieno figura? jei priesininkas - gali kirsti

                if ( active_owner_color !== curr_layout[gali_eiti_langelis].substr(0,1) ) {
                    gali_kirsti_sar.push(gali_eiti_langelis);
                }

                break;
            }
            // irasau kur gali eiti
            gali_eiti_sar.push(gali_eiti_langelis);
        }
    }

}

/* ************************************************************/

/*   ZIRGAS  - n   *******************************************/

function zirgas_eina_kerta (){

    var gali_eiti_e=0;
    var gali_eiti_s=0;
    var gali_eiti_langelis=0;

    // eiti ir kirsti
    //[2,1], [1,2], [-1,2], [-2,1], [-2,-1], [-1,-2], [1,-2],[2,-1]

    for(var i=0; i<8; i++) {
        // kryptys yra 8

        gali_eiti_e = e_active + n_eiti[i][0]; 
        gali_eiti_s = s_active + n_eiti[i][1];

        // jei eilute arba stulpelis yra uz  lentos ribu
        if (gali_eiti_e>7 || gali_eiti_e<0  || gali_eiti_s>7 || gali_eiti_s<0  ) {
            continue; 
        }

        // gali eiti i langeli, kurio numeris yra toks
        gali_eiti_langelis=(gali_eiti_e * 8)  +  gali_eiti_s;
        //jei pakeliui yra figura - toliau stop 
        if ( curr_layout[gali_eiti_langelis] !=='' ) {

            // kieno figura? jei priesininkas - gali kirsti
            if ( active_owner_color !== curr_layout[gali_eiti_langelis].substr(0,1) ) {
                gali_kirsti_sar.push(gali_eiti_langelis);
            }
            continue; 
        }
        // irasau kur gali eiti
        gali_eiti_sar.push(gali_eiti_langelis);
    }

}

/* ************************************************************/
/*   TURAS  - r   *******************************************/
/* ************************************************************/
function turas_eina_kerta (){

    var gali_eiti_e=0;
    var gali_eiti_s=0;
    var gali_eiti_langelis=0;

    // eiti ir kirsti

    for(var i=0; i<4; i++) {
        // kryptys yra 4

        for (var j=0; j<7; j++){ 
            // viena kryptimi juda max 7 kartus
            gali_eiti_e = e_active + r_eiti[ (i*7) + j ][0]; 
            gali_eiti_s = s_active + r_eiti[ (i*7) + j ][1];

            // jei eilute arba stulpelis yra uz  lentos ribu
            if (gali_eiti_e>7 || gali_eiti_e<0  || gali_eiti_s>7 || gali_eiti_s<0  ) {
                break; 
            }

            // gali eiti i langeli, kurio numeris yra toks
            gali_eiti_langelis=(gali_eiti_e * 8)  +  gali_eiti_s;
            //jei pakeliui yra figura - toliau stop 
            if ( curr_layout[gali_eiti_langelis] !=='' ) {
                // kieno figura? jei priesininkas - gali kirsti

                if ( active_owner_color !== curr_layout[gali_eiti_langelis].substr(0,1) ) {
                    gali_kirsti_sar.push(gali_eiti_langelis);
                }

                break;
            }
            // irasau kur gali eiti
            gali_eiti_sar.push(gali_eiti_langelis);
        }
    }

}

/* ************************************************************/
/*   KARALIENE  - q   *******************************************/
/* ************************************************************/
function karaliene_eina_kerta (){

    var gali_eiti_e=0;
    var gali_eiti_s=0;
    var gali_eiti_langelis=0;

    // eiti ir kirsti

    for(var i=0; i<8; i++) {
        // kryptys yra 8

        for (var j=0; j<7; j++){ 
            // viena kryptimi juda max 7 kartus
            gali_eiti_e = e_active + q_eiti[ (i*7) + j ][0]; 
            gali_eiti_s = s_active + q_eiti[ (i*7) + j ][1];

            // jei eilute arba stulpelis yra uz  lentos ribu
            if (gali_eiti_e>7 || gali_eiti_e<0  || gali_eiti_s>7 || gali_eiti_s<0  ) {
                break; 
            }

            // gali eiti i langeli, kurio numeris yra toks
            gali_eiti_langelis=(gali_eiti_e * 8)  +  gali_eiti_s;
            //jei pakeliui yra figura - toliau stop 
            if ( curr_layout[gali_eiti_langelis] !=='' ) {
                // kieno figura? jei priesininkas - gali kirsti

                if ( active_owner_color !== curr_layout[gali_eiti_langelis].substr(0,1) ) {
                    gali_kirsti_sar.push(gali_eiti_langelis);
                }

                break;
            }
            // irasau kur gali eiti
            gali_eiti_sar.push(gali_eiti_langelis);
        }
    }

}

/* ************************************************************/

/* ************************************************************/
/*   KARALIUS  - k   *******************************************/
/* ************************************************************/
function karalius_eina_kerta (){

    var gali_eiti_e=0;
    var gali_eiti_s=0;
    var gali_eiti_langelis=0;

    // eiti ir kirsti

    for(var i=0; i<8; i++) {
        // kryptys yra 8

            // viena kryptimi juda max 7 kartus
            gali_eiti_e = e_active + k_eiti[i][0]; 
            gali_eiti_s = s_active + k_eiti[i][1];

            // jei eilute arba stulpelis yra uz  lentos ribu
            if (gali_eiti_e>7 || gali_eiti_e<0  || gali_eiti_s>7 || gali_eiti_s<0  ) {
                continue; 
            }

            // gali eiti i langeli, kurio numeris yra toks
            gali_eiti_langelis=(gali_eiti_e * 8)  +  gali_eiti_s;
            //jei pakeliui yra figura - toliau stop 
            if ( curr_layout[gali_eiti_langelis] !=='' ) {
                // kieno figura? jei priesininkas - gali kirsti

                if ( active_owner_color !== curr_layout[gali_eiti_langelis].substr(0,1) ) {
                    gali_kirsti_sar.push(gali_eiti_langelis);
                }

                continue;
            }
            // irasau kur gali eiti
            gali_eiti_sar.push(gali_eiti_langelis);
        
    }

}

/* ************************************************************/
/* ************************************************************/


    /* myTimer = setInterval(wclock, 1000);

    function wclock() {

        var ct = game_settings.clock.current_time++;
        if ( ct < 10 ) {
            ct = '00'+ct;
        } else if ( ct < 100 ) {
            ct = '0'+ct;
        }

        $('#clock').text(ct);
        if (game_settings.clock.current_time === 1000) {
            clearInterval(myTimer);
        }
    } */







/*************************************************************
function delta_time(start_sec){
    var dabar_str=new Date();
    var dabar_milisec=dabar_str.getTime();
    var dabar_sec=Math.round(dabar_milisec/(1000));
    return  dabar_sec - start_sec;
}*/

/*************************************************************
function myClock() {
    var ct = game_settings.clock.current_time++;
    if ( ct < 10 ) {
        ct = '00'+ct;
    } else if ( ct < 100 ) {
        ct = '0'+ct;
    }

    $('#clock').text(ct);
    if (game_settings.clock.current_time === 1000) {
        clearInterval(myTimer);
    }
}*/

/*
<button onclick="myStopFunction()">Stop time</button>

<script>
var myVar = setInterval(myTimer, 1000);

function myTimer() {
    var d = new Date();
    var t = d.toLocaleTimeString();
    document.getElementById("demo").innerHTML = t;
}

function myStopFunction() {
    clearInterval(myVar);
}
</script>



*/

function startClock() {
    myTimer = setInterval(myClock, 1000);

    function myClock() {
        var ct = game_settings.clock.current_time++;
        if ( ct < 10 ) {
            ct = '00'+ct;
        } else if ( ct < 100 ) {
            ct = '0'+ct;
        }

        $('#clock').text(ct);
        if (game_settings.clock.current_time === 1000) {
            clearInterval(myTimer);
        }
    }
    return;
}




//The setTimeout() method calls a function or evaluates an expression after a specified number of milliseconds.
//Use the clearTimeout() method to prevent the function from running.

//The setInterval() method calls a function or evaluates an expression at specified intervals (in milliseconds).
//The setInterval() method will continue calling the function until clearInterval() is called, or the window is closed.
//The ID value returned by setInterval() is used as the parameter for the clearInterval() method.
//Tip: To execute a function only once, after a specified number of milliseconds, use the setTimeout() method.





/*
<button onclick="startCount()">Start count!</button>
<input type="text" id="txt">
<button onclick="stopCount()">Stop count!</button>

<p>
Click on the "Start count!" button above to start the timer. The input field will count forever, starting at 0. Click on the "Stop count!" button to stop the counting. Click on the "Start count!" button to start the timer again.
</p>

<script>
var c = 0;
var t;
var timer_is_on = 0;

function timedCount() {
    document.getElementById("txt").value = c;
    c = c + 1;
    t = setTimeout(timedCount, 1000);
}

function startCount() {
    if (!timer_is_on) {
        timer_is_on = 1;
        timedCount();
    }
}

function stopCount() {
    clearTimeout(t);
    timer_is_on = 0;
}
</script>

*/





function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    // add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById("txt").innerHTML = h + ":" + m + ":" + s;
    var t = setTimeout(function(){ startTime() }, 500);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}





//post_laikas(1543652925938 - (555555 * 60 * 1000 ));
//console.log(new Date().getTime() - 60000);
function post_laikas( post_milisec ) {
    var post_data='';
    var y,mn,d,h,m;
    var h1,m1;
    var monthNames = ["Sausio", "Vasario","Kovo","Balandžio","Gegužės","Birželio",
    "Liepos","Rugpjūčio", "Rugsėjo","Spalio", "Lapkričio","Gruodžio"];
    var post_str=new Date(post_milisec); 
    var dabar_str=new Date();
    var dabar_milisec=dabar_str.getTime();
    var post_min=Math.round(post_milisec/(1000 * 60));
    var dabar_min=Math.round(dabar_milisec/(1000 * 60));

    var skirt=dabar_min - post_min; //minuciu sk

    y = post_str.getFullYear();
    mn= monthNames[post_str.getMonth()];
    d = post_str.getDate();
    h = ('0' + post_str.getHours()).slice(-2);
    m = ('0' + post_str.getMinutes()).slice(-2);
   
    post_data= y +" m. " + mn + 
                " " + d + " d. " + h + ":" + m ;

    //console.log(post_str);
    //console.log(dabar_str);
    //console.log(post_milisec);
    //console.log(dabar_milisec);
    //console.log(skirt);

        /* maziau uz 24 val */
    if (skirt < (60*24) && skirt>0) {
        post_data='Šiandien ' + h + ':' + m + ' ....prieš ';

          /* jei maziau nei valanda */
        if (skirt < 60) {
            post_data+= skirt.toString() + ' min.';
        }
         /* jei daugiau nei valanda */
        else { 
            h1 = Math.trunc(skirt / 60);
            post_data+= h1.toString() + ' val. ';

             /*  ar liko minuciu virs valandos ? */
            if (skirt % 60 >0){
                m1 = skirt % 60;
                post_data+=m1.toString() + ' min.';
            }
        }
   
    }

    //console.log(post_data );

    return post_data; 

    
}

