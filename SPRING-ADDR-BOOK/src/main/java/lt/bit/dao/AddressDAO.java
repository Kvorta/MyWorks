package lt.bit.dao;

import lt.bit.data.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressDAO extends JpaRepository<Address, Integer> {

}
