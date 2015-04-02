/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global google */

var tabela_temp;
var tabela_end="<table id='tabela'><tr><td>Qt_Imoveis</td><td>Endereços</td><td>Tam_do_bairro</td></tr>";
var map;
var geocoder;
var tipo;
var selecionado=[0,0];
var coord=[];


$(document).ready(function(){
    geocoder = new google.maps.Geocoder(); 
    $("#mapa").hide();
    $("#selec").change(function(){
       if($("#selec option:selected").text()==="TODOS"){
           apresenta_todos();
       }
       else{
           $("#entrada").attr("disabled", false);
           $('#entrada').css("background-color", "white");
           Format_pesq();
       } 
    });
    $("#entrada").focusin(function(){
    }).focusout(function(){});    
    apresenta_todos();
});
function apresenta_todos(){
    $("#entrada").val("");
    $("#entrada").attr("disabled", true);
    $('#entrada').css("background-color", "#cccccc");
    tipo="valores=TODOS/ ";
    Opera_Banco();
}
function focus_in(){
    if($("#entrada").css('color')==="rgb(190, 190, 190)")document.getElementById("entrada").value="";  
}
  

function alterar_dados(linha, linha_bd){
    tabela_temp= document.getElementById("tabela").innerHTML;
    var table = document.getElementById("dados");
    var col = table.rows[linha].childNodes;
    document.getElementById("tabela").innerHTML="<center>"
    +"<table class='table_alter'><tr><td><span>Beneficiario:</span><input id='2' type='text' value='"+col[0].innerHTML+"' ></td><td><span>Endereco:</span><input id='3' type='text' value='"+col[1].innerHTML+"' ></td></tr>"
    +"<tr><td><span>Decreto:</span><input id='4' type='text' value='"+col[2].innerHTML+"' ></td><td><span>Lavrado_em:</span></span><input id='5' type='text' value='"+col[3].innerHTML+"' ></td></tr>"
    +"<tr><td><span>Processo:</span><input id='6' type='text' value='"+col[4].innerHTML+"' ></td><td><span>Planta:</span><input id='7' type='text' value='"+col[5].innerHTML+"' ></td></tr>"
    +"<tr><td><span>Croquis</span><input id='8' type='text' value='"+col[6].innerHTML+"' ></td><td><span>Area</span><input id='9' type='text' value='"+col[7].innerHTML+"' ></td></tr>"
    +"<tr><td><span>Prazo:</span><input id='10' type='text' value='"+col[8].innerHTML+"' ></td><td><span>Finalidade:</span><input id='11' type='text' value='"+col[9].innerHTML+"' ></td></tr>"
    +"<tr><td colspan=2><center><input class='boton' id='boton_conf' type='button' value='Confirmar' onclick='alterar_dados_bd("+linha_bd+")' >"
    +"<input class='boton' id='boton_canc' type='button' value='Cancelar' onclick='cancela()'></td></tr></center>"
    +"</table></center>";    
}
function alterar_dados_bd(id){
    var tipo_ant = tipo;
    tipo = "valores=ATUALIZA_TODOS/"+id+"--";  
    if(document.getElementById("2").value!=="")tipo=tipo+document.getElementById("2").value+"--";
    else tipo=tipo+"--";
    if(document.getElementById("3").value!=="")tipo=tipo+document.getElementById("3").value+"--";
    else tipo=tipo+"--";
    if(document.getElementById("4").value!=="")tipo=tipo+document.getElementById("4").value+"--";
    else tipo=tipo+"--";
    if(document.getElementById("5").value!=="")tipo=tipo+document.getElementById("5").value+"--";
    else tipo=tipo+"--";
    if(document.getElementById("6").value!=="")tipo=tipo+document.getElementById("6").value+"--";
    else tipo=tipo+"--";
    if(document.getElementById("7").value!=="")tipo=tipo+document.getElementById("7").value+"--";    
    else tipo=tipo+" --";
    if(document.getElementById("8").value!=="")tipo=tipo+document.getElementById("8").value+"--";
    else tipo=tipo+"--";
    if(document.getElementById("9").value!=="")tipo=tipo+document.getElementById("9").value+"--";
    else tipo=tipo+"--";
    if(document.getElementById("10").value!=="")tipo=tipo+document.getElementById("10").value+"--";
    else tipo=tipo+"--";
    if(document.getElementById("11").value!=="")tipo=tipo+document.getElementById("11").value+"--";
    else tipo=tipo+"--";
    document.getElementById("camp_pesq").innerHTML="<center><img src='../css/image/carregando.gif' height='200px'></center>";    
    atualiza_banco();
    tipo = tipo_ant;
    Opera_Banco();        
}
function apresenta_tabela(conteudo){
    document.getElementById("camp_pesq").innerHTML="<div class='tabela' id='tabela'><center>"+conteudo+ "</center></div>";
}  
function atualiza_banco(){
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function(){
        if(ajax.readyState===4){
            alert(ajax.responseText);
        }        
    };
    ajax.open("GET", "../Ponte_avancado?"+tipo,true);
    ajax.send();
}
function atualiza_coordenada(){
    //var table = document.getElementById("dados");
        //ar col = table.rows[linha_tabela].childNodes;        
        //col[11].innerHTML="<div id=longitude_"+coord[2]+" >"+coord[1]+"</div>";
        //col[12].innerHTML="<div id=latitude_"+coord[2]+" >"+coord[0]+"</div>";
        document.getElementById("icon_"+coord[2]).innerHTML="<center><input type='image' \n\
        onclick='localiza_map("+coord[0]+","+coord[1]+","+coord[2]+");' src='../css/image/lupa_procura.png'></center>";
        tipo = "valores=ATUALIZA/"+coord[2]+"/"+coord[0]+"/"+coord[1];
        atualiza_banco();  
}

