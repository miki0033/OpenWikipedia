package com.infobasic.open_wikipedia.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class License {
    @Id
    private String id;

    @Indexed(unique = true)
    private String url;

    private String title;
}
