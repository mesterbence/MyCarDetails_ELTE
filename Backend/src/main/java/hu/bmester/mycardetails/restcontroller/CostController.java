package hu.bmester.mycardetails.restcontroller;

import hu.bmester.mycardetails.service.CostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class CostController {

    @Autowired
    private CostService costService;

    @GetMapping("/api/cost/costs")
    public ResponseEntity<?> getAllCosts() {
        return new ResponseEntity<>(costService.findAllCosts(), HttpStatus.OK);
    }

    @GetMapping("/api/cost/bycar/{carId}")
    public ResponseEntity<?> getAllCostsByCarId(@PathVariable Long carId) {
        return new ResponseEntity<>(costService.findByCarId(carId), HttpStatus.OK);
    }
}
