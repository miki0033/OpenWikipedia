package com.infobasic.open_wikipedia.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.infobasic.open_wikipedia.model.Article;

import org.bson.types.ObjectId;

@Repository
public interface ArticleRepository extends MongoRepository<Article, String> {

    Optional<Article> findByKeyAndUserId(String key, ObjectId userId);
}
