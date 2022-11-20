package hu.bmester.mycardetails.exceptionhandler;

public class CarNotFoundException extends RuntimeException {
    public CarNotFoundException(String message) {
        super(message);
    }
}
