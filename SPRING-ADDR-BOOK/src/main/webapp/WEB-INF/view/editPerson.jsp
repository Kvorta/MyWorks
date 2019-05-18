<%-- 
--%>

<%@page import="lt.bit.data.Person"%>
<%@page import="lt.bit.data.Util"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" type="text/css"  href="css/style.css">
        <title>Edit Person</title>
    </head>
    <body>
         
<%
        Person p = (Person) request.getAttribute("person");
        // Person arba esamas arba new gaunu is controler
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        
        Integer pid= null;
        String fname="Jonas";
        String lname="Petraitis";
        String bdate="2000-01-01";
        String salary="1000";
        
        if(p.getId() != null){
            pid=p.getId();
            fname=p.getFirstName();
            lname=p.getLastName();
            bdate = sdf.format(p.getBirthDate());
            salary=p.getSalary().toPlainString();
        }
        
        
        

%>
        
            
        
        <div class="contact-book-edit">   
        <div class="form-style">
            <div class="form-style-heading">Person ID: <%= pid%></div>
<!--            <form  metod="POST" action="./savePerson?pid=<%=pid%>&fname=<%=fname%>&lname=<%=lname%>&bdate=<%=bdate%>&salary=<%=salary%>" >-->
            <form   action="./savePerson" method="POST"> 
                <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                <input type="hidden" name="pid" value="<%=(pid != null)?pid:""%>" />
                <label for="fname"><span>First Name <span class="required">*</span></span>
                    <input type="text" class="input-field" name="fname" value="<%=Util.escapetHTML(fname)%>" /></label>
                <label for="lname"><span>Last Name <span class="required">*</span></span>
                    <input type="text" class="input-field" name="lname" value="<%=Util.escapetHTML(lname)%>" /></label>
                <label for="bdate"><span>Birth Date </span>
                    <input type="date" class="input-field"  name="bdate" placeholder="YYYY-MM-DD" value="<%=bdate%>" /></label>   
                <label for="salary"><span>Salary </span>
                    <input type="number" step="0.01" class="input-field" name="salary" value="<%=salary%>" /></label> 
                <label><span> </span><input type="submit" value="Submit" /></label>
            </form>    
            <form  metod="POST" action="./personList">
                <label><span> </span><input type="submit" value="Cancel" /></label>
            </form>
        </div>
        </div> 
        
        
    </body>
</html>



