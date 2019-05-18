"use strict";

$('.chess-board').html( renderChess() );


// ****** Mygtukai  ****

$('.game_info> .header > #go_btn').click(function(){start_stop_game(); });
$('.game_info> .header > #pause_btn').click(function(){pause_continue_clock(); });


// ****** Paspausta cele  ****

$('.chess > .chess-board' ).on("click", '.cell', function(){
    if (!game_on || game_pause) { return  }

    e_active = 0;
    s_active = 0;
    e_target = 0;
    s_target = 0;

    active_owner = ''; // wp,wn,wr, ....
    target_owner = '';
    active_owner_color = ''; //w,b
    target_owner_color = '';
    active_owner_type = ''; //pestininkas,turas,zirgas,.....
    target_owner_type = '';
    target_cell = 0;

    cell_position = $(this).index();

    if ($(this).hasClass('active') ){
        /* jei langelis buvo pazymetas 
           tuomet atzymiu*/ 
        $( this ).removeClass( "active" );
        active_cell=-1;

        //jei pazymeta atzymejau  - viska perpiesiu
        dabartinis_isdestymas();

    }

    else if (active_cell===-1 && $(this).text()!=='') {
        /* jei nebuvo nieko pazymeta ir langelis turi figura, 
           tuomet pazymiu ir atsimenu aktyvu langeli */


        $( this ).addClass( "active" );
        active_cell=cell_position;

        // active koordinates

        e_active = Math.trunc(active_cell / 8);
        s_active = active_cell % 8;

        // nustatau figuros pavadinima  active langelyje
        active_owner=curr_layout[active_cell];
        active_owner_color = active_owner.substr(0,1);
        active_owner_type = active_owner.substr(1,1);

        // jei ne mano ejimas - atgal
        if ( active_owner_color !== kieno_ejimas ) { return;}
        

        //Kur galiu eiti ir kirsti?
        gali_eiti_sar=[]; // data.js
        gali_kirsti_sar=[]; // data.js

        switch (active_owner_type) {
            case 'p':
                pestininkas_eina_kerta (); //PESTININKO TAISYKLE
                break; 
            case 'b':
                rikis_eina_kerta (); //RIKIO TAISYKLE
                break; 
            case 'n':
                zirgas_eina_kerta (); //ZIRGO TAISYKLE
                break; 
            case 'r':
                turas_eina_kerta (); //TURO TAISYKLE
                break; 
            case 'q':
                karaliene_eina_kerta (); //KARALIENES TAISYKLE
                break; 
            case 'k':
                karalius_eina_kerta (); //KARALIAUS TAISYKLE
                break; 

            default: 
                break; 
        }

        // pridedu zvaigzdutes diva
        for(var i=0; i<gali_eiti_sar.length; i++) {
            $('.chess > .chess-board > .cell').eq(gali_eiti_sar[i]).html('<div class="zv" ></div>');
        }
        // pridedu klase KERTA prie FIGURA divo
        for(var i=0; i<gali_kirsti_sar.length; i++) {
            $('.chess > .chess-board > .cell' ).eq(gali_kirsti_sar[i]).children().addClass( "kerta" );
        }

    } else if ( active_cell >=  0 && active_cell!==cell_position) {
        //fiziskai eina cia
        //jei pries tai buvo kazkoks  pazymetas langelis ejimui ir cia yra ne mano paties langelis, 
        //tuomet greiciausiai cia noriu eiti
        target_cell=cell_position;

        // jei nera galimu ejimu ir kirtimu sarase
        if ( gali_eiti_sar.indexOf(target_cell) === -1 && gali_kirsti_sar.indexOf(target_cell) === -1) {
            return
        }

        // target koordinates
        e_target = Math.trunc(target_cell / 8);
        s_target = target_cell % 8;

        // active koordinates
        
        e_active = Math.trunc(active_cell / 8);
        s_active = active_cell % 8;

        // nustatau figuros pavadinima  active langelyje
        active_owner=curr_layout[active_cell];
        active_owner_color = active_owner.substr(0,1);
        active_owner_type = active_owner.substr(1,1);

        // nustatau figuros pavadinima  target langelyje
        // ten gali buti tuscia
        target_owner=curr_layout[target_cell];
        target_owner_color = target_owner.substr(0,1);
        target_owner_type = target_owner.substr(1,1);

        // GALUTINAI PERKELIU FIGURA
        
        // Pavaizduoju istorijoje
        write_history();
    
        $('.chess-board > .cell').eq(active_cell).removeClass( "active" );

        curr_layout[target_cell] = curr_layout[active_cell];
        curr_layout[active_cell] = '';

        // reikia perkelti figuros diva
        $('.chess-board > .cell').eq(target_cell).children().remove();
        $('.chess-board > .cell').eq(active_cell).children().appendTo($('.chess-board > .cell').eq(target_cell));
        //.animate({transform:  'translate(0px,10px)', opacity: '0.4'}, "slow")

        active_cell=-1;

        dabartinis_isdestymas();

        //jei numustas karalius
        if(target_owner_type==='k'){
            winner= kieno_ejimas;
            start_stop_game();
            print_history();
            return;
        }

        //paejau, dabar eina kitas
        swich_kieno_ejimas()

    }

    return;
 });   


 


        // ištrinu visus zv klases divus
        // istrinu klase kerta is visu figuru divo
        /* $('.chess-board > .cell').each(function(){
            console.log($(this +  '.figura'));
            $(this > + '.figura').removeClass( "kerta" );
        }) */
        
        //jei paejau - viska perpiesiu


//$('.chess-board > .cell').eq(16).text('*');
//myEl.style.opacity = 0.7;

//$('.chess > .chess-board > .cell').eq(16).html('<div class="zv" ></div>');
//$('.chess > .chess-board > .cell').eq(17).html('<div class="zv" ></div>');
//$('.chess > .chess-board > .cell' ).eq(15).children().addClass( "kerta" );

//$('.column').remove();
//$('#myDiv').remove();
//element.parentNode.removeChild(element);




 //
     
  
    /* $('.TreeTable tr').click(function(e){
        var cell = $(e.target).get(0); // This is the TD you clicked
        var tr = $(this); // This is the TR you clicked
 */


   /*  if ( game_settings.click_count === 0 ) {
        startGame( game_settings, cell_position );
    } else {
        if ( !$(this).hasClass('open') ) {
            // tikriname ar tame langelyje yra bomba
            if ( game_settings.mines.list.indexOf( cell_position ) === -1 ) {
                // bombos langelyje nera, tesiam zaidima
                console.log('zaidziam toliau...');
            } else {
                // bomba rasta - GAME OVER... :'(
                gameOver();
            }
        }
    }

    $(this).addClass('open');
    game_settings.click_count++; */

/* var m=[[1,2,3,],[1,2,3,] ];
var i=0;
var j=1;
console.log(m[i][j]);
 */


/* 
var str1='zzzzzzzzzzzzzz';
var str2='jjjjjjjjjjjjj';
var aaa='str';
console.log(eval(aaa + '2'));

 
var items = [
    [1, 2],
    [3, 4],
    [5, 6]
  ];
  console.log(items[0][0]); // 1
  console.log(items);
*/
//var str='♔';
//var aaa='str';
/* var txt=eval(start_pozicija[0][4]);
 *///console.log(txt);
/* console.log( $('.chess-board > .cell').eq(4).text());
 */ 
/* $('.chess-board > .cell').eq(1).text(eval(start_pozicija[0][1]));
$('.chess-board > .cell').eq(3).text(eval(start_pozicija[0][3]));
$('.chess-board > .cell').eq(5).text(eval(start_pozicija[0][5]));
 */
 