function cancela(){
    document.getElementById("tabela").innerHTML="<center><img src='../css/image/carregando.gif' height='200px'></center>";    
    setTimeout("cancela_comple()",1000);
}
function cancela_comple(){
    document.getElementById("tabela").innerHTML=tabela_temp;    
}
function Coordenadas_mapa(lin_bd,endereco){  
    geocoder.geocode( { 'address': endereco }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            if(results[0].geometry.location.lat()>-24.846565348219745 && results[0].geometry.location.lat()<-20.13847031245114 &&
                    results[0].geometry.location.lng()>-51.6796875 && results[0].geometry.location.lng()<-45.966796875){
                alert("Atenção: favor confirmar a localização no mapa");
                localiza_map(results[0].geometry.location.lat(),results[0].geometry.location.lng(),lin_bd);
            }
           else {
                alert("Atenção: favor confirmar a localização no mapa. 'GOOGLE API' devolveu coordenada fora de são paulo");    
                localiza_map(-23.549667748209284,-46.632329033447266,lin_bd);
            }

        }else{
            alert("'GOOGLE API' falhou favor procurar manualmente no mapa");    
                    localiza_map(-23.549667748209284,-46.632329033447266,lin_bd);
        }
        document.getElementById("infor_endereco").innerHTML="<marquee scrollDelay=150 slide direction='right'><span>"+endereco+"</span></marquee>";
    });
}
function atualiza_Coordenada(lin,lin_bd,endereco){
    Coordenadas_mapa(lin_bd,endereco); 
}

function Format_pesq(){ 
           temp_tipo = document.getElementById("selec").value.split(" ");
           switch (temp_tipo[temp_tipo.length-1]){
               case "REGIAO":
                   tipo="valores=REGIAO";
                   document.getElementById("entrada").value="Degite nome da região, valor do raio ";                   
                   break;
               case "ENDERECO":
                   tipo="valores=ENDERECO";
                   document.getElementById("entrada").value="Degite o endereco ";
                   break;
               case "PRAZO":
                   tipo="valores=PRAZO";
                   document.getElementById("entrada").value="Degite o Prazo ";
                   break;
               case "BENEFICIARIO":
                   tipo="valores=BENEFICIARIO";
                   document.getElementById("entrada").value="Degite o Beneficiario ";
                   break;
               case "AREA":
                   tipo="valores=AREA";
                   document.getElementById("entrada").value="Degite a Area ";
                   break;
               case "CONTRAPARTIDA":
                   tipo="valores=CONTRAPARTIDA";
                   document.getElementById("entrada").value="Degite a Contrapartida ";
                   break;                   
               case "DECRETO":
                   tipo="valores=DECRETO";
                   document.getElementById("entrada").value="Degite o Decreto ";
                   break;
               case "FINALIDADE":
                   tipo="valores=FINALIDADE";
                   document.getElementById("entrada").value="Degite a Finalidade ";
                   break;
               case "PLANTA":
                   tipo="valores=PLANTA";
                   document.getElementById("entrada").value="Degite a Planta ";
                   break;
           }
}
function fecha_mapa(){
    $("#mapa").slideUp("0");
}

