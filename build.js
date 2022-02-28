import fs from 'fs';
const build_maps = (master_json) => {
  const purl_map = new Map()
  const cpe_map = new Map()
  
  for (const year of Object.keys(master_json)){
    for (const cve in master_json[year]){
      if ('purls' in master_json[year][cve]){
        const purls = master_json[year][cve]['purls']
        for (const purl of purls){
          if (purl_map.has(purl)){
            let temp = purl_map.get(purl)
            temp.push(cve)
            purl_map.set(purl, temp)
          } else {
            purl_map.set(purl, [cve])
          }
        }
      }
      if ('cpes' in master_json[year][cve]){
        const cpes = master_json[year][cve]['cpes']
        for (const cpe of cpes){
          if (cpe_map.has(cpe)){
            let temp = cpe_map.get(cpe)
            temp.push(cve)
            cpe_map.set(cpe, temp)
          } else {
            cpe_map.set(cpe, [cve])
          }
        }
      }
    }
  }

  return {purl_map, cpe_map}
}

const testLookup = (map) => (search) => {
  return map.get(search)
}

function cve_lookup(filename){
  // import * from filename as master_json;
  // const master_json = import(filename)
  const master_json = JSON.parse(fs.readFileSync(filename, 'utf8'))
  const {purl_map, cpe_map} = build_maps(master_json)
  const master_map= {...purl_map, ...cpe_map}
  const purlLookup = testLookup(purl_map)
  const cpeLookup = testLookup(cpe_map)
  const masterLookup = testLookup(master_map)

  const metadata = () => {

    const unique_cves = new Set();
    const unique_cpes = new Set();
    const unique_purls = new Set();
    
    purl_map.forEach((value, key) => {
      unique_purls.add(key);
      value.forEach((cve) => {
        unique_cves.add(cve);
      });
    });
    
    cpe_map.forEach((value, key) => {
      unique_cpes.add(key);
      value.forEach((cve) => {
        unique_cves.add(cve);
      });
    });
    
    return {
      sizes: {
        cves: unique_cves.size,
        cpes: unique_cpes.size,
        purls: unique_purls.size
      }
    }
  }

  

  return {masterLookup, purlLookup, cpeLookup, metaData: metadata()}
}

export default cve_lookup;