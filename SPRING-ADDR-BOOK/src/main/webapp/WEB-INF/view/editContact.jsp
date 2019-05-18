<%-- 

--%>

<%@page import="lt.bit.data.Util"%>
<%@page import="lt.bit.data.Contact"%>
<%@page import="lt.bit.data.Person"%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" type="text/css"  href="css/style.css">
        <title>EDIT CONTACT</title>
    </head>
   <body>
       
<%
        Person person = (Person) request.getAttribute("person");
        int pid=person.getId();

        Contact contact = (Contact) request.getAttribute("contact");
           
        String ctype="Mobilus tel.";
        String ccontact="+370 686 54785";
        Integer cid=null;
        if(contact.getId() != null){
            cid=contact.getId();
            ctype=contact.getContype();
            ccontact=contact.getContact();
        }

%>
 
        <div class="contact-book-edit">   
            <div class="form-style">
            
            
                <h4>EDIT CONTACT</h4>

                <div class="form-style-heading">
                    <p>Person  ID : <%= pid%></p>
                    <p>Contact ID: <%= cid%></p>
                </div>

                <form  method="POST" action="saveContact">
                    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                    <label for="ctype"><span>Tipas</span>
                         <select name="ctype" class="select-field">
                            <option value="Mobilus" <%if((ctype != null) && ctype.equals("Mobilus")){ %> selected <%} %> >Mobilus</option>
                            <option value="Laidinis" <%if((ctype != null) && ctype.equals("Laidinis")){ %> selected <%} %> >Laidinis</option>
                            <option value="Aūūūūūū" <%if((ctype != null) && ctype.equals("Aūūūūūū")){ %> selected <%} %>  >Aūūūūūū</option>
                         </select>
                    </label>   
                        
                    <label for="ccontact"><span>Kontaktas <span class="required">*</span></span>
                        <input type="text" class="input-field" name="ccontact" value="<%=Util.escapetHTML(ccontact)%>" /></label>
                        
                    <input type="hidden" name="pid"value=<%=pid%> />
                    <input type="hidden" name="cid"value=<%=cid%> />
                    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                    <label><span> </span><input type="submit" value="Submit" /></label>
                </form>  
                <form s metod="POST" action="./contacts">
                    <label><span> </span><input type="submit" value="Cancel" /></label>
                    <input type="hidden" name="pid"value=<%=pid%> />
                </form>
            </div>
        </div> 
        
        
        
        
        
        
        
    </body>
</html>



