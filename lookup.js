import cve_lookup from "./parser.js";

const {masterLookup, purlLookup, cpeLookup, metaData} = cve_lookup("./master_data.json");

// const purl_search = "pkg:rpm/redhat/cpio@2.5-7.EL4.1";
// const cpe_search = "cpe:2.3:o:redhat:enterprise_linux:4.0:*:workstation:*:*:*:*:*";


function get_cves(search) {
  if (search.startsWith("cpe")) {
    return cpeLookup(search)
  }
  else if (search.startsWith("pkg")) {
    return purlLookup(search);
  }
  else {
    return masterLookup(search);
  }
}

// const test_purl = get_cves(purl_search);
// const test_cpe = get_cves(cpe_search);

// console.log({test_purl, test_cpe});