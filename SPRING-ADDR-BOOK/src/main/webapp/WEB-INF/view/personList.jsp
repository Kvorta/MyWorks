<%-- 
    
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.List"%>
<%@page import="lt.bit.data.Person"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
         
        <link rel="stylesheet" type="text/css"  href="css/style.css">
        
        <title>Spring_addr_jsp</title>
        
    </head>
    <body>
        <div class="contact-book">
            <h4>CONTACT - BOOK    <%=request.getContextPath()%></h4>
            <div class="table-div">    
                <table>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Birth Date</th>
                        <th>Salary</th>
                        <th>Addresses</th>
                        <th>Contacts</th>
                        <th>E</th>
                        <th>X</th>
<!--                        <td colspan="4">Actions</td>-->
                    </tr> 
<%
                    List <Person> personList = (List)request.getAttribute("pList");
                    
                    if (personList == null || personList.size() == 0) {
%>
                    <h1>Empty list</h1>
<%
                    } else {
                        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

                    
                        //for (int i = 0; i <personList.size(); i++) {
                        for (Person person : personList) {
                            String birthDate = "";
                            if (person.getBirthDate() != null) {
                                birthDate = sdf.format(person.getBirthDate());
                            }
                            String salary = (person.getSalary() != null)?person.getSalary().toPlainString():"";
%>  


                            <tr>
                                <td><%=person.getId()%></td>
                                <td><%=(person.getFirstName() != null)?person.getFirstName():""%></td>
                                <td><%=(person.getLastName() != null)?person.getLastName():""%></td>
                                <td><%=birthDate%></td>
                                <td><%=salary%></td>
                                <td><a href="./addresses?pid=<%=person.getId()%>">Addresses</a></td>
                                <td><a href="./contacts?pid=<%=person.getId()%>">Contacts</a></td>
                                <td><a href="./editPerson?pid=<%=person.getId()%>">Edit</a></td>
                                <td><a href="./deletePerson?pid=<%=person.getId()%>">Delete</a></td>
                            </tr>
                 
<%         
                        }
                    }       

%>
        
                </table>
            </div>
            <a style= "display: block; padding: 20px 40px;" href="./editPerson">New Person</a>
            <a style= "display: block; padding: 0px 40px;" href="./">Home</a>
        
        </div>
    </body>
</html>
