package com.infobasic.open_wikipedia.model;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Document(collection = "Thumbnail")
public class Thumbnail {
    private String mimetype;
    private int width;
    private int height;
    private int duration;
    private String url;

}
