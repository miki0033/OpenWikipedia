package com.infobasic.open_wikipedia.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Document(collection = "Articles")
public class Article {
    @Id
    private Long id;

    @Indexed(unique = true)
    private String key;

    @Field
    private String title;
    @Field
    private Latest latest;

    @Field
    private String content_model;
    @Field
    private String source;

}
