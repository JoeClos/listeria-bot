const link = "http://www.w3.org/2001/XMLSchema#decimal";
const link2 = "http://www.w3.org/2001/XMLSchema#integer";
const link3 = "http://www.w3.org/2001/XMLSchema#boolean";

function getType(bindingVar){
  
  if (bindingVar.type === "uri") {
    return "uri";
  } else if (bindingVar.datatype === link) {
    return "number";
  } else if (bindingVar.datatype === link2) {
    return  "number";
  } else if (bindingVar.datatype === link3) {
    return "boolean";
  } else {
    return "string";
  }
}

export default function convert(input, sparql, setMessage) {

  const result = {
    license: "",
    description: {
      en: ""
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

    result.schema.fields[i].type = getType(input.results.bindings[0][key]);
    

    result.schema.fields[i].title = { en: input.head.vars[i] };

  }


  for (let i = 0; i < input.results.bindings.length; i++) {
    result.data[i] = [];

    for (let j = 0; j < input.head.vars.length; j++) {
      const key = input.head.vars[j];

      if(input.results.bindings[i][key] && getType(input.results.bindings[i][key]) !== result.schema.fields[j].type){

        setMessage("There is mixed data type");
        result.schema.fields[j].type = "string";
      }

      if(!input.results.bindings[i][key]){
        result.data[i][j] = null;
      }else{
        result.data[i][j] = input.results.bindings[i][key].value;

      }
      
    }

  }

  return result;
}
