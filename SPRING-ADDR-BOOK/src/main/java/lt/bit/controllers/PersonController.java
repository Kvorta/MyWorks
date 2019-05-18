package lt.bit.controllers;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import lt.bit.dao.PersonDAO;
import lt.bit.data.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller

public class PersonController {
        
    @Autowired
    private PersonDAO personDAO;
    
    @Autowired
    PasswordEncoder pe;
    
    
    private final String DATE_FORMAT = "yyyy-MM-dd";
    private final SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);
    
    /////////////////////////////////////
    //http://localhost:8080/Spring_addr_jsp/pass?pass=labas
    @RequestMapping(path = "pass", method = RequestMethod.GET)
    @ResponseBody
    public String pass(@RequestParam(name = "pass", required = false) String pass) {
        return pe.encode(pass);
    }
    //////////////////////////////////////
    
    //@GetMapping("personList")  //url kelias
    @RequestMapping(path = "personList",method = RequestMethod.GET)
    public ModelAndView persons() {
        ModelAndView mav = new ModelAndView("personList");  //koki jsp paleisti 
        List<Person> listas = personDAO.findAll();
//pvz        List<Person> list = personDAO.bySalary(new BigDecimal("456"));
//pvz        List<Person> list = personDAO.byName("Jonas");
        mav.addObject("pList", listas);  // personList.jsp bus taip: request.getAttribute("pList");
        return mav;
    }
    
    /////////
    @GetMapping("deletePerson")
    @Transactional
    public String delete(@RequestParam("pid") Integer pid) {
        Person p = personDAO.getOne(pid);
        if(p != null){
            personDAO.delete(p);
        }
        return "redirect:personList";
    }
    
////////////////////////////
////////////////////////////
    @RequestMapping(path = "editPerson", method = RequestMethod.GET)
    public ModelAndView edit(@RequestParam(name = "pid", required = false) String pid) {
        Person person = null;
        try {
            person = personDAO.getOne(new Integer(pid));
        } catch (Exception ex) {
        }
        if (person == null) {
            person = new Person();
        }
        ModelAndView mv = new ModelAndView("editPerson");
        mv.addObject("person", person); // person objekta atiduodu pavadinimu "person"
        return mv;
    }
////////////////////////////  
    @RequestMapping(path = "savePerson", method = RequestMethod.POST)
    @Transactional
    public String save (
        @RequestParam(name = "pid", required = false) String pid,
        @RequestParam(name = "fname", required = false) String fname,
        @RequestParam(name = "lname", required = false) String lname,
        @RequestParam(name = "bdate", required = false) String bdate,
        @RequestParam(name = "salary", required = false) String salary
    ) {
        System.out.println("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        Person person = null;
        try {
            person = personDAO.getOne(new Integer(pid));
        } catch (Exception ex) {
            
        }
        if (person == null) {
            
            person = new Person();
        }
        
        person.setFirstName(fname);
        person.setLastName(lname);
        try {
            // padarau - nurodytos dienos 12 valanda
            Date d = sdf.parse(bdate);
            Calendar c = Calendar.getInstance();
            c.setTimeInMillis(d.getTime());
            c.set(Calendar.HOUR, 12);
            //
            person.setBirthDate(c.getTime());
            //person.setBirthDate(sdf.parse(bdate));
        } catch (Exception ex) {
            person.setBirthDate(new Date()); //siandien
        }
        try {
            person.setSalary(new BigDecimal(salary));
        } catch (Exception ex) {
            person.setSalary(new BigDecimal (1111.11)); //fiktyvus
        }
        personDAO.save(person);
        return "redirect:personList";
    }

////////////////////////////

}
