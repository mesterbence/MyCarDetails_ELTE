package hu.bmester.mycardetails.restcontroller;

import hu.bmester.mycardetails.exceptionhandler.CarNotFoundException;
import hu.bmester.mycardetails.jwt.JwtUtil;
import hu.bmester.mycardetails.model.Car;
import hu.bmester.mycardetails.model.UserRole;
import hu.bmester.mycardetails.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Component;

@Component
public class ControllerUtils {

    @Autowired
    private CarService carService;

    @Autowired
    private JwtUtil jwtUtil;

    protected void validateCarExistsAndOwner(Long carId) {
        Car car = carService.findCarById(carId);
        validateCarExistsAndOwner(car);
    }
    protected void validateCarExistsAndOwner(Car car) {
        if(car == null) {
            throw new CarNotFoundException("Nincs ilyen autó!");
        }
        if(!car.getOwner().equals(jwtUtil.getAuthenticatedUser()) && !jwtUtil.getAuthenticatedUser().getRole().equals(UserRole.ADMIN)) {
            throw new AccessDeniedException("Nincs joga az autó adatainak lekéréséhez!");
        }
    }
}
