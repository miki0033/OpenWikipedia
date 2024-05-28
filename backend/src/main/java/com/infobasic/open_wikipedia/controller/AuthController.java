package com.infobasic.open_wikipedia.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.infobasic.open_wikipedia.payload.request.LoginRequest;
import com.infobasic.open_wikipedia.payload.request.SignupRequest;
import com.infobasic.open_wikipedia.service.UserService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthController {

  @Autowired
  UserService userService;

  @PostMapping("v1/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
    return userService.login(loginRequest);
  }

  @PostMapping("v1/signup")
  public ResponseEntity<?> registerUser(@RequestBody SignupRequest signUpRequest) {
    return userService.registerUser(signUpRequest);
  }
}
