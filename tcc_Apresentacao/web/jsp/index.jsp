<%-- 
    Document   : index.jsp
    Created on : 06/06/2014, 01:43:24
    Author     : David
--%>

<%@page language = "java" contentType="text/html; charset = utf-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
    <head>
        <%@include file="Master.jsp" %>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Home</title>
        <script type="text/javascript" src="../js/jquery-1.8.0.min.js"></script>
        <script type="text/javascript" src="../js/jquery.flexslider-min.js" ></script>
        <link type="text/css" rel="stylesheet" href="../css/home.css">
        <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=true"></script>
        <script type="text/javascript" src="../js/home.js"></script>
    </head>
    <body>
        <div class="conteudo">
            <label><Strong>FILTROS</strong></label>
            <div id="pesquisa">
                <div class="filtros">
                    <span>Beneficio <input id="1" type="checkbox" onclick="seleciona_filtro('1')" /></span>
                    <span>Endereco <input id="2" type="checkbox" onclick="seleciona_filtro('2')" /></span>
                    <span>Decreto <input id="3" type="checkbox" onclick="seleciona_filtro('3')"/></span>
                </div>
                <div class="filtros">
                    <span>Lavrado em <input id="4" type="checkbox" onclick="seleciona_filtro('4')" /></span>
                    <span>Processo <input id="5" type="checkbox" onclick="seleciona_filtro('5')" /></span>
                    <span>Planta <input id="6" type="checkbox" onclick="seleciona_filtro('6')" /></span>
                </div>
                <div class="filtros">
                    <span>Croquis <input id="7" type="checkbox" onclick="seleciona_filtro('7')" /></span>
                    <span>Prazo <input id="8" type="checkbox" onclick="seleciona_filtro('8')" /></span>
                    <span>Área <input id="9" type="checkbox" onclick="seleciona_filtro('9')" /></span>                    
                </div>
                <div class="filtros">
                    <span>Contrapartida <input id="10" type="checkbox" onclick="seleciona_filtro('10')" /></span>
                    <span>Finalidade <input id="11" type="checkbox" onclick="seleciona_filtro('11')" /></span>
                    <!--<span>Todos <input id="13" type="checkbox" onclick="Banco_filtro()" /></span>-->
                </div>
                <div class="clear"></div>
            </div>
            <div id="mapa"></div>
            <label><Strong>LEGENDA</strong></label>
            <div id="legenda_mapa"> 
                <center><h2>Área, ContaPartida, Prazo</h2></center>
                <div class="legenda">
                    <span><img src="../css/image/Marker-icon-vermelho.png"><p>não contém nenhuma das informação acima</p> </span>                    
                </div>
                <div class="legenda">
                    <span><img src="../css/image/Marker-icon-amarelo.png"><p>contém uma das três informação acima</p></span>                    
                </div>
                <div class="legenda">
                    <span><img src="../css/image/Marker-icon-verde.png"><p>contém duas das três informação acima</p></span>
                </div>                
                <div class="legenda">
                    <span><img src="../css/image/Map-Marker-Ball-Azure-icon.png"><p>contém todas as três informação acima</p></span>
                </div>                 
                <div class="clear"></div>
            </div>
            <div id="mais_informacao">                
            </div>
        </div>
    </body>
    <%@include file="rodape.jsp" %>
</html>

