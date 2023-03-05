import axios from "axios";
import cheerio from "cheerio";

export async function createUserAPI(url) {
  const result = await axios.get(url);

  const $ = cheerio.load(result.data);
  const og = {};
  $("meta").each((_, el) => {
    if ($(el).attr("property")) {
      const key = $(el).attr("property").split(":")[1];
      const value = $(el).attr("content");
      og[key] = value;
    }
  });
  return og;
}
