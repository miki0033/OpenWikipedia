package com.infobasic.open_wikipedia.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.infobasic.open_wikipedia.common.util.exception.ErrorHandler;
import com.infobasic.open_wikipedia.model.User;
import com.infobasic.open_wikipedia.service.UserService;
import com.fasterxml.jackson.databind.JsonNode;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class UserController {
    static final Logger logger = LogManager.getLogger(UserController.class.getName());
    @Autowired
    private UserService UserService;

    // R
    @GetMapping("/v1/getUser/{id}")
    public ResponseEntity<JsonNode> getUser(@PathVariable String id) {
        try {
            User user = UserService.findById(id);
            return ResponseEntity.status(200).body(user.toJSON());
        } catch (ErrorHandler err) {
            logger.warn(err.getMessage());
            throw new ResponseStatusException(err.getStatus(), err.getMessage(), err);
        } catch (Exception e) {
            logger.error("An unexpected error occurred", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "An unexpected error occurred", e);
        }
    }

    /*
     * @GetMapping("/v1/getUserbyUsername/{userName}")
     * public User getUserByUsername(@PathVariable String userName) {
     * try {
     * return UserService.findByUsername(userName);
     * } catch (ErrorHandler err) {
     * logger.warn(err.getMessage());
     * throw new ResponseStatusException(err.getStatus(), err.getMessage(), err);
     * } catch (Exception e) {
     * logger.error("An unexpected error occurred", e);
     * throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
     * "An unexpected error occurred", e);
     * }
     * }
     */

    // U
    @PutMapping("/v1/updateUser/{id}")
    public ResponseEntity<JsonNode> updateUser(@PathVariable String id, @RequestBody User UserToUpdate) {
        try {
            User updatedUser = UserService.update(id, UserToUpdate);
            return ResponseEntity.status(200).body(updatedUser.toJSON());
        } catch (ErrorHandler err) {
            logger.warn(err.getMessage());
            throw new ResponseStatusException(err.getStatus(), err.getMessage(), err);
        } catch (Exception e) {
            logger.error("An unexpected error occurred", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "An unexpected error occurred", e);
        }
    }

    // D
    @DeleteMapping("/v1/deleteUser/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable String id) {
        try {
            UserService.delete(id);
            return ResponseEntity.status(200).body("User deleted with id: " + id);
        } catch (ErrorHandler err) {
            logger.warn(err.getMessage());
            return ResponseEntity.status(err.getStatus()).body(err.getMessage());
        } catch (Exception e) {
            logger.error("An unexpected error occurred", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
        }
    }

}
