package hu.bmester.mycardetails.exceptionhandler;

public class ValidationException extends RuntimeException {
    public ValidationException(String message) {
        super(message);
    }
}
