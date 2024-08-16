package hu.bmester.mycardetails.restcontroller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin({"http://localhost:4200","https://bmester.hu","http://localhost"})
@RestController
public class HealthController {

    @GetMapping("/api/health")
    public ResponseEntity<?> getHealth() {
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
