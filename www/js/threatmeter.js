$(document).ready(function() {
    $( ".drawer" ).collapsible({
        collapseCueText: " collapse with a click"
    });
    
    loadCards();
});

/**
* Methods to reload cards on - 
* 1. Change of Hero
* 2. Change of Mana
* 3. Change of show threat toggle button
* 4. Click of Search, End turn and Reset
*/
$('#hero').change(function() {
    loadCards();     
});

$('#mana').change(function() {
    loadCards();
});

$('#threat').change(function() {   
    loadCards();
});

$('#search').unbind().click(function() {    
    loadCards();
});

$('#endturn').unbind().click(function() {    
    var mana = $('#mana').val();
    mana++;
    $('#mana').val(mana);    
    loadCards();
    
});

$('#reset').click(function() { 
    var mana = $('#mana').val();
    if(mana!=1) {
        $('#mana').val(0);
        loadCards();
    } 
});


/**
Method to load cards from the json data based on the filter criteria
*/
loadCards = function() {    
    
    $('#mana').slider('refresh');    
    
    clearCards();
    
    var showThreatOnly = false;    
    if($('#threat').val()=="true") {
        showThreatOnly = true;
    } else {
         showThreatOnly = false;
    }
    
    $.getJSON( "data/AllSets.enUS.json", function( data ) {
    
        var hero = $('#hero').val();         
        var mana = $('#mana').val();
        mana = getValidMana(mana);

        $.each( data, function( cards ) {
            if(this instanceof Array)
            { 
                $.each( this, function( id , card ) {  
                    
                     //var imgSrc = 'http://wow.zamimg.com/images/hearthstone/cards/enus/medium/'+card.id+'.png';
                    
                    var imgSrc = './img/cards/'+card.id+'.png';
                    
                    if(isPlayableByClass(this, hero) && isManaCostBetween(this, mana, 0)  && isPlayableCard(card) && showThreatOnly && isCardDangerous(card)) {
                        switch(card.cost) {
                                case 0: $('#dangers_0').append('<img class="card_image" src='+imgSrc+' alt='+card.name+'/>');
                                break;
                                case 1: $('#dangers_1').append('<img class="card_image" src='+imgSrc+' alt='+card.name+'/>');
                                break;
                                case 2: $('#dangers_2').append('<img class="card_image" src='+imgSrc+' alt='+card.name+'/>');
                                break;
                                case 3: $('#dangers_3').append('<img class="card_image" src='+imgSrc+' alt='+card.name+'/>');
                                break;
                                case 4: $('#dangers_4').append('<img class="card_image" src='+imgSrc+' alt='+card.name+'/>');
                                break;
                                case 5: $('#dangers_5').append('<img class="card_image" src='+imgSrc+' alt='+card.name+'/>');
                                break;
                                case 6: $('#dangers_6').append('<img class="card_image" src='+imgSrc+' alt='+card.name+'/>');
                                break;
                                case 7: $('#dangers_7').append('<img class="card_image" src='+imgSrc+' alt='+card.name+'/>');
                                break;
                                case 8: $('#dangers_8').append('<img class="card_image" src='+imgSrc+' alt='+card.name+'/>');
                                break;
                                case 9: $('#dangers_9').append('<img class="card_image" src='+imgSrc+' alt='+card.name+'/>');
                                break;
                                default: $('#dangers_10').append('<img class="card_image" src='+imgSrc+' alt='+card.name+'/>');
                                break;
                                
                        }
                            
                    } else
                    
                    if(isPlayableByClass(this, hero) && isManaCostBetween(this, mana, mana)  && isPlayableCard(card) && isThreatening(card, showThreatOnly)) {
                        
                        if(card.playerClass === undefined) {                            
                            $('#neutral_minions').append('<img class="card_image" src='+imgSrc+' alt='+card.name+'/>');
                        } else {
                            if(card.type=="Weapon") {                                
                                $('#weapons').append('<img class="card_image"  src='+imgSrc+' alt='+card.name+'/>');
                            } else if(card.type=="Spell") {                                
                                $('#spells').append('<img class="card_image"  src='+imgSrc+' alt='+card.name+'/>');
                            } else {
                                $('#class_minions').append('<img class="card_image"  src='+imgSrc+' alt='+card.name+'/>');
                            }
                        }

                    }
                });
            }
        });
        showCards();
    });
   
}

isCardDangerous = function(card) {
    if(card.danger == undefined || card.threat != true) {        
        return false;
    } else {
        return true;
    }  
    
}


isThreatening = function(card, showThreatOnly) {
    
    //Show all cards if show threats is off. 
    if(!showThreatOnly) {
        return true;
    }
    
    if(card.threat == undefined || card.threat != true) {        
        return false;
    } else {
        return true;
    }    
}

getValidMana = function(mana) {
    if(mana<=100 && mana>=0 && mana!='') {
        return mana;
    }
    return 100;
}

isPlayableCard = function(card) {
  return (card.collectible == true && card.category!= "hero");
}

isPlayableByClass = function(card, hero) {     
    return (card.playerClass == hero || card.playerClass === undefined);    
}

isManaCostBetween = function(card, upperlimit, lowerlimit) {
    return (card.cost <= upperlimit && card.cost >=lowerlimit);
}

clearCards = function() {
    
    $('#dangers_0').empty();
    $('#dangers_1').empty();
    $('#dangers_2').empty();
    $('#dangers_3').empty();
    $('#dangers_4').empty();
    $('#dangers_5').empty();
    $('#dangers_6').empty();
    $('#dangers_7').empty();
    $('#dangers_8').empty();
    $('#dangers_9').empty();
    $('#dangers_10').empty();
  
    $('#dangers_set').hide();
    
    $('#weapons').empty();
    $('#weapons_set').hide();    
    
    $('#spells').empty();
    $('#spells_set').hide();
    
    $('#class_minions').empty();
    $('#class_minions_set').hide();
    
    $('#neutral_minions').empty();    
    $('#neutral_minions_set').hide();    
}

showCards = function() {
   if($('#dangers_0').children().length>0 || 
      $('#dangers_1').children().length>0 || 
      $('#dangers_2').children().length>0 || 
      $('#dangers_3').children().length>0 || 
      $('#dangers_4').children().length>0 || 
      $('#dangers_5').children().length>0 ||
      $('#dangers_6').children().length>0 || 
      $('#dangers_7').children().length>0 || 
      $('#dangers_8').children().length>0 || 
      $('#dangers_9').children().length>0 || 
      $('#dangers_10').children().length>0 ) {
        $('#dangers_set').show();    
    }
    if($('#weapons').children().length>0) $('#weapons_set').show();    
    if($('#spells').children().length>0) $('#spells_set').show();
    if($('#class_minions').children().length>0) $('#class_minions_set').show();
    if($('#neutral_minions').children().length>0) $('#neutral_minions_set').show();
}