/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global google */
var vect=[0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var imoveis_coordenada ="";

$(document).ready(function(){
    iniciar_mapa();
    Banco_filtro();
});

function iniciar_mapa(){
    var latlng = new google.maps.LatLng(-23.549667748209284,-46.632328033447266);
    var myOptions = {
        zoom: 10,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map= new google.maps.Map(document.getElementById("mapa"),myOptions);
    
}
function Mostrar_no_mapa(pontos){ 
    iniciar_mapa();
    var contv=0,conta=0,contb=0;
    for(var x=0; x <pontos.length; x++ ){
        t = pontos[x].split("| ");
        latlng = new google.maps.LatLng(t[12],t[13]);
        var i=0;
        if(t[8]!=="")i++;
        if(t[9]!=="")i++;
        if(t[11]!=="")i++;        
        var icone='../css/image/Map-Marker-Ball-Azure-icon.png';
        switch(i){
            case 0:
                icone = '../css/image/Marker-icon-vermelho.png';
                contv++;
                break;
            case 1:
                icone='../css/image/Marker-icon-amarelo.png';
                conta++;
                break;
            case 2:
                icone='../css/image/Marker-icon-verde.png';
                contb++;
                break;
        }
        var marker = new google.maps.Marker({
            position: latlng,
            icon: icone,
            map: map,
            draggable: false,
            title: t[14]+"-"+x
        });
        google.maps.event.addListener(marker, 'click', function() {
            var str = this.getTitle().split("-") ;
            var infowindow = new google.maps.InfoWindow({
                content:'Codigo do Imovel:  '+str[0] //+'<br>Latitude: ' + t[12] + '<br>Longitude: ' + t[13]
            });            
            infowindow.open(map,this);
            listar_informacao(str[1],pontos);
        });
    }
    //alert("contv = "+contv+" conta = "+conta+" contb = "+contb+" total de ="+pontos.length);

}
function seleciona_filtro(id){                      //detecta filtro e seleciona os apresentaveis
    var r =document.getElementById(id);
    if(r.checked){
        vect[id]=id;
    }else vect[id]=0;    
    var imoveis_filtrado=[];
    var ind_filtrado=0;
    for(var a=0; a < imoveis_coordenada.length; a++){
        var temp = imoveis_coordenada[a].split("| ");
        if(temp[vect[1]]!=="" && temp[vect[2]]!=="" && temp[vect[3]]!=="" && 
                temp[vect[4]]!=="" && temp[vect[5]]!=="" && temp[vect[6]]!=="" && temp[vect[7]]!==""
                && temp[vect[8]]!=="" && temp[vect[9]]!=="" && temp[vect[10]]!=="" && temp[vect[11]]!==""){
            imoveis_filtrado[ind_filtrado] = imoveis_coordenada[a]; 
            ind_filtrado++;
        }        
    }
    if(imoveis_filtrado.length > 0)Mostrar_no_mapa(imoveis_filtrado);
}
function Banco_filtro(){
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function(){
        if(ajax.readyState===4){
            var imoveis = ajax.responseText.split("<->");
            imoveis[0] = imoveis[0].substring(0,imoveis[0].length-1);
            imoveis_coordenada = imoveis[0].split("\n");
            Mostrar_no_mapa(imoveis_coordenada);
        }        
    };
    ajax.open("GET", "../Ponte",true);
    ajax.send();
}

function listar_informacao(pos, vec){
    var tem = vec[pos].split("| ");
    //alert(tem[1]+" "+tem[2]+" "+tem[3]+" "+tem[4]+" "+tem[5]+" "+tem[14]);
    document.getElementById("mais_informacao").innerHTML="<div id='id_banco'></div><div id='endereco'></div>"+
            "<div id='infor'></div><div class='clear'></div>";
    document.getElementById("id_banco").innerHTML=tem[0];
    document.getElementById("endereco").innerHTML=tem[2];
    document.getElementById("infor").innerHTML="<table><tr><td>Lavrado_em:</td><td>"+tem[4]+"</td></tr><tr><td>Processo:</td><td>"+tem[5]+"</td></tr>"+
            "<tr><td>Planta:</td><td>"+tem[6]+"</td></tr>"+
            "<tr><td>Croquis:</td><td>"+tem[7]+"</td></tr><tr><td>Área:</td><td>"+tem[8]+"</td></tr><tr><td>Prazo:</td><td>"+tem[9]+"</td></tr>"+
            "<tr><td>ContraPartida:</td><td>"+tem[11]+"</td></tr></table>";
            /*"<span>Lavrado_em:"+tem[4]+"</span><span>Processo:"+tem[5]+"</span><span>Planta:"+tem[6]+"</span>"+
            "<span>Croquis:"+tem[7]+"</span><span>Área:"+tem[8]+"</span><span>Prazo:"+tem[9]+"</span><span>ContraPartida:"+tem[11]+"</span>";*/
    
}