import fs from 'fs';
const read_file = (filename) => JSON.parse(fs.readFileSync(filename, "utf8"));

const new_file = (file) => file.find(x => x.resolved_vulnerabilities.length || x.unresolved_vulnerabilities.length) || "Not found"

// console.log(new_file)
const vulns = (file) => file.find(obj => obj.resolved_vulnerabilities.length || obj.unresolved_vulnerabilities.length)


const build_master_json = () => {

  const master_json = {}
  
  let start = 1999
  
  while (start < 2021){
    let filename = start.toString() + ".json"
    let file = read_file(`./purl2cpe/${filename}`)
    master_json[start] = file
    start++
  }

  return master_json
}


const save_master_json = (master_json) => fs.writeFileSync("./master_data.json", JSON.stringify(master_json, null, 2), "utf-8");


const run_parser = () => {
  try{
    const master_json = build_master_json()
    save_master_json(master_json)
    return true
  } catch (e){
    console.log(e)
    return false
  }
}

export default run_parser
