export default function convert(input, sparql) {
  // console.log(input, sparql)
  const result = {
    license: "",
    description: {
      en: "",
    },
    sources: "",
    schema: {
      fields: [
      
      ],
    },
    data: [
    ]
  };

  result.license = "CC0-1.0";
  result.description.en = "Result of SPARQL query";
  result.sources = `SPARQL Query: ${sparql}`;

  for (let i = 0; i < input.head.vars.length; i++){
    result.schema.fields[i]= {};
    result.schema.fields[i].name = input.head.vars[i];
    // For now type is a string. Need to figure it out the correct type.
    result.schema.fields[i].type = "string";
    result.schema.fields[i].title = {"en" : input.head.vars[i]};
  }


  for (let i = 0; i < input.results.bindings.length; i++){
    result.data[i] = [];

    for(let j = 0; j < input.head.vars.length; j++){

      const key = input.head.vars[j];
      result.data[i][j] = input.results.bindings[i][key].value;
  
    }

  }
 
  
  return result;
}
