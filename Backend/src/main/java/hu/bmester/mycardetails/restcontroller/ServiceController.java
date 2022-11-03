package hu.bmester.mycardetails.restcontroller;

import hu.bmester.mycardetails.jwt.JwtUtil;
import hu.bmester.mycardetails.model.Car;
import hu.bmester.mycardetails.model.CostStatistic;
import hu.bmester.mycardetails.model.Fueling;
import hu.bmester.mycardetails.model.Mileage;
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
public class ServiceController {

    @Autowired
    private ServiceService serviceService;

    @GetMapping("/api/service/services")
    public ResponseEntity<?> getAllServices() {
        return new ResponseEntity<>(serviceService.findAllServices(), HttpStatus.OK);
    }

}
