/// Locales
export interface LocaleInterface {
  possibleLocales: string[];
  name: string;
  code: string;
  value: string;
}

export const LOCALES = new Map<string, LocaleInterface>();
LOCALES.set("", {
  possibleLocales: ["", "null", "undefined", "vide", "vazio", "vacío", "empty"],
  name: "Not set ∅",
  code: "xx",
  value: ""
});
LOCALES.set("En", {
  possibleLocales: ["en", "en-US", "en-GB", "anglais", "english", "inglés", "inglês"],
  name: "English",
  code: "gb",
  value: "en"
});
LOCALES.set("Fr", {
  possibleLocales: ["fr", "fr-FR", "français", "francais", "francés", "francês"],
  name: "Français",
  code: "fr",
  value: "fr"
});
LOCALES.set("Es", {
  possibleLocales: ["es", "es-ES", "español", "espanol", "español", "espanol"],
  name: "Español",
  code: "es",
  value: "es"
});
LOCALES.set("Pt", {
  possibleLocales: ["pt", "pt-PT", "purtugais", "português", "portugues"],
  name: "Português",
  code: "pt",
  value: "pt"
});
