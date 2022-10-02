package hu.bmester.mycardetails.restcontroller;

import hu.bmester.mycardetails.jwt.JwtUtil;
import hu.bmester.mycardetails.jwt.LoginCredentials;
import hu.bmester.mycardetails.model.User;
import hu.bmester.mycardetails.model.UserRole;
import hu.bmester.mycardetails.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Collections;
import java.util.Map;

@RestController
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
        if(null != userService.findUserByUsername(user.getUsername())) {
            return new ResponseEntity<>("Foglalt felhasználói név!",HttpStatus.CONFLICT);
        }
        if(null != userService.findUserByEmail(user.getEmail())) {
            return new ResponseEntity<>("Foglalt e-mail cím!",HttpStatus.CONFLICT);
        }
        userService.saveUser(user);
        return new ResponseEntity<>(userService.findUserByUsername(user.getUsername()), HttpStatus.CREATED); // TODO: rendes return
    }

    @PostMapping("/api/user/register")
    public Map<String, Object> registerHandler(@RequestBody User user){
        String encodedPass = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPass);
        user.setRole(UserRole.USER);
        user = userService.saveUser(user);
        String token = jwtUtil.generateToken(user.getUsername());
        return Collections.singletonMap("jwt-token", token);
    }

    @PostMapping("/api/user/login")
    public ResponseEntity<?> loginHandler(@RequestBody LoginCredentials body){
        try {
            UsernamePasswordAuthenticationToken authInputToken =
                    new UsernamePasswordAuthenticationToken(body.getUsername(), body.getPassword());

            authManager.authenticate(authInputToken);

            String token = jwtUtil.generateToken(body.getUsername());

            return new ResponseEntity<Map<String, Object>>(Collections.singletonMap("jwt-token", token),HttpStatus.OK);
        } catch (AuthenticationException authExc){
            return new ResponseEntity<Map<String, Object>>(Collections.singletonMap("error", "Hibás felhasználónév vagy jelszó!"),HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/api/user/changePass")
    public boolean changePass(@RequestBody String password){
        userService.changeUserPassword(passwordEncoder.encode(password));
        return true;
    }
}
