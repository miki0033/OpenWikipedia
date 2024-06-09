package com.infobasic.open_wikipedia.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestHeader;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.infobasic.open_wikipedia.common.util.exception.ErrorHandler;
import com.infobasic.open_wikipedia.common.util.security.jwt.JwtUtils;
import org.bson.types.ObjectId;
import com.infobasic.open_wikipedia.model.Article;
import com.infobasic.open_wikipedia.repository.ArticleRepository;

import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@Service
public class ArticleService {

    @Autowired
    ArticleRepository ArticleRepository;

    static final Logger logger = LogManager.getLogger(ArticleService.class.getName());

    // C
    public Article saveArticle(Article newArticle, ObjectId id) {
        Optional<Article> optDbArticle = ArticleRepository.findByKeyAndUserId(newArticle.getKey(), id);
        // caso aggiornamento articolo
        if (optDbArticle.isPresent()) {
            Article dbArticle = optDbArticle.get();
            dbArticle.setSource(newArticle.getSource());
            if (dbArticle.getContent_model() != newArticle.getContent_model()) {
                dbArticle.setContent_model(newArticle.getContent_model());
            }
            ArticleRepository.save(dbArticle);
        }
        // caso creazione articolo
        else {
            newArticle.setUserId(id);
            ArticleRepository.save(newArticle);
        }

        return newArticle;
    }

    // R
    public Article findByKey(String key, ObjectId id) {
        if (key != null) {
            Optional<Article> optional = ArticleRepository.findByKeyAndUserId(key, id);
            if (optional.isPresent()) {
                return optional.get();
            } else {
                throw new ErrorHandler(404, "Article not found");
            }
        } else {
            throw new ErrorHandler(400, "key null");
        }
    }

    public Page<Article> findAll(ObjectId id, Pageable pageable) {
        return ArticleRepository.findAllByUserId(id, pageable);
    }

    // U

    // D
}