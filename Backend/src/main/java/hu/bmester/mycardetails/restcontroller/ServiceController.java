package hu.bmester.mycardetails.restcontroller;

import hu.bmester.mycardetails.model.*;
import hu.bmester.mycardetails.service.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@Slf4j
public class ServiceController {

    @Autowired
    private ServiceService serviceService;

    @Autowired
    private CarService carService;

    @Autowired
    private UserService userService;

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

    @GetMapping("/api/service/own/sum/actual")
    public ResponseEntity<?> getOwnServices() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object currentPrincipalName = authentication.getPrincipal();
        User user = userService.findUserByUsername(currentPrincipalName.toString());
        List<Car> cars = carService.findCarsByOwner(user);
        List<ServiceSummary> sum = new ArrayList<>();
        cars.forEach(car -> {
            List<Service> services = serviceService.findActualServicesByCarId(car.getId());
            sum.add(new ServiceSummary(car.getId(), services.size()));
        });

        return new ResponseEntity<>(sum, HttpStatus.OK);
    }

    @GetMapping("/api/services/{carId}")
    public ResponseEntity<?> getServicesByCarId(@PathVariable Long carId) {
        return new ResponseEntity<>(serviceService.findServicesByCarId(carId), HttpStatus.OK);
    }
}