function get_endereco(){
    if(document.getElementById("entrada").value===""){
        alert("campo invalido");
        return;
    } 
    tipo = tipo +"/"+ document.getElementById("entrada").value;
    document.getElementById("camp_pesq").innerHTML="<center><img src='../css/image/carregando.gif' height='200px'></center>";    
    Opera_Banco();
}
function listar_alvo(){
    if(selecionado[0]===0 && selecionado[1]===0){
        alert("Selecione um endereco valído");
        document.getElementById("alvo").checked=false;
        return;
    }
    localiza_map(selecionado[0],selecionado[1]);
}
function localiza_map(latitude,longitude,id){
    $("#mapa").slideDown("200");
    selecionado[0]=latitude;
    selecionado[1]=longitude;    
    var latlng = new google.maps.LatLng(latitude, longitude);
    var myOptions = {
        zoom: 16,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map= new google.maps.Map(document.getElementById("c_mapa"),myOptions);
    var marker = new google.maps.Marker({
        map: map,
        draggable: true,
        title: ""+id
    });
    marker.setPosition(latlng);
    google.maps.event.addListener(marker, 'mouseup', function() {
        var infowindow = new google.maps.InfoWindow({
            content:'latitude:  '+this.position.lat() +'<br>Longitude:'+this.position.lng() //+'<br>Latitude: ' + t[12] + '<br>Longitude: ' + t[13]
        });
        if(this.position.lat()>-24.846565348219745 && this.position.lat()<-20.13847031245114 &&
                        this.position.lng()>-51.6796875 && this.position.lng()<-45.966796875){    
            coord[0]=this.position.lat();
            coord[1]=this.position.lng();
            coord[2]=this.getTitle();
            infowindow.open(map,this);
            atualiza_coordenada();
        }else alert("Atenção: favor confirmar a localização no mapa. 'GOOGLE API' devolveu coordenada fora de são paulo");    
    });
    
}
function Opera_Banco(){
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function(){
        if(ajax.readyState===4){
            apresenta_tabela(ajax.responseText);
        }        
    };
    ajax.open("GET", "../Ponte_avancado?"+tipo,true);
    ajax.send();
}
function removeLinha_banco(linha){
    html_ant=document.getElementById("camp_pesq").innerHTML; 
    document.getElementById("camp_pesq").innerHTML="<center><img src='../css/image/carregando.gif' height='200px'></center>";    
    var ant_tipo=tipo;
    tipo = "valores=REMOVER/"+linha; 
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function(){
        if(ajax.readyState===4){
            alert(ajax.responseText);
            tipo=ant_tipo;
            Opera_Banco();
        }        
    };
    ajax.open("GET", "../Ponte_avancado?"+tipo,true);
    ajax.send();
}

function voltar_pesq(){
    document.getElementById("camp_pesq").innerHTML=html_ant;
    Format_pesq();
}


function gera_raio(inicio){
    var y=0;
    var x=y-inicio;
    for(x=inicio; x <inicio; x++  ){
        
    }
}
function pesquisa_por_regiao(){
    if(document.getElementById("entrada").value===""){
        alert("campo invalido");
        return;
    }
    html_ant=document.getElementById("camp_pesq").innerHTML; 
    try{
        var tmp = document.getElementById("entrado").value.split(",");
        tipo = tipo +"/"+ document.getElementById("entrada").value;
        
    }catch(err ){
        alert("Formato Invalido tente região,raio");
        return;
    }
    $('html, body').animate({scrollTop:600}, 'slow');
    document.getElementById("entrada").value="";
    document.getElementById("camp_pesq").innerHTML="<center><img src='../css/image/carregando.gif' height='200px'></center>";    
    Opera_Banco();
}

