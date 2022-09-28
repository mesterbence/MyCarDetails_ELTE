package hu.bmester.mycardetails.repository;

import hu.bmester.mycardetails.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
