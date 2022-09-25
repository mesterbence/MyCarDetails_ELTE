package hu.bmester.mycardetails.restcontroller;

import hu.bmester.mycardetails.service.CostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CostController {

    @Autowired
    private CostService costService;

    @GetMapping("/api/cost/costs")
    public ResponseEntity<?> getAllCosts() {
        return new ResponseEntity<>(costService.findAllCosts(), HttpStatus.OK);
    }
}
