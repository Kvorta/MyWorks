
package lt.bit.dao;

import java.math.BigDecimal;
import java.util.List;
import lt.bit.data.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PersonDAO extends JpaRepository<Person, Integer> {
//    AL situ eiluciu nera 
//    @Query(name = "Person.findAll")
//    public List<Person>  findAll();
    
    
//    @Query(name = "Person.findBySalary")
//    public List<Person> bySalary(@Param("salary")BigDecimal salary); 
//    @Query("select p from Person p where p.firstName = :fn")    
//    public List<Person> byName(@Param("fn")String name); 
    
}
