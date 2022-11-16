package hu.bmester.mycardetails.restcontroller;

import hu.bmester.mycardetails.jwt.JwtUtil;
import hu.bmester.mycardetails.model.*;
import hu.bmester.mycardetails.service.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@Slf4j
public class CarController {

    @Autowired
    private CarService carService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @Autowired
    private CostService costService;

    @Autowired
    private FuelingService fuelingService;

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

    @GetMapping("/api/car/get/{carId}")
    public ResponseEntity<?> getCarById(@PathVariable Long carId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object currentPrincipalName = authentication.getPrincipal();
        Car car = carService.findCarById(carId);
        if(car.getOwner().getUsername().equals(currentPrincipalName.toString())) {
            return new ResponseEntity<>(carService.findCarById(carId), HttpStatus.OK);
        }
        return new ResponseEntity<>("Nincs jog", HttpStatus.FORBIDDEN);
    }


    @PostMapping("/api/car/create")
    public ResponseEntity<?> createNewCar(@Valid @RequestBody Car car) {
        if(null != carService.findCarByNumberplate(car.getNumberplate())) {
            return new ResponseEntity<>("Foglalt rendszám!",HttpStatus.CONFLICT);
        }
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object currentPrincipalName = authentication.getPrincipal();
        car.setOwner(userService.findUserByUsername(currentPrincipalName.toString()));
        carService.createCar(car);
        return new ResponseEntity<>(carService.findCarByNumberplate(car.getNumberplate()), HttpStatus.CREATED); // TODO: rendes return
    }

    @PostMapping("/api/car/modify/{carId}")
    public ResponseEntity<?> editCar(@PathVariable Long carId, @Valid @RequestBody Car car) {
        Car carToUpdate = carService.findCarById(carId);
        if(null == carToUpdate) {
            return new ResponseEntity<>("Nincs ilyen autó!",HttpStatus.NOT_FOUND);
        }
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object currentPrincipalName = authentication.getPrincipal();
        carToUpdate.setOwner(userService.findUserByUsername(currentPrincipalName.toString()));
        carToUpdate.setNumberplate(car.getNumberplate());
        carToUpdate.setBrand(car.getBrand());
        carToUpdate.setModel(car.getModel());
        carToUpdate.setFuelType(car.getFuelType());
        log.error(car.toString());
        log.error(carToUpdate.toString());
        carService.updateCar(carToUpdate);
        return new ResponseEntity<>(carToUpdate, HttpStatus.OK); // TODO: rendes return
    }

    @GetMapping("/api/car/stat/{carId}")
    public ResponseEntity<?> getSum(@PathVariable Long carId) {
        Car car = carService.findCarById(carId);
        CostStatistic costStatistic = new CostStatistic();
        costStatistic.setPriceSum(costService.getPriceSum(carId));
        costStatistic.setFuelingSum(fuelingService.getFuelSum(carId));
        costStatistic.setMileageSum(costService.getTraveledDistance(carId));
        Fueling firstFueling = fuelingService.findFirstByCost_Car(car);
        Fueling lastFueling = fuelingService.findFirstByCost_CarDesc(car);
        if(costStatistic.getMileageSum() != null && costStatistic.getFuelingSum() != null && firstFueling != lastFueling) {
            costStatistic.setConsumption((costStatistic.getFuelingSum() - lastFueling.getQuantity()) / costStatistic.getMileageSum() * 100);
        }
        return new ResponseEntity<>(costStatistic, HttpStatus.OK);
    }

    @GetMapping("/api/car/mileages/{carId}")
    public ResponseEntity<?> getMileages(@PathVariable Long carId) {
        Car car = carService.findCarById(carId);
        ArrayList<Mileage> mileages = new ArrayList<>();
        costService.findAllCostsWithMileage(carId).forEach((cost) -> {
            mileages.add(new Mileage(cost.getDate(), cost.getMileage()));
        });
        return new ResponseEntity<>(mileages, HttpStatus.OK);
    }
    @GetMapping("/api/car/categories/{carId}")
    public ResponseEntity<?> getCategs(@PathVariable Long carId) {
        return new ResponseEntity<>(costService.getCategoryStat(carId), HttpStatus.OK);
    }

    @GetMapping("/api/car/morestat/{carId}")
    public ResponseEntity<?> getMoreStat(@PathVariable Long carId) {
        CarStatistic carStatistic = new CarStatistic();
        Car car = carService.findCarById(carId);
        carStatistic.setSumPrice(costService.getPriceSum(carId));
        carStatistic.setSumMileage(costService.getTraveledDistance(carId));
        carStatistic.setSumFueling(fuelingService.getFuelSum(carId));
        carStatistic.setPricePerKilometer((double) (carStatistic.getSumPrice() / carStatistic.getSumMileage()));
        Fueling firstFueling = fuelingService.findFirstByCost_Car(car);
        Fueling lastFueling = fuelingService.findFirstByCost_CarDesc(car);
        if(carStatistic.getSumMileage() != null && carStatistic.getSumFueling() != null && firstFueling != lastFueling) {
            carStatistic.setAvgConsumption((carStatistic.getSumFueling() - lastFueling.getQuantity()) / carStatistic.getSumMileage() * 100);
        }
        return new ResponseEntity<>(carStatistic, HttpStatus.OK);
    }
    @GetMapping("/api/car/morestat/{carId}/{year}")
    public ResponseEntity<?> getMoreStat(@PathVariable Long carId, @PathVariable Integer year) {
        CarStatistic carStatistic = new CarStatistic();
        Car car = carService.findCarById(carId);
        carStatistic.setSumPrice(costService.getPriceSum(carId));
        carStatistic.setSumMileage(costService.getTraveledDistanceByYear(carId,year));
        carStatistic.setSumFueling(fuelingService.getFuelSumByYear(carId,year));
        carStatistic.setSelectedYearSum(costService.getPriceSumByYear(carId,year));
        carStatistic.setPricePerKilometer((double) (carStatistic.getSelectedYearSum() / carStatistic.getSumMileage()));
        Fueling firstFueling = fuelingService.findFirstByCost_Car(car);
        Fueling lastFueling = fuelingService.findFirstByCost_CarDesc(car);
        if(carStatistic.getSumMileage() != null && carStatistic.getSumFueling() != null && firstFueling != lastFueling) {
            carStatistic.setAvgConsumption((carStatistic.getSumFueling() - lastFueling.getQuantity()) / carStatistic.getSumMileage() * 100);
        }
        carStatistic.setSelectedYearMonthlyAvg((double)costService.getPriceSumByYear(carId,year)/12);
        return new ResponseEntity<>(carStatistic, HttpStatus.OK);
    }

}
