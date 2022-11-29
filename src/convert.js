export default function convert(input, sparql) {
  const link = "http://www.w3.org/2001/XMLSchema#decimal";
  const link2 = "http://www.w3.org/2001/XMLSchema#integer";
  const link3 = "http://www.w3.org/2001/XMLSchema#boolean";
  const linkResult = link.split("#")[1];
  const linkResult2 = link2.split("#")[1];

  console.log("Link 1: " + linkResult);
  console.log("Link 2: " + linkResult2);
  // console.log(input, sparql)
  const result = {
    license: "",
    description: {
      en: "",
    },
    sources: "",
    schema: {
      fields: [],
    },
    data: [],
  };

  result.license = "CC0-1.0";
  result.description.en = "Result of SPARQL query";
  result.sources = `SPARQL Query: ${sparql}`;

  for (let i = 0; i < input.head.vars.length; i++) {
    result.schema.fields[i] = {};
    result.schema.fields[i].name = input.head.vars[i];

    // Different datatype

    const key = input.head.vars[i];
    if (input.results.bindings[0][key].type === "uri") {
      result.schema.fields[i].type = "uri";
    } else if (input.results.bindings[0][key].datatype === link) {
      result.schema.fields[i].type = "number";
    } else if (input.results.bindings[0][key].datatype === link2) {
      result.schema.fields[i].type = "number";
    } else if (input.results.bindings[0][key].datatype === link3) {
      result.schema.fields[i].type = "boolean";
    } else {
      result.schema.fields[i].type = "string";
    }
    result.schema.fields[i].title = { en: input.head.vars[i] };
  }

  for (let i = 0; i < input.results.bindings.length; i++) {
    result.data[i] = [];

    for (let j = 0; j < input.head.vars.length; j++) {
      const key = input.head.vars[j];
      result.data[i][j] = input.results.bindings[i][key].value;
    }
  }

  return result;
}
