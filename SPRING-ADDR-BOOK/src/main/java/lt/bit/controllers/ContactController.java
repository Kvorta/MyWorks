package lt.bit.controllers;

import lt.bit.dao.ContactDAO;
import lt.bit.dao.PersonDAO;
import lt.bit.data.Contact;
import lt.bit.data.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
//@RequestMapping("/contact/")
public class ContactController {

    @Autowired
    ContactDAO contactDAO;

    @Autowired
    PersonDAO personDAO;
    //////////////////////////////////////////////////////////////////
    @RequestMapping(path = "contacts",method = RequestMethod.GET)
    public ModelAndView list(@RequestParam(name = "pid", required = false) String pid) {
        Person person = null;
        try {
            person = personDAO.getOne(new Integer(pid));
        } catch (Exception ex) {
        }
        if (person == null) {
            return new ModelAndView("redirect:./");
        }
        ModelAndView mv = new ModelAndView("contacts"); //koki JSP paleist
        mv.addObject("person", person);
        mv.addObject("cList", person.getContactList()); 
                    // contacts.jsp bus taip: request.getAttribute("cList");
        return mv;
    }
    /////////////////////////////////////////////////////////////////
    @RequestMapping(path = "editContact", method = RequestMethod.GET)
    public ModelAndView edit(
             
            @RequestParam(name = "cid", required = false) String cid,
             
            @RequestParam(name = "pid", required = false) String pid
            
    ) {
        Contact contact = null;
        try {
           
            contact = contactDAO.getOne(new Integer(cid));
        } catch (Exception ex) {
             
        }
        
        Person person = null;
        if (contact != null) {
            
            person = contact.getPerson();
        } else {
            contact = new Contact();
             
            try {
                person = personDAO.getOne(new Integer(pid));
            } catch (Exception ex) {
                
            }
        }
        if (person == null) {
             
            return new ModelAndView("redirect:../");
        }
        ModelAndView mv = new ModelAndView("editContact");
        mv.addObject("person", person);
        mv.addObject("contact", contact);
        return mv;
    }
    ///////////////////////////////////////////////////////////////////
    
    @RequestMapping(path = "saveContact", method = RequestMethod.POST)
    @Transactional
    public String save(
            @RequestParam(name = "cid", required = false) String cid,
             
            @RequestParam(name = "pid", required = false) String pid,

            @RequestParam(name = "ctype", required = false) String ctype,
            @RequestParam(name = "ccontact", required = false) String ccontact
    ) {
        Contact contact = null;
        try {
             
            contact = contactDAO.getOne(new Integer(cid));
        } catch (Exception ex) {
             
        }
         
        if (contact == null) {
            contact = new Contact();
        }
        if (contact.getPerson() == null) {
            try {
                Person person = personDAO.getOne(new Integer(pid));
                contact.setPerson(person);
            } catch (Exception ex) {
                 
            }
        }
        if (contact.getPerson() == null) {
             
            return "redirect:./";
        }
         
        contact.setContype(ctype);
        contact.setContact(ccontact);
        
        contactDAO.save(contact);
        
        return "redirect:./contacts?pid=" + contact.getPerson().getId();
    }
    //////////////////////////////////////////////////////////////
    @RequestMapping(path = "deleteContact", method = RequestMethod.GET)
    @Transactional
    public String delete(@RequestParam(name = "cid") String cid) {
        Integer pid = null;
        try {
            Contact contact = contactDAO.getOne(new Integer(cid));
            pid = contact.getPerson().getId();
            contactDAO.delete(contact);
        } catch (Exception ex) {
             
        }
        if (pid == null) {
            
            return "redirect:./";
        }
        
        return "redirect:./contacts?pid=" + pid;
    }
}
