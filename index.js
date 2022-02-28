import cve_lookup from "./build.js";
import run_parser from "./parser.js";

const main = () => {
  if(run_parser()){
    return cve_lookup("./master_data.json")
  } else {
    throw new Error("Parser failed")
  }
}

const {masterLookup, purlLookup, cpeLookup, metaData} = main()
//create master json
//build maps
//create lookup functions
console.log({ masterLookup, purlLookup, cpeLookup, metaData });