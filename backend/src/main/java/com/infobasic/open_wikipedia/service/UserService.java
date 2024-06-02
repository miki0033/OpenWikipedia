package com.infobasic.open_wikipedia.service;

import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.infobasic.open_wikipedia.common.util.exception.ErrorHandler;
import com.infobasic.open_wikipedia.common.util.security.jwt.JwtUtils;
import com.infobasic.open_wikipedia.common.util.security.services.UserDetailsImpl;
import com.infobasic.open_wikipedia.model.User;
import com.infobasic.open_wikipedia.payload.request.LoginRequest;
import com.infobasic.open_wikipedia.payload.request.SignupRequest;
import com.infobasic.open_wikipedia.payload.response.JwtResponse;
import com.infobasic.open_wikipedia.payload.response.MessageResponse;
import com.infobasic.open_wikipedia.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtUtils jwtUtils;

    static final Logger logger = LogManager.getLogger(UserService.class.getName());

    // C

    public ResponseEntity<?> registerUser(SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user's account
        User user = new User(
                signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()),
                signUpRequest.getFirstName(),
                signUpRequest.getLastName());

        User newUser = userRepository.save(user);

        return ResponseEntity.status(202).body(newUser.toJSON());
    }

    // R
    public ResponseEntity<?> login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        updateLastLogin(userDetails.getId());
        return ResponseEntity.ok(new JwtResponse(jwt, userDetails));

    }

    public User findById(String id) {
        if (id != null) {
            Optional<User> optional = userRepository.findById(id);
            if (optional.isPresent()) {
                return optional.get();
            } else {
                throw new ErrorHandler(404, "User not found");
            }
        } else {
            throw new ErrorHandler(400, "Id null");
        }
    }

    public User findByUsername(String name) {
        Optional<User> optional = userRepository.findByUsername(name);
        if (optional.isPresent()) {
            return optional.get();
        } else {
            throw new ErrorHandler(404, "User not found");
        }
    }

    public Page<User> findAll(Pageable pageable) {
        try {
            if (pageable != null) {
                return userRepository.findAll(pageable);
            } else {
                throw new ErrorHandler(400, "pageable null");
            }
        } catch (Exception e) {
            logger.error("Error UserService:findAll" + e.getMessage(), e);
            return null;
        }
    }

    // U
    public User update(String id, User userUpdate) {
        if (id == null) {
            throw new ErrorHandler(400, "User id is null");
        }
        Optional<User> userResult = userRepository.findById(id);
        if (!userResult.isPresent()) {
            throw new ErrorHandler(404, "User not found");
        }
        User existingUser = userResult.get();
        if (userUpdate != null) {
            // Aggiorna i dettagli dell'utente solo se sono stati forniti nel payload
            if (userUpdate.getUsername() != null &&
                    existingUser.getUsername().equals(userUpdate.getUsername())) {
                existingUser.setUsername(userUpdate.getUsername());
            }
            if (userUpdate.getEmail() != null) {
                existingUser.setEmail(userUpdate.getEmail());
            }
            userRepository.save(existingUser);
            return existingUser;
        } else {
            throw new ErrorHandler(400, "User update details are null");
        }

    }

    public User updateLastLogin(String id) {
        try {
            if (id != null) {
                Optional<User> optUser = userRepository.findById(id);
                User existingUser = optUser.get();
                userRepository.save(existingUser);
                return existingUser;
            } else {
                throw new ErrorHandler(500, "updateLastLogin: id is null");
            }
        } catch (Exception e) {
            logger.error("updateLastLogin: " + e.getMessage());
            throw new ErrorHandler(500, "updateLastLogin: " + e.getMessage());
        }

    }

    // D
    public void delete(String id) {
        try {
            if (id != null) {
                userRepository.deleteById(id);
            } else {
                throw new ErrorHandler(404, "User not found");
            }
        } catch (Exception e) {
            throw new ErrorHandler(500, e.getMessage());
        }
    }

}
