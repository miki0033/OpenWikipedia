package com.infobasic.open_wikipedia.controller;

import com.github.rjeschke.txtmark.Processor;
import com.infobasic.open_wikipedia.payload.request.WikitextRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class WikitextToHtmlController {

    private static final Logger logger = LoggerFactory.getLogger(WikitextToHtmlController.class);

    @PostMapping("/convert")
    public String convertWikitextToHtml(@RequestBody String wikitext) {
        // logger.info("Received wikitext: {}", wikitext);
        try {
            if (wikitext == null || wikitext.trim().isEmpty()) {
                return "Il wikitext fornito è vuoto.";
            }

            String html = Processor.process(wikitext);
            // logger.info("Generated HTML: {}", html);
            return html;
        } catch (Exception e) {
            logger.error("Errore durante la conversione del wikitext in HTML.", e);
            return "Errore durante la conversione del wikitext in HTML.";
        }
    }

}