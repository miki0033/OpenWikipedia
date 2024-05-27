from flask import Flask, request
import mwparserfromhell
import markdown2
from flask_cors import CORS
import subprocess
import pandoc

app = Flask(__name__)
CORS(app)

doc = pandoc.Document()


@app.route("/wikitext_to_html", methods=["POST"])
def wikitext_to_html():
    # Ottieni il wikitesto dal corpo della richiesta
    wikitext = request.get_data(as_text=True)

    # Analizza il wikitesto utilizzando mwparserfromhell
    wikicode = mwparserfromhell.parse(wikitext)

    # Trasforma il wikitesto analizzato in Markdown
    markdown_text = str(wikicode)

    # Converte il Markdown in HTML utilizzando markdown2
    html = markdown2.markdown(markdown_text)

    # Restituisci l'HTML come risposta
    return html


"""
@app.route("/convert", methods=["POST"])
def convert():
    wikitext = request.get_data(as_text=True)
    html = wikitext_to_html(wikitext)
    return html"""


@app.route("/convert", methods=["POST"])
def convert_mediawiki_to_html():
    mediawiki_text = request.get_data(as_text=True)
    doc.mediawiki = mediawiki_text
    html_content = doc.html5
    return html_content


def wikitext_to_html(wikitext):
    wikicode = mwparserfromhell.parse(wikitext)
    paragraphs = []

    # Itera su tutte le sezioni e ottieni il testo
    for section in wikicode.get_sections():
        text = section.strip_code().strip()
        paragraphs.append(f"<div><p>{text}</p></div>")

    # Unisci i paragrafi in una stringa
    html = "\n".join(paragraphs)
    return html


if __name__ == "__main__":
    app.run(debug=True)
