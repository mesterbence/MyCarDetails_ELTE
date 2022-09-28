package hu.bmester.mycardetails.restcontroller;

import hu.bmester.mycardetails.model.Car;
import hu.bmester.mycardetails.model.User;
import hu.bmester.mycardetails.model.UserRole;
import hu.bmester.mycardetails.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
public class CarController {

    @Autowired
    private CarService carService;

    @GetMapping("/api/car/cars")
    public ResponseEntity<?> getAllCars() {
        return new ResponseEntity<>(carService.findAllCars(), HttpStatus.OK);
    }

    @PostMapping("/api/car/create")
    public ResponseEntity<?> createNewCar(@Valid @RequestBody Car car) {
        if(null != carService.findCarByNumberplate(car.getNumberplate())) {
            return new ResponseEntity<>("Foglalt rendszám!",HttpStatus.CONFLICT);
        }
        carService.createCar(car);
        return new ResponseEntity<>(carService.findCarByNumberplate(car.getNumberplate()), HttpStatus.CREATED); // TODO: rendes return
    }
}
