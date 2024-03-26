import { test as base, expect } from "@playwright/test";
import path from "path";
import { ParfumPage } from "../pages/parfum.page";

export const test = base.extend({
  storageState: async ({}, use) => {
    const filename = path.resolve("auth.json");
    await use(filename);
  },

  parfumPage: async ({ page }, use) => {
    const parfumPage = new ParfumPage(page);
    await use(parfumPage);
  },
});

const testData = [
  {
    Highlights: "Sale",
    facets: {
      Marke: "Betty Barclay",
      Produktart: "Deodorant",
      "Für Wen": "Weiblich",
    },
  },
  {
    Highlights: "NEU",
    facets: {
      Produktart: "Parfum",
      "Für Wen": "Unisex",
    },
  },
  {
    Highlights: "Limitiert",
    facets: {
      Marke: "Alysa Ashley",
      Produktart: "Duftset",
      "Geshenk für": "Geburtstag",
      "Für Wen": "Unisex",
    },
  },
];

for (const {Highlights, facets} of testData){
test(`select facet by category ${Highlights}`, async ({ parfumPage }) => {
  await parfumPage.navigateToParfumPage();
  await parfumPage.selectHiglights(Highlights);
  await parfumPage.selectFacets(facets);
});
}