<%-- 
    --%>

<%@page import="lt.bit.data.Util"%>
<%@page import="lt.bit.data.Address"%>
<%@page import="java.util.List"%>
<%@page import="lt.bit.data.Person"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" type="text/css"  href="css/style.css">
        <title>ADDRESSES</title>
        
    </head>
    <body>
        
        <div class="contact-book">
            <h4>PERSON ADDRESSES</h4>
<%
            Person person = (Person) request.getAttribute("person");
            int pid=person.getId();
%>
            <h1>PERSON : <%=pid + " " + person.getFirstName() + " " + person.getLastName()%></h1>
<%            
            List<Address> pAddressList = (List<Address>) request.getAttribute("aList");
            if (pAddressList == null || pAddressList.size() == 0) {
%>
                <h1>Empty list</h1>
<%
            } else {
%>
        

            <div id="addr-table" class="table-div">  
                <table>
                    <tr>
                        <th>ID</th>
                        <th>City</th>
                        <th>Street</th>
                        <th>E</th>
                        <th>X</th>
                    </tr> 

        
<%
                    for (Address address : pAddressList) {
%>  
                        <tr>
                            <td> <%=address.getId()%> </td>
                            <td> <%=Util.escapetHTML(address.getCity())%> </td>
                            <td> <%=Util.escapetHTML(address.getStreet())%> </td>
                            <td> <a href="editAddress?aid=<%=address.getId()%>">Edit</a> </td>
                            <td> <a href="deleteAddress?aid=<%=address.getId()%>">Del</a> </td>
                        </tr>

<%         
                     }
%>
                </table>
            </div>
<%         
        }
%>        
        <a style= "display: block; padding: 20px 40px;" href="editAddress?pid=<%=pid%>">New Address</a>
        <a style= "display: block; padding: 0px 40px;" href="./personList">Home</a>
        </div>
    </body>
</html>



