package com.infobasic.open_wikipedia.common.util;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class FileUtils {

    public static String readFile(String filePath) throws IOException {
        StringBuilder content = new StringBuilder();

        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
            String line;
            while ((line = reader.readLine()) != null) {
                content.append(line).append("\n");
            }
        }

        return content.toString();
    }

    public static void main(String[] args) {
        String filePath = ""; // Inserisci il percorso del tuo file qui
        try {
            String fileContent = readFile(filePath);
            System.out.println("Contenuto del file:");
            System.out.println(fileContent);
        } catch (IOException e) {
            System.err.println("Errore durante la lettura del file: " + e.getMessage());
        }
    }
}