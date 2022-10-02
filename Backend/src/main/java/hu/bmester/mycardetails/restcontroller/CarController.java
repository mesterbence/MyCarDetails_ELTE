package hu.bmester.mycardetails.restcontroller;

import hu.bmester.mycardetails.jwt.JwtUtil;
import hu.bmester.mycardetails.model.Car;
import hu.bmester.mycardetails.service.CarService;
import hu.bmester.mycardetails.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
public class CarController {

    @Autowired
    private CarService carService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserServiceImpl userService;

    @GetMapping("/api/car/cars")
    public ResponseEntity<?> getAllCars() {
        return new ResponseEntity<>(carService.findAllCars(), HttpStatus.OK);
    }

    @GetMapping("/api/car/own")
    public ResponseEntity<?> getOwnCars() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object currentPrincipalName = authentication.getPrincipal();
        return new ResponseEntity<>(carService.findCarsByOwner(userService.findUserByUsername(currentPrincipalName.toString())), HttpStatus.OK);
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
