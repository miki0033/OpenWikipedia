package com.infobasic.open_wikipedia.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Document(collection = "Articles")
public class Article {
    @Id
    private String _id;

    @Indexed
    private String id;

    @Indexed
    private String key;

    @Field
    private String title;
    @Field
    private Latest latest;

    @Field
    private String content_model;
    @Field
    private String source;

    @Field("userId")
    private ObjectId userId;

    public JsonNode toJSON() {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            objectMapper.registerModule(new JavaTimeModule());
            ObjectNode jsonNode = objectMapper.createObjectNode();
            jsonNode.put("id", this.id);
            jsonNode.put("key", this.key);
            jsonNode.put("title", this.title);
            jsonNode.put("content_model", this.content_model);
            jsonNode.put("source", this.source);
            return jsonNode;
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            return objectMapper.createObjectNode();
        }
    }
}
