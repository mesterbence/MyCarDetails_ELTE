package hu.bmester.mycardetails.exceptionhandler;

import hu.bmester.mycardetails.jwt.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.Date;

@RestControllerAdvice
@Slf4j
public class CustomResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    @Autowired
    private JwtUtil jwtUtil;

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorMessage> handleAccessDeniedException(RuntimeException e, WebRequest request) {
        ErrorMessage errorMessage = new ErrorMessage(new Date(), e.getMessage(), request.getDescription(false));
        log.error(jwtUtil.getAuthenticatedUser().getUsername() + ": AccessDeniedException " + errorMessage.toString());
        return new ResponseEntity<>(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ErrorMessage> handleValidationException(ValidationException e, WebRequest request) {
        ErrorMessage errorMessage = new ErrorMessage(new Date(), e.getMessage(), request.getDescription(false));
        log.error(jwtUtil.getAuthenticatedUser().getUsername() + ": ValidationException " + errorMessage.toString());
        return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(CarNotFoundException.class)
    public ResponseEntity<ErrorMessage> handleCarNotFoundException(CarNotFoundException e, WebRequest request) {
        ErrorMessage errorMessage = new ErrorMessage(new Date(), e.getMessage(), request.getDescription(false));
        log.error(jwtUtil.getAuthenticatedUser().getUsername() + ": CarNotFoundException " + errorMessage.toString());
        return new ResponseEntity<>(errorMessage, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ServiceNotFoundException.class)
    public ResponseEntity<ErrorMessage> handleServiceNotFoundException(ServiceNotFoundException e, WebRequest request) {
        ErrorMessage errorMessage = new ErrorMessage(new Date(), e.getMessage(), request.getDescription(false));
        log.error(jwtUtil.getAuthenticatedUser().getUsername() + ": ServiceNotFoundException " + errorMessage.toString());
        return new ResponseEntity<>(errorMessage, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ErrorMessage> handleUsernameNotFoundException(UsernameNotFoundException e, WebRequest request) {
        ErrorMessage errorMessage = new ErrorMessage(new Date(), e.getMessage(), request.getDescription(false));
        log.error(jwtUtil.getAuthenticatedUser().getUsername() + ": UsernameNotFoundException " + errorMessage.toString());
        return new ResponseEntity<>(errorMessage, HttpStatus.NOT_FOUND);
    }

}