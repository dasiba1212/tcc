
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author David
 */
public class Opera_banco {
    
    String cabecalho="<table class='dado' id='dados'><tr><th>Beneficio</th><th>Endereco</th><th>Decreto</th><th>Lavrado_em</th><th>Processo</th><th>Planta</th>"
            +"<th>Croquis</th><th>Area</th><th>Prazo</th><th>Finalidade</th><th>Contra Partida</th><th>Localiza_Mapa</th></tr>";
    LinkedList <String[]> resultad;
    
    public String pesquisa(){
        try{
            PreparedStatement smt = M_Coneta.get_conexao().prepareStatement("select *from imoveis");
            ResultSet rt = smt.executeQuery();
            String temp=cabecalho;
            String com_coord ="";
            String sem_coord ="";
            String res; 
            while(rt.next()){  
                res = "";
                res=res+rt.getString(1)+"| ";
                res=res+rt.getString(2)+"| ";
                res=res+rt.getString(3)+"| ";
                res=res+rt.getString(4)+"| ";
                res=res+rt.getString(5)+"| ";
                res=res+rt.getString(6)+"| ";
                res=res+rt.getString(7)+"| ";
                res=res+rt.getString(8)+"| ";
                res=res+rt.getString(9)+"| ";
                res=res+rt.getString(10)+"| ";
                res=res+rt.getString(11)+"| ";
                res=res+rt.getString(12)+"| ";
                res=res+rt.getString(13)+"| ";
                res=res+rt.getString(14)+"| ";               
                res=res+rt.getString(15)+"\n";             
                if(rt.getString(14)!=null)com_coord = com_coord + res;
                else sem_coord = sem_coord + rt.getString(14);               
            }
            //temp=temp+"</table> ^ " + coord;
            smt.close();            
            return com_coord +"<->"+sem_coord;
            
        }catch(SQLException e){            
            return null ;
        }         
    }
    public String pesquisa_regiao(String a, int b){
        try{
            PreparedStatement smt = M_Coneta.get_conexao().prepareStatement("select *from imoveis where endereco = '"+a+"' order by linha");
            ResultSet rt = smt.executeQuery();
            if(rt.next()){
                smt = M_Coneta.get_conexao().prepareStatement("select *from imoveis where longitude >= '"+(Integer.parseInt(rt.getString(13))-b)+"'"
                        + "and longitude <='"+(Integer.parseInt(rt.getString(13))+b)+"' order by linha");
                rt = smt.executeQuery();                
            }else return "Regiao Invalida Ou sem Imovel Disponivel";
            String temp=cabecalho;
            int linha = 1;
            while(rt.next()){
                if(rt.getString(13)!=null && rt.getString(14)!=null ){
                    temp=temp+"<tr><td>"+rt.getString(2)+"</td><td>"+rt.getString(3)+"</td><td>"+rt.getString(4)+"</td>"
                        + "<td>"+rt.getString(5)+"</td><td>"+rt.getString(6)+"</td><td>"+rt.getString(7)+"</td>"
                        + "<td>"+rt.getString(8)+"</td><td>"+rt.getString(9)+"</td><td>"+rt.getString(10)+"</td>"
                        + "<td>"+rt.getString(11)+"</td><td>"+rt.getString(12)+"</td>"
                        + "<td><center><input type='image' onclick='localiza_map("+rt.getString(13)+","+rt.getString(14)+");'"
                        + "src='../css/image/lupa_procura.png'></center></td></tr>";
                }
                linha++;
            }
            temp=temp+"</table>";
            smt.close();            
            return temp;
            
        }catch(SQLException e){            
            return "deu errado no ("+e.getMessage()+")" ;
        }  
    }
    
    public String pesquisa_Prazo(String prazo){
        try{
            PreparedStatement smt = M_Coneta.get_conexao().prepareStatement("select *from imoveis where prazo = '"+prazo+"' order by linha");
            ResultSet rt = smt.executeQuery();
            String temp=cabecalho;
            int linha=1;
           while(rt.next()){
                if(rt.getString(13)!=null && rt.getString(14)!=null ){
                    temp=temp+"<tr><td>"+rt.getString(2)+"</td><td>"+rt.getString(3)+"</td><td>"+rt.getString(4)+"</td>"
                        + "<td>"+rt.getString(5)+"</td><td>"+rt.getString(6)+"</td><td>"+rt.getString(7)+"</td>"
                        + "<td>"+rt.getString(8)+"</td><td>"+rt.getString(9)+"</td><td>"+rt.getString(10)+"</td>"
                        + "<td>"+rt.getString(11)+"</td><td>"+rt.getString(12)+"</td>"
                        + "<td><center><input type='image' onclick='localiza_map("+rt.getString(13)+","+rt.getString(14)+");'"
                        + "src='../css/image/lupa_procura.png'></center></td></tr>";
                }
                linha++;
            }
            temp=temp+"</table>";
            smt.close();            
            return temp;            
        }catch(SQLException e){            
            return "deu errado no ("+e.getMessage()+")" ;
        }               
    }  
}
