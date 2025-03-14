package hu.bmester.mycardetails.restcontroller;

import hu.bmester.mycardetails.exceptionhandler.ValidationException;
import hu.bmester.mycardetails.model.*;
import hu.bmester.mycardetails.service.CarService;
import hu.bmester.mycardetails.service.CostService;
import hu.bmester.mycardetails.service.CostTypeService;
import hu.bmester.mycardetails.service.FuelingService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;


@CrossOrigin({"*"})
@RestController
@Slf4j
public class CostController {

    @Autowired
    private CostService costService;

    @Autowired
    private CarService carService;

    @Autowired
    private CostTypeService costTypeService;

    @Autowired
    private FuelingService fuelingService;

    @Autowired
    private ControllerUtils controllerUtils;


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
        controllerUtils.validateCarExistsAndOwner(carId);
        return new ResponseEntity<>(costService.findByCarId(carId), HttpStatus.OK);
    }

    @PostMapping("/api/cost/create/{costTypeId}/{carId}")
    public ResponseEntity<?> createNewCost(@PathVariable Long carId, @PathVariable int costTypeId, @RequestBody Cost cost) {
        Car car = carService.findCarById(carId);
        controllerUtils.validateCarExistsAndOwner(car);
        CostType type = costTypeService.findCostById(costTypeId);
        if (null == type) throw new ValidationException("Nincs ilyen típus!");
        cost.setCar(car);
        cost.setType(type);
        costService.saveCost(cost);
        return new ResponseEntity<>(true, HttpStatus.CREATED);
    }

    @PostMapping("/api/cost/create/{carId}")
    public ResponseEntity<?> createNewCost2(@PathVariable Long carId, @RequestBody Cost cost) {
        Car car = carService.findCarById(carId);
        controllerUtils.validateCarExistsAndOwner(car);
        cost.setCar(car);
        return new ResponseEntity<>(costService.saveCost(cost), HttpStatus.CREATED);
    }

    @PostMapping("/api/cost/edit/{carId}")
    public ResponseEntity<?> editCost(@PathVariable Long carId, @RequestBody Cost cost) {
        Car car = carService.findCarById(carId);
        controllerUtils.validateCarExistsAndOwner(car);
        Cost costToUpdate = costService.findById(cost.getId());
        if (costToUpdate.getType().getName().equals("üzemanyag") && !cost.getType().getName().equals("üzemanyag")) {
            throw new ValidationException("Üzemanyag típus nem módosítható más típusra!");
        }
        if (!costToUpdate.getType().getName().equals("üzemanyag") && cost.getType().getName().equals("üzemanyag")) {
            throw new ValidationException("Típus nem módosítható üzemanyag típusra!");
        }
        costToUpdate.setCar(car);
        costToUpdate.setType(cost.getType());
        costToUpdate.setPrice(cost.getPrice());
        costToUpdate.setMileage(cost.getMileage());
        costToUpdate.setTitle(cost.getTitle());
        costToUpdate.setDate(cost.getDate());
        if (cost.getFueling() != null) {
            costToUpdate.getFueling().setQuantity(cost.getFueling().getQuantity());
            costToUpdate.getFueling().setType(cost.getFueling().getType());
            costToUpdate.getFueling().setIsFull(cost.getFueling().getIsFull());
            costToUpdate.getFueling().setIsPremium(cost.getFueling().getIsPremium());
        }
        return new ResponseEntity<>(costService.saveCost(costToUpdate), HttpStatus.OK);
    }

    @GetMapping("/api/cost/fueling/{carId}")
    public ResponseEntity<?> getAllFuelingsByCarId(@PathVariable Long carId) {
        controllerUtils.validateCarExistsAndOwner(carId);
        return new ResponseEntity<>(costService.findFuelings(carId), HttpStatus.OK);
    }

    @GetMapping("/api/cost/fueling/{carId}/{year}")
    public ResponseEntity<?> getAllFuelingsByCarIdByYear(@PathVariable Long carId, @PathVariable Integer year) {
        controllerUtils.validateCarExistsAndOwner(carId);
        return new ResponseEntity<>(costService.findFuelingsByYear(carId, year), HttpStatus.OK);
    }

    @GetMapping("/api/cost/years/{carId}")
    public ResponseEntity<?> getDistinctYear(@PathVariable Long carId) {
        controllerUtils.validateCarExistsAndOwner(carId);
        return new ResponseEntity<>(costService.findDistinctYearsByCarId(carId), HttpStatus.OK);
    }

    @GetMapping("/api/cost/fueling/{carId}/{date}/{mileage}")
    public ResponseEntity<?> getLastTwoFuelingBeforeCost(@PathVariable Long carId, @PathVariable String date, @PathVariable Integer mileage) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        controllerUtils.validateCarExistsAndOwner(carId);
        try {
            AtomicBoolean allFull = new AtomicBoolean(true);
            List<FuelingCostResponse> lastThreeFueling = fuelingService.findLastThreeFuelingsByFuelingData(carId, new Timestamp(dateFormat.parse(date).getTime()), mileage);
            lastThreeFueling.forEach(fueling -> {
                if (!fueling.getIsFull()) {
                    allFull.set(false);
                }
            });
            if (lastThreeFueling.size() != 3 || !allFull.get()) {
                return new ResponseEntity<>(null, HttpStatus.OK);
            }
            double currentFuelingConsumption = lastThreeFueling.get(0).getQuantity() / (lastThreeFueling.get(0).getMileage() - lastThreeFueling.get(1).getMileage()) * 100;
            double previousFuelingConsumption = lastThreeFueling.get(1).getQuantity() / (lastThreeFueling.get(1).getMileage() - lastThreeFueling.get(2).getMileage()) * 100;
            return new ResponseEntity<>(new FuelingCostResult(currentFuelingConsumption < previousFuelingConsumption, currentFuelingConsumption), HttpStatus.OK);
        } catch (ParseException e) {
            throw new ValidationException("Hibás dátum formátum!");
        }
    }
    @DeleteMapping("/api/cost/delete/{costId}")
    @Transactional
    public ResponseEntity<?> deleteCost(@PathVariable Long costId) {
        Cost costToDel = costService.findById(costId);
        controllerUtils.validateCarExistsAndOwner(costToDel.getCar());
        costToDel.setCar(null);
        costService.delete(costToDel);
        return new ResponseEntity<>(true, HttpStatus.OK);
    }
}
