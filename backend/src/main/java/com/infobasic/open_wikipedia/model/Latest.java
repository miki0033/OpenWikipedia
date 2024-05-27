package com.infobasic.open_wikipedia.model;

import java.time.LocalDate;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
// @Document(collection = "Latest")
public class Latest {
    private Long latest;
    private LocalDate timestamp;
}
