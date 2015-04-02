<%-- 
    Document   : Credito
    Created on : 05/06/2014, 23:49:45
    Author     : David
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@include file="Master.jsp"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link type="text/css" rel="stylesheet" href="../css/pedido.css">
        <title>Pedido</title>
    </head>
    <body>
        <div class="conteudo">
            <div>
                <center>
                    <table id="pedido">
                        <tr>
                            <td>
                                <span>area:</span>
                                <input type="text" id="">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>bairro:</span>
                                <input type="text" id="">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>data do pedido:</span>
                                <input type="text" id="">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>enteresse:</span>
                                <input type="text" id="">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>finalidade:</span>
                                <div class="final">
                                    opcao1
                                    <input type="radio" name="finalidade"><br>
                                    opcao2
                                    <input type="radio" name="finalidade">
                                </div>
                                <div class="final">
                                    opcao3
                                    <input type="radio" name="finalidade"><br>
                                    opcao4
                                    <input type="radio" name="finalidade">
                                </div>
                                <div class="final">
                                    opcao5
                                    <input type="radio" name="finalidade"><br>
                                    Outros
                                    <input type="radio" name="finalidade">
                                </div>    
                                
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>periodo:</span>
                                 <div class="final">
                                    de 1 a 2 anos
                                    <input type="radio" name="periodo"><br>
                                    de 2 a 4 anos
                                    <input type="radio" name="periodo">
                                </div>
                                <div class="final">
                                    de 4 a 8
                                    <input type="radio" name="periodo"><br>
                                    de 8 a 12
                                    <input type="radio" name="periodo">
                                </div>
                                <div class="final">
                                    de 12 a 16
                                    <input type="radio" name="periodo"><br>
                                    mais de 16
                                    <input type="radio" name="periodo">
                                </div>    
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>tipo de imovel:</span>
                                <div class="final">
                                    apartamento
                                    <input type="radio" name="imovel"><br>
                                    predio
                                    <input type="radio" name="imovel">
                                </div>
                                <div class="final">
                                    casa
                                    <input type="radio" name="imovel"><br>
                                    parque
                                    <input type="radio" name="imovel">
                                </div>
                                <div class="final">
                                    terreno
                                    <input type="radio" name="imovel"><br>
                                    Outros
                                    <input type="radio" name="imovel">
                                </div>    
                                
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>justificativa:</span>
                                <input id="justificativa" type="text" >
                            </td>
                        </tr>
                    </table>
                    <input type="button" value="Registrar">
                    <input type="button" value="Cancelar">
                </center>
            </div>
        </div>
    </body>
    <%@include file="rodape.jsp"%>
</html>
