package hu.bmester.mycardetails.model;

import lombok.Data;

@Data
public class LoginResponse {
    String token;
    User user;
}
