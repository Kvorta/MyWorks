"use strict";
var juodi =[
    ['&#9820','&#9822','&#9821','&#9819','&#9818','&#9821','&#9822','&#9820'],
    ['&#9823','&#9823','&#9823','&#9823','&#9823','&#9823','&#9823','&#9823']
];
var balti =[
    ['&#9817','&#9817','&#9817','&#9817','&#9817','&#9817','&#9817','&#9817'],  
    ['&#9814','&#9816','&#9815','&#9813','&#9812','&#9815','&#9816','&#9814']
];


var br='♜',
    bn='♞',
    bb='♝',
    bq='♛',
    bk='♚',
    bp='♟',

    wr='♖',
    wn='♘',
    wb='♗',
    wq='♕',
    wk='♔',
    wp='♙';

var row_name = '87654321';

var col_name = 'abcdefgh';

var game_on=false;  //false -> off .... true -> on
var game_pause=false;

var winner='';

var kieno_ejimas='w';

var w_clock_val=0;
var b_clock_val=0;
var taimer_w=0;
var taimer_b=0;


//START_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR',
var start_layout=
[   'br','bn','bb','bq','bk','bb','bn','br',
    'bp','bp','bp','bp','bp','bp','bp','bp',
    '','','','','','','','',
    '','','','','','','','',
    '','','','','','','','',
    '','','','','','','','',
    'wp','wp','wp','wp','wp','wp','wp','wp',
    'wr','wn','wb','wq','wk','wb','wn','wr'
];

var curr_layout=[];

var gali_eiti_sar=[];
var gali_kirsti_sar=[];


// pestininko galimi ejimai:
// dabartine koordinate + masyvo elemento reiksme
var p_eiti  = [[1,0], [2,0]];
var p_kirsti = [[1,1], [1,-1]];

// rikio galimi ejimai:
// dabartine koordinate + masyvo elemento reiksme

var b_eiti  = 
[
    [1,1], [2,2], [3,3], [4,4], [5,5], [6,6], [7,7],
    [-1,1], [-2,2], [-3,3], [-4,4], [-5,5], [-6,6], [-7,7],
    [-1,-1], [-2,-2], [-3,-3], [-4,-4], [-5,-5], [-6,-6], [-7,-7],
    [1,-1], [2,-2], [3,-3], [4,-4], [5,-5], [6,-6], [7,-7]
];


var n_eiti  = 
[
    [2,1], [1,2], [-1,2], [-2,1], [-2,-1], [-1,-2], [1,-2],[2,-1]
];


var r_eiti  = 
[
    [0,1], [0,2], [0,3], [0,4], [0,5], [0,6], [0,7],
    [1,0], [2,0], [3,0], [4,0], [5,0], [6,0], [7,0],
    [0,-1], [0,-2], [0,-3], [0,-4], [0,-5], [0,-6], [0,-7],
    [-1,0], [-2,0], [-3,0], [-4,0], [-5,0], [-6,0], [-7,0]
];

var q_eiti  = 
[
    [0,1], [0,2], [0,3], [0,4], [0,5], [0,6], [0,7],
    [1,0], [2,0], [3,0], [4,0], [5,0], [6,0], [7,0],
    [0,-1], [0,-2], [0,-3], [0,-4], [0,-5], [0,-6], [0,-7],
    [-1,0], [-2,0], [-3,0], [-4,0], [-5,0], [-6,0], [-7,0],
    [1,1], [2,2], [3,3], [4,4], [5,5], [6,6], [7,7],
    [-1,1], [-2,2], [-3,3], [-4,4], [-5,5], [-6,6], [-7,7],
    [-1,-1], [-2,-2], [-3,-3], [-4,-4], [-5,-5], [-6,-6], [-7,-7],
    [1,-1], [2,-2], [3,-3], [4,-4], [5,-5], [6,-6], [7,-7]
];

var k_eiti  = 
[
    [0,1],
    [1,0], 
    [0,-1], 
    [-1,0], 
    [1,1], 
    [-1,1],
    [-1,-1],
    [1,-1]
];





var active_owner = ''; // wp,wn,wr, ....
var target_owner = '';
var active_owner_color = ''; //w,b
var target_owner_color = '';
var active_owner_type = ''; //pestininkas,turas,zirgas,.....
var target_owner_type = '';

var active_cell=-1;  // -1 nes 0 cele yra lentoj
var target_cell = 0;

var cell_position =0;

var e_active = 0;
var s_active = 0;
var e_target = 0;
var s_target = 0;

var istorija=[];