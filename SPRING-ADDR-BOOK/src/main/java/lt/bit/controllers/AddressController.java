package lt.bit.controllers;

import lt.bit.dao.AddressDAO;
import lt.bit.dao.PersonDAO;
import lt.bit.data.Address;
import lt.bit.data.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
//@RequestMapping("/address/")
public class AddressController {

    @Autowired
    AddressDAO addressDAO;

    @Autowired
    PersonDAO personDAO;
    //////////////////////////////////////////////////////
    @RequestMapping(path = "addresses",method = RequestMethod.GET)
    public ModelAndView list(@RequestParam(name = "pid", required = false) String pid) {
        Person person = null;
        try {
            person = personDAO.getOne(new Integer(pid));
        } catch (Exception ex) {
        }
        if (person == null) {
            return new ModelAndView("redirect:./");
        }
        ModelAndView mv = new ModelAndView("addresses");
        mv.addObject("person", person);
        mv.addObject("aList", person.getAddressList());
        return mv;
    }
    ////////////////////////////////////////////////////////////////
    @RequestMapping(path = "editAddress", method = RequestMethod.GET)
    public ModelAndView edit(
            
            @RequestParam(name = "aid", required = false) String aid,
            
            @RequestParam(name = "pid", required = false) String pid
             
    ) {
        Address address = null;
        try {
            
            address = addressDAO.getOne(new Integer(aid));
        } catch (Exception ex) {
            
        }
        
        Person person = null;
        if (address != null) {
            t
            person = address.getPerson();
        } else { //naujas adresas
            address = new Address();
            /
            try {
                person = personDAO.getOne(new Integer(pid));
            } catch (Exception ex) {
                
            }
        }
        if (person == null) {
            
            return new ModelAndView("redirect:./");
        }
        ModelAndView mv = new ModelAndView("editAddress");
        mv.addObject("person", person);
        mv.addObject("address", address);
        return mv;
    }
    @RequestMapping(path = "saveAddress", method = RequestMethod.POST)
    @Transactional
    public String save(
            
            @RequestParam(name = "aid", required = false) String aid,
            
            @RequestParam(name = "pid", required = false) String pid,
          

            @RequestParam(name = "acity", required = false) String acity,
            @RequestParam(name = "astreet", required = false) String astreet
    ) {
        Address address = null;
        try {
            
            address = addressDAO.getOne(new Integer(aid));
        } catch (Exception ex) {
           
        }
        
        if (address == null) {
            
            address = new Address();
        }
        if (address.getPerson() == null) {
          
            try {
                Person person = personDAO.getOne(new Integer(pid));
                address.setPerson(person);
            } catch (Exception ex) {
                
            }
        }
        if (address.getPerson() == null) {
              return "redirect:./";
        }
       
        address.setStreet(astreet);
        address.setCity(acity);
        addressDAO.save(address);
        return "redirect:./addresses?pid=" + address.getPerson().getId();
    }

    @RequestMapping(path = "deleteAddress", method = RequestMethod.GET)
    @Transactional
    public String delete(
            @RequestParam(name = "aid") String aid
    ) {
        Integer pid = null;
        try {
            Address address = addressDAO.getOne(new Integer(aid));
            pid = address.getPerson().getId();
            addressDAO.delete(address);
        } catch (Exception ex) {
         
        }
        if (pid == null) {
          
            return "redirect:./";
        }
       
        return "redirect:./addresses?pid=" + pid;
    }
}
