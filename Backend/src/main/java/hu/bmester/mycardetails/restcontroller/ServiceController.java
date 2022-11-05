package hu.bmester.mycardetails.restcontroller;

import hu.bmester.mycardetails.model.*;
import hu.bmester.mycardetails.service.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@Slf4j
public class ServiceController {

    @Autowired
    private ServiceService serviceService;

    @Autowired
    private CarService carService;

    @GetMapping("/api/service/services")
    public ResponseEntity<?> getAllServices() {
        return new ResponseEntity<>(serviceService.findAllServices(), HttpStatus.OK);
    }

    @PostMapping("/api/service/new/{carId}")
    public ResponseEntity<?> addNewService(@RequestBody Service service, @PathVariable Long carId) {
        Car car = carService.findCarById(carId);
        service.setCar(car);
        return new ResponseEntity<>(serviceService.saveService(service), HttpStatus.CREATED);
    }

}
