<%-- 
    Document   : index.jsp
    Created on : 06/06/2014, 01:43:24
    Author     : David
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
    <head>
        <%@include file="Master.jsp" %>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Home</title>
        <script type="text/javascript" src="../js/jquery-1.8.0.min.js"></script>
        <script type="text/javascript" src="../js/jquery.flexslider-min.js" ></script>
        <link type="text/css" rel="stylesheet" href="../css/pesquisa_avancado.css">
        <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=true"></script>
        <script type="text/javascript" src="../js/pesquisa_avancado.js"></script>
    </head>
    <body>
        <div id="mapa">
            <center>
                <div id="c_botton">
                    <input type="button" value="Fechar" title="fechar" onclick="fecha_mapa()">
                    <!--<input type='button' value="Atualizar Coordenadas" onclick="atualiza_coordenada()">-->                    
                    <div id="infor_endereco"></div>
                </div>
                <div id="c_mapa"></div>                
            </center>
        </div>
        <div class="conteudo">
            <div class="selet">
                <center>
                    <span>
                        <select id="selec">
                            <option>TODOS</option>
                            <option>PROCURAR POR AREA</option>
                            <option>PROCURAR POR BENEFICIARIO</option>
                            <option>PROCURAR POR CONTRAPARTIDA</option>
                            <option>PROCURAR POR DECRETO</option>
                            <option>PROCURAR POR ENDERECO</option>
                            <option>PROCURAR POR FINALIDADE</option>
                            <option>PROCURAR POR PRAZO</option>
                            <option>PROCURAR POR REGIAO</option>
                            <option>PROCURAR POR PLANTA</option>
                        </select>
                    </span>
                    <span>
                        <input id="entrada" type="text" onfocus="focus_in()"/>
                    </span>
                    <span><input type="button" value="Ok" onclick="get_endereco()"></span>
                </center>
            </div>
            <div id="camp_pesq">                                 
            </div>
        </div>
    </body>
    <%@include file="rodape.jsp" %>
</html>

