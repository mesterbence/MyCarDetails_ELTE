package hu.bmester.mycardetails.restcontroller;

import hu.bmester.mycardetails.service.FuelTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin({"http://localhost:4200","https://bmester.hu"})
@RestController
public class FuelTypeController {

    @Autowired
    private FuelTypeService fuelTypeService;

    @GetMapping("/api/fueltype/fueltypes")
    public ResponseEntity<?> getAllFuelTypes() {
        return new ResponseEntity<>(fuelTypeService.findAllFuelType(), HttpStatus.OK);
    }

}
