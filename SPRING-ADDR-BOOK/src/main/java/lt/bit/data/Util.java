/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package lt.bit.data;

public class Util {
    
        public static String escapetHTML(String s){
        
         String ss;
         if (s==null) return s;
          ss=s.replace("&", "&amp;");
          ss =ss.replace("<", "&lt;");
         
          ss=ss.replace(">", "&gt;");
          
          ss=ss.replace("\"", "&quot;");
          ss=ss.replace("\'", "&apos;");
          

          
      
      return ss;  
    }
    
//    public static void initPerson (){
//        Person per=Person.NewPerson("Jonas","Petraitis", LocalDate.of(2000, 1, 31), new BigDecimal(100.00));
//        
//        List<Address> addressList1= new ArrayList<>();
//        Address.NewAddress( "Vilnius", "Zirmunu 15-55", addressList1 );
//        Address.NewAddress( "Kaunas", "Laisves 55-88" , addressList1 );
//        per.setAddresses(addressList1);
//        
//        List<Contact> contactList1= new ArrayList<>();
//        Contact.NewContact("mobilus", "645654615-55", contactList1 );
//        Contact.NewContact("rysinis", "5533 55-88", contactList1 );
//        per.setContacts(contactList1);
//        
//        per=Person.NewPerson("Petras","Jonaitis", LocalDate.of(2000, 1, 3), new BigDecimal(200.00));
//        
//        List<Address> addressList2= new ArrayList<>();
//        Address.NewAddress( "Vvvvilnius", "Zvvvvirmunu 15-55", addressList2 );
//        Address.NewAddress( "Kvvvavvvunas", "Lvvvaisves 55-88" , addressList2 );
//        per.setAddresses(addressList2);
//        
//        List<Contact> contactList2= new ArrayList<>();
//        Contact.NewContact("maaaaobilus", "6aaaa45654615-55", contactList2 );
//        Contact.NewContact("raaaysinis", "5aaa533 55-88", contactList2 );
//        per.setContacts(contactList2);
//        
//    }    
    /////////////////////////////////////////
        
        
        
        
        
        
        
        
        
    
}
