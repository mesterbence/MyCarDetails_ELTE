package hu.bmester.mycardetails.restcontroller;

import hu.bmester.mycardetails.exceptionhandler.ValidationException;
import hu.bmester.mycardetails.jwt.JwtUtil;
import hu.bmester.mycardetails.jwt.LoginCredentials;
import hu.bmester.mycardetails.model.LoginResponse;
import hu.bmester.mycardetails.model.User;
import hu.bmester.mycardetails.model.UserRole;
import hu.bmester.mycardetails.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin({"http://localhost:4200","https://bmester.hu"})
@RestController
@Slf4j
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/api/user/users")
    public ResponseEntity<?> getAllUsers() {
        return new ResponseEntity<>(userService.findAllUsers(), HttpStatus.OK);
    }

    @PostMapping("/api/user/create")
    public ResponseEntity<?> createNewUser(@Valid @RequestBody User user) {
        user.setRole(UserRole.USER);
        log.error(user.toString());
        if(null != userService.findUserByUsername(user.getUsername())) {
            throw new ValidationException("Foglalt felhasználói név!");
        }
        if(null != userService.findUserByEmail(user.getEmail())) {
            throw new ValidationException("Foglalt e-mail cím!");
        }
        String encodedPass = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPass);
        userService.saveUser(user);
        return new ResponseEntity<>(userService.findUserByUsername(user.getUsername()), HttpStatus.CREATED); // TODO: rendes return
    }

    @PostMapping("/api/user/login")
    public ResponseEntity<?> loginHandler(@RequestBody LoginCredentials body){
        LoginResponse loginResponse = new LoginResponse();
        try {
            UsernamePasswordAuthenticationToken authInputToken = new UsernamePasswordAuthenticationToken(body.getUsername(), body.getPassword());
            authManager.authenticate(authInputToken);
            String token = jwtUtil.generateToken(body.getUsername());
            loginResponse.setUser(userService.findUserByUsername(body.getUsername()));
            loginResponse.setToken(token);
            return new ResponseEntity<>(loginResponse,HttpStatus.OK);
        } catch (AuthenticationException authExc){
            throw new UsernameNotFoundException("Hibás felhasználói név vagy jelszó!");
        }
    }

    @PostMapping("/api/user/changePass")
    public boolean changePass(@RequestBody String password){
        userService.changeUserPassword(passwordEncoder.encode(password));
        return true;
    }

    @PostMapping("/api/user/changeMail")
    public boolean changeMail(@RequestBody String mail){
        userService.changeUserMail(mail);
        return true;
    }

    @GetMapping("/api/user/me")
    public ResponseEntity<?> getSelfUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object currentPrincipalName = authentication.getPrincipal();
        return new ResponseEntity<>(userService.findUserByUsername(currentPrincipalName.toString()), HttpStatus.OK);
    }

}
