package com.infobasic.open_wikipedia.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.fasterxml.jackson.databind.JsonNode;
import com.infobasic.open_wikipedia.common.util.exception.ErrorHandler;
import com.infobasic.open_wikipedia.common.util.security.jwt.JwtUtils;
import com.infobasic.open_wikipedia.model.Article;
import com.infobasic.open_wikipedia.service.ArticleService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class ArticleController {
    static final Logger logger = LogManager.getLogger(UserController.class.getName());
    @Autowired
    ArticleService ArticleService;
    @Autowired
    JwtUtils jwtUtils;

    // C
    @PostMapping("/v1/saveArticle")
    public ResponseEntity<JsonNode> saveArticle(@RequestHeader("Authorization") String authorizationHeader,
            @RequestBody Article newArticle) {
        try {
            String token = jwtUtils.getToken(authorizationHeader);
            ObjectId id = new ObjectId(jwtUtils.getIdFromJwtToken(token));
            Article Article = ArticleService.saveArticle(newArticle, id);
            return ResponseEntity.status(200).body(Article.toJSON());
        } catch (ErrorHandler err) {
            logger.warn(err.getMessage());
            throw new ResponseStatusException(err.getStatus(), err.getMessage(), err);
        } catch (Exception e) {
            logger.error("An unexpected error occurred", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "An unexpected error occurred", e);
        }
    }

    // R
    @GetMapping("/v1/getArticle/{key}")
    public ResponseEntity<String> getArticle(@PathVariable String key) {
        try {
            Article Article = ArticleService.findByKey(key);
            return ResponseEntity.status(200).body(Article.toString());
        } catch (ErrorHandler err) {
            logger.warn(err.getMessage());
            throw new ResponseStatusException(err.getStatus(), err.getMessage(), err);
        } catch (Exception e) {
            logger.error("An unexpected error occurred", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "An unexpected error occurred", e);
        }
    }

    // U

    // D

}
