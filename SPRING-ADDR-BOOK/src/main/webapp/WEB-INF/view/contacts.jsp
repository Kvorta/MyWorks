<%-- 

--%>

<%@page import="lt.bit.data.Util"%>
<%@page import="java.util.List"%>
<%@page import="lt.bit.data.Contact"%>
<%@page import="lt.bit.data.Person"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" type="text/css"  href="css/style.css">
        <title>CONTACTS</title>
    </head>
    <body>
        
        <div class="contact-book">
            <h4>PERSON CONTACTS</h4>
<%
            Person person = (Person) request.getAttribute("person");
            int pid=person.getId();
%>
            <h1>PERSON : <%=pid + " " + person.getFirstName() + " " + person.getLastName()%></h1>
<%            
            List<Contact> pContactList = (List<Contact>) request.getAttribute("cList");
            if (pContactList == null || pContactList.size() == 0) {
%>
                <h1>Empty list</h1>
<%
            } else {
%>

            <div id="con-table" class="table-div">  
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Contact Type</th>
                        <th>Contact</th>
                        <th>E</th>
                        <th>X</th>
                    </tr> 
<%
                    for (Contact contact : pContactList) {
%>  
                        <tr>
                            <td> <%=contact.getId()%> </td>
                            <td> <%=Util.escapetHTML(contact.getContype())%> </td>
                            <td> <%=Util.escapetHTML(contact.getContact())%> </td>
                            <td> <a href="./editContact?cid=<%=contact.getId()%>">Edit</a> </td>
                            <td> <a href="./deleteContact?cid=<%=contact.getId()%>">Del</a> </td>
                        </tr>
<%         
                    }
%>
                 </table> 
            </div>
<%         
            }
%>                 
            <a style= "display: block; padding: 20px 40px;" href="./editContact?pid=<%=pid%>">New Contact</a>
            <a style= "display: block; padding: 0px 40px;" href="./personList">Home</a>
        </div>
            
    </body>
</html>

