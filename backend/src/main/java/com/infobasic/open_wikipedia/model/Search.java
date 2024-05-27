package com.infobasic.open_wikipedia.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Search {
    private Long id;

    private String key;

    private String title;

    private String excerpt;

    private String matched_title;

    private String description;

    private Thumbnail thumbnail;

}
