
<%@page import="lt.bit.data.Util"%>
<%@page import="lt.bit.data.Person"%>
<%@page import="javax.persistence.EntityManager"%>
<%@page import="lt.bit.data.Address"%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" type="text/css"  href="css/style.css">
        <title>Edit Address</title>
    </head>
   <body>
       
<%
            String acity="Vilnius";
            String astreet="Žirmūnų 70-50";
            
            Person person = (Person) request.getAttribute("person");
            int pid=person.getId();

            Address address = (Address) request.getAttribute("address");
           
            Integer aid=null;
            if(address.getId() != null){
                aid=address.getId();
                acity=address.getCity();
                astreet=address.getStreet();
            }
%>
        
        
        <div class="contact-book-edit">   
            <div class="form-style">
            
                <h4>EDIT ADDRESS</h4>

                <div class="form-style-heading">
                    <p>Person ID : <%= pid%></p>
                    <p>Address ID: <%= aid%></p>
                </div>

                <form  method="POST" action="./saveAddress">
                    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                    <label for="acity"><span>Miestas <span class="required">*</span></span>
                        <input type="text" class="input-field" name="acity" value="<%=Util.escapetHTML(acity)%>" /></label>
                    <label for="astreet"><span>Gatve <span class="required">*</span></span>
                        <input type="text" class="input-field" name="astreet" value="<%=Util.escapetHTML(astreet)%>" /></label>

                    <input type="hidden" name="pid"value=<%=pid%> />
                    <input type="hidden" name="aid"value=<%=aid%> />
                    <label><span> </span><input type="submit" value="Submit" /></label>
                </form>  
                <form s method="POST" action="addresses">
                    <label><span> </span><input type="submit" value="Cancel" /></label>
                    <input type="hidden" name="pid"value=<%=pid%> />
                </form>
            </div>
        </div> 
        
        
    </body>
</html>
