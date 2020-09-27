"use strict";

var synth = window.speechSynthesis;
var lang = "fi-FI";
var voice = null;

// Pronounciation fixes for letters the browser can't say right in Finnish
var CHARACTER_PRONOUNCIATIONS = {
    "i": "ii",
    ",": "pilkku",
    ".": "piste",
    ";": "puolipiste",
    ":": "kaksoispiste",
    ">": "suurempi kuin merkki",
    "?": "kysymysmerkki",
    "!": "huutomerkki",
    "∞": "ääretön",
    ")": "oikea kaarisulje",
    "]": "oikea hakasulje",
    "}": "oikea aaltosulje",
    "≠": "erisuuri",
    "≈": "likimäärin",
    "√": "neliöjuuri",
    "å": "ruotsalainen å"
};

var WORDS = [
    "aasi", "aita", "amme", "appelsiini", "aurinko", "auto",
    "banaani", "banaani", "banaani", "blimpsisblömpsis böbberöö",
    "celsius", "cowboy",
    "delfiini", "dinosaurus", "donitsi",
    "etana", "elokuva",
    "faarao", "farkut",
    "gerbiili", "gorilla",
    "haarukka", "halla", "hattara", "helle", "helistin", "hömppä", "höpsö","hanna",
    "ilta", "imuri", "intiaani", "isi", "iskä",
    "jekku", "jalkapallo", "jakkara", "jukurtti", "ju-na", "jänis", "jäätelö",
    "kakku", "kameli", "karkki", "kello", "kivi", "kiivi", "kilpikonna", "kuppi", "karhu", "koira", "käärme", "kala",
    "kana", "kesä", "kevät", "kännykkä", "koko",
    "lamppu", "lapsi", "lasi", "lautanen", "leijona", "leikki", "lentokone", "liukumäki", "lyhty", "lintu", "logo",
    "mi-ke", "makkara", "makarooni", "mopo", "myyrä", "muurahainen", "möhköfantti", "mörkö",
    "naru", "nökö", "nalle", "nakupelle", "nenä", "norsu", "näk'käri",
    "orava", "omena", "okko", "oja",
    "peppi pitkätossu", "paloauto", "parkkipaikka", "piirakka", "piimä", "pilli", "poliisi", "potta", "puuro", "pöytä", "papukaija",
    "quesadilla",
    "rusina", "raketti",
    "salaatti", "sauna", "sininen", "sipuli", "soittopeli", "suihku", "syksy",
    "taika", "talvi", "takka", "talvi", "tarra", "telkkari", "tietokone", "tikkari", "timantti", "trampoliini", "tyyny",
    "uimahousut",
    "veitsi", "västäräkki", "voltti", "vilja", "varpu", "valkeapää", "vegepöni",
    "watti",
    "yö",
    "zumba",
    "äiti",
    "öylätti"
];

// Munge the words array into a convenient hash indexed by the starting letter
var CHARACTER_TO_WORD = (function(words) {
    return words.reduce(function(acc, word) {
        var letter = word[0];
        if (!acc[letter]) {
            acc[letter] = [];
        }
        acc[letter].push(word);
        return acc;
    }, {})
}(WORDS));

function findVoice(lang) {
    var voices = window.speechSynthesis.getVoices();
    for (var i = 0; i < voices.length; i++) {
        if (voices[i].lang === lang) {
            return voices[i];
        }
    }
    return undefined;
}

voice = findVoice(lang);
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = function() {
        voice = findVoice(lang);
    }
}

// document.body.addEventListener("keypress", function(e) {
//     var str = ("" + String.fromCharCode(e.keyCode)).toLowerCase();
//     sayWordForCharacter(str[0]);
// });

// document.body.addEventListener("click", function(e) {
//     var character = getRandomCharacter();
//     sayWordForCharacter(character);
// });

// document.body.addEventListener("touchstart", function(e) {
//     var character = getRandomCharacter();
//     sayWordForCharacter(character);
// });

document.querySelector('#speak-input').addEventListener("input", function(e) {
    sayWordForCharacter();
})

function getRandomCharacter() {
    return String.fromCharCode(Math.round(Math.random() * (122 - 97) + 97));
}

function showCharacter(character) {
    var charactersToShow = character.toUpperCase();
    if (character.toLowerCase() !== character.toUpperCase()) {
        charactersToShow += " " + character.toLowerCase();
    }
    document.querySelector(".character").innerText = charactersToShow;
}

function hideInfo() {
    document.querySelector(".info").classList.add("successfully-used");
}

function sayWordForCharacter() {
    const character = 'x';
    if (synth.speaking) {
        synth.cancel();
    }

    var phrase = document.querySelector('#speak-input').value;;
    showCharacter(phrase);
    hideInfo();

    var utterThis = new SpeechSynthesisUtterance(phrase);
    utterThis.voice = voice;
    utterThis.pitch = 1;
    utterThis.rate = 0.9;
    synth.speak(utterThis);
}
