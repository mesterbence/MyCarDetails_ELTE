package hu.bmester.mycardetails.restcontroller;

import hu.bmester.mycardetails.model.*;
import hu.bmester.mycardetails.service.CarService;
import hu.bmester.mycardetails.service.CostService;
import hu.bmester.mycardetails.service.CostTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class CostController {

    @Autowired
    private CostService costService;

    @Autowired
    private CarService carService;

    @Autowired
    private CostTypeService costTypeService;

    @GetMapping("/api/cost/costs")
    public ResponseEntity<?> getAllCosts() {
        return new ResponseEntity<>(costService.findAllCosts(), HttpStatus.OK);
    }

    @GetMapping("/api/cost/types")
    public ResponseEntity<?> getAllCostTypes() {
        return new ResponseEntity<>(costTypeService.findAllCostTypes(), HttpStatus.OK);
    }


    @GetMapping("/api/cost/bycar/{carId}")
    public ResponseEntity<?> getAllCostsByCarId(@PathVariable Long carId) {
        return new ResponseEntity<>(costService.findByCarId(carId), HttpStatus.OK);
    }

    @PostMapping("/api/cost/create/{costTypeId}/{carId}")
    public ResponseEntity<?> createNewCost(@PathVariable Long carId, @PathVariable int costTypeId, @RequestBody Cost cost) {
        Car car = carService.findCarById(carId);
        if(null == car) return new ResponseEntity<>("Nincs ilyen autó!",HttpStatus.NOT_FOUND); // TODO: json hibássá tenni
        CostType type = costTypeService.findCostById(costTypeId);
        if(null == type) return new ResponseEntity<>("Nincs ilyen típus!",HttpStatus.NOT_FOUND);
        cost.setCar(car);
        cost.setType(type);
        costService.saveCost(cost);
        return new ResponseEntity<>(true, HttpStatus.CREATED); // TODO: rendes return
    }

    @PostMapping("/api/cost/create/{carId}")
    public ResponseEntity<?> createNewCost2(@PathVariable Long carId, @RequestBody Cost cost) {
        Car car = carService.findCarById(carId);
        if(null == car) return new ResponseEntity<>("Nincs ilyen autó!",HttpStatus.NOT_FOUND); // TODO: json hibássá tenni
        cost.setCar(car);
        costService.saveCost(cost);
        return new ResponseEntity<>(true, HttpStatus.CREATED); // TODO: rendes return
    }
}